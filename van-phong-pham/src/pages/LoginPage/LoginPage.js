import { useState } from 'react';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import './LoginPage.scss'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPassword, loginUser } from '~/api/LoginApi';
import { useDispatch } from 'react-redux';
import { fetchCart} from '~/pages/productCardsPage/cartSlice';
function LoginPage() {
    const [mode, setMode] = useState('login');
    const [formData, setFormData] = useState({
        email: '',
        pwd: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateField = (name, value) => {
        if (!value.trim()) {
            return 'Trường này là bắt buộc';
        }

        if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'Email không hợp lệ';
        }

        if (name === 'pwd') {
            if (value.length < 8) {
                return 'Mật khẩu phải có ít nhất 8 ký tự';
            }
            if (/\s/.test(value)) {
                return 'Mật khẩu không được chứa khoảng trắng';
            }
        }
        return '';
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: '' })); // reset lỗi khi người dùng sửa
    };

    const validateForm = () => {
        const newErrors = {};
        for (let key in formData) {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("Vui lòng kiểm tra lại thông tin");
            return;
        }
        try {
            const payload = {
                email: formData.email,
                pwd: formData.pwd,
            };

            const response = await loginUser(payload);
            dispatch(fetchCart());
            // toast.success("Đăng nhập thành công");
            setTimeout(() => navigate('/', { state: { email: formData.email } }), 2000);


        } catch (error) {
            // toast.error(error.message || "Đăng nhập thất bại");
        }
    };

    const [resetEmail, setResetEmail] = useState('');

    const validateResetEmail = () => {
        if (!resetEmail.trim()) return 'Trường này là bắt buộc';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetEmail)) return 'Email không hợp lệ';
        return '';
    };

    const handleforgotPassword = async (e) => {
        e.preventDefault();

        const error = validateResetEmail();
        if (error) {
            setErrors((prev) => ({ ...prev, email: error }));
            toast.error("Vui lòng kiểm tra lại email");
            return;
        }

        try {
            await forgotPassword(resetEmail);
            toast.success("Đã gửi email đặt lại mật khẩu!");
            setResetEmail('');
            setMode('login');
        } catch (err) {
            toast.error(err.message || "Gửi email thất bại");
        }
    };

    const renderLoginForm = () => (
        <>
            <h4>Đăng nhập</h4>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email <span> *</span></label>
                    <input type="email"  name="email"
                           value={formData.email}
                           onBlur={handleBlur}
                           onChange={handleChange}
                           placeholder="Nhập Email" />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label>Mật khẩu <span> *</span></label>
                    <input type="password" name="pwd"
                           value={formData.pwd}
                           onBlur={handleBlur}
                           onChange={handleChange}
                           placeholder="Nhập Mật khẩu" />
                    {errors.pwd && <p className="error-text">{errors.pwd}</p>}
                </div>
                <button type="submit" className="submit-btn">Đăng nhập</button>
            </form>

            <div className="account-login-container">
                <p className="account-title">
                    Quên mật khẩu? Nhấn vào
                    <a onClick={() => setMode('reset')}> đây </a>
                </p>
                <p className="account-title">Hoặc đăng nhập bằng</p>
                <div className="account-gg-fb">
                    <Button className="account-gg"> <GoogleIcon style={{ fontSize: 20 }} /> Google</Button>
                    <Button className="account-fb"> <FacebookRoundedIcon style={{ fontSize: 20 }} /> Facebook</Button>
                </div>
                <p className="account-title">
                    Bạn chưa có tài khoản?
                    <a href="/register"> Đăng ký tại đây </a>
                </p>
            </div>
        </>
    );

    const renderResetForm = () => (
        <>
            <h4>ĐẶT LẠI MẬT KHẨU</h4>
            <p className="reset-text">Chúng tôi sẽ gửi cho bạn một email để kích hoạt việc đặt lại mật khẩu.</p>
            <form className="reset-form" onSubmit={handleforgotPassword}>
                <div className="form-group">
                    <label>Email <span> *</span> </label>
                    <input type="email" placeholder="Email" name="email"
                           onBlur={handleBlur} value={resetEmail}
                           onChange={(e) => setResetEmail(e.target.value)}/>
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
                <button type="submit" className="submit-btn yellow-btn">Lấy lại mật khẩu</button>
            </form>

            <div className="account-login-container">
            <p className="back-link">
                <a onClick={() => setMode('login')}>Quay lại</a>
            </p>
            <p className="account-title">Hoặc đăng nhập bằng</p>
            <div className="account-gg-fb">
                <Button className="account-gg"> <GoogleIcon style={{ fontSize: 20 }} /> Google</Button>
                <Button className="account-fb"> <FacebookRoundedIcon style={{ fontSize: 20 }} /> Facebook</Button>
            </div>
            <p className="account-title">
                Bạn chưa có tài khoản?
                <a> Đăng ký tại đây </a>
            </p>
            </div>
        </>
    );

    return (
        <div className="login-container">
            <div className="login-section">
                {mode === 'login' ? renderLoginForm() : renderResetForm()}
            </div>

            <ul className="bg-bubbles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>

        </div>
    );
}

export default LoginPage;