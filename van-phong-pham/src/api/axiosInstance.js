import axios from 'axios';
import { toast } from 'react-toastify';


const API_BASE = 'http://localhost:8080/api/v1';
export const SERVER_URL_BASE = 'http://localhost:8080';


const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// gắn JWT token vào header Authorization
axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
        console.log('➡️ Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      params: config.params,
      data: config.data,
    });
      return config;
    },
    (error) => Promise.reject(error)
);

// Flag tránh lặp vô hạn nếu refresh thất bại
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Token hết hạn và chưa thử refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Nếu đang refresh thì xếp hàng đợi
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = 'Bearer ' + token;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshResponse = await axios.post(`${API_BASE}/auth/refresh`, {
                    token: localStorage.getItem('token'),
                });

                const newToken = refreshResponse.data.data.token;
                localStorage.setItem('token', newToken);
                axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`;
                processQueue(null, newToken);
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                toast.warning('Phiên đăng nhập đã hết. Vui lòng đăng nhập lại.');
                localStorage.removeItem('token');
                window.location.href = '/login'; // hoặc navigate đến login
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
    // Bắt lỗi toàn cục
    if (error.response) {
      const status = error.response.status;

      // Xử lý các lỗi thường gặp
      if (status === 401) {
        toast.warning('Bạn chưa đăng nhập hoặc phiên đã hết hạn');
      } else if (status === 403) {
        toast.error('Bạn không có quyền truy cập');
      } else if (status === 500) {
        toast.error('Lỗi máy chủ, vui lòng thử lại sau');
      } else {
        const message = error.response.data?.message || 'Đã xảy ra lỗi';
        toast.error(message);
      }
    } else {
      toast.error('Không thể kết nối đến máy chủ');
    }

    return Promise.reject(error); // Đừng quên reject
  }
);

export default axiosInstance;
