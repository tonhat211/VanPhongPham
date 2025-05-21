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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // ✅ Bắt lỗi toàn cục
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
