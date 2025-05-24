import './RegisterPages.scss'
import { useState } from 'react';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { toast } from 'react-toastify';
import { registerUser } from '~/api/registerApi';
import { useNavigate } from 'react-router-dom';
function RegisterPages({children}) {
    const [customerType, setCustomerType] = useState('personal');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        province: '',
        ward: '',
        detail: '',
        birthday: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Chỉ cho phép chữ cái (bao gồm tiếng Việt) và khoảng trắng
    const isVietnameseLettersOnly = (text) => /^[\p{L}\s]+$/u.test(text);

// Cho phép chữ cái số khoảng trắng ,  .
    const isVietnameseLettersAndNumbers = (text) =>
        /^[a-zA-ZÀ-ỹ0-9\s,\.]+$/u.test(text);



// Phát hiện emoji
    const containsEmoji = (text) => /([\u203C-\u3299]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/.test(text);

    const validateField = (name, value) => {
        if (!value.trim()) {
            return 'Trường này là bắt buộc';
        }
        if (['firstName', 'lastName', 'province', 'ward'].includes(name)) {
            if (containsEmoji(value)) {
                return 'Không được chứa biểu tượng cảm xúc (emoji)';
            }
            if (!isVietnameseLettersOnly(value)) {
                return 'Chỉ được nhập chữ cái, không chứa số hoặc ký tự đặc biệt';
            }
            if (value.length < 2 || value.length > 50) {
                return 'Phải từ 2 đến 50 ký tự';
            }
        }

        if (name === 'detail') {
            if (containsEmoji(value)) {
                return 'Không được chứa emoji trong địa chỉ';
            }
            if (!isVietnameseLettersAndNumbers(value)) {
                return 'Chỉ được nhập chữ và số, không chứa ký tự đặc biệt';
            }
            if (value.length < 5 || value.length > 100) {
                return 'Địa chỉ phải từ 5 đến 100 ký tự';
            }
        }


        if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'Email không hợp lệ';
        }

        if (name === 'phone' && !/^\d{9,11}$/.test(value)) {
            return 'Số điện thoại không hợp lệ';
        }

        if (name === 'password') {
            if (value.length < 8) {
                return 'Mật khẩu phải có ít nhất 8 ký tự';
            }
            if (/\s/.test(value)) {
                return 'Mật khẩu không được chứa khoảng trắng';
            }
        }

        if (name === 'birthday') {
            const birthDate = new Date(value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (isNaN(birthDate.getTime())) {
                return 'Ngày sinh không hợp lệ';
            }
            if (age < 16 || age > 85) {
                return 'Tuổi phải từ 16 đến 85';
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
            const fullName = formData.firstName + ' ' + formData.lastName;
            const payload = {
                name: fullName,
                email: formData.email,
                pwd: formData.password,
                birthday: formData.birthday,
                addresses: [
                    {
                        name: fullName,
                        phone: formData.phone,
                        province: formData.province,
                        ward: formData.ward,
                        detail: formData.detail,
                    }
                ]
            };


            const response = await registerUser(payload);
            console.log("Đăng ký thành công:", response);
            toast.success("Đăng ký thành công");
            setTimeout(() => navigate('/login'), 3500);
        } catch (error) {
            toast.error(error.message || "Đăng ký thất bại");
        }
    };

    return (
        <div className="register-page-container">
            <div className="register-section">
                <h4>Đăng ký</h4>
                <p>Bạn là khách hàng:</p>
                <div className="register-tabs">
                    <button
                        className={customerType === 'personal' ? 'active' : ''}
                        onClick={() => setCustomerType('personal')}
                    >
                        Khách hàng Cá nhân và Nội bộ Thiên Long
                    </button>
                    <button
                        className={customerType === 'business' ? 'active' : ''}
                        onClick={() => setCustomerType('business')}
                    >
                        Khách hàng Ưu tiên (Xuất hóa đơn)
                    </button>
                </div>

                <form className="register" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Họ <span>(*)</span></label>
                            <input name="firstName"
                                   value={formData.firstName}
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   placeholder="Họ" />
                            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
                        </div>
                        <div className="form-group">
                            <label>Tên <span>(*)</span></label>
                            <input name="lastName"
                                   value={formData.lastName}
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   placeholder="Tên" />
                            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
                        </div>
                    </div>

                    {customerType === 'business' && (
                        <>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Tên công ty <span>(*)</span></label>
                                    <input placeholder="Tên công ty" />
                                </div>
                                <div className="form-group">
                                    <label>Mã số thuế <span>(*)</span></label>
                                    <input placeholder="Mã số thuế" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Địa chỉ công ty <span>(*)</span></label>
                                    <input placeholder="Địa chỉ công ty" />
                                </div>
                                <div className="form-group">
                                    <label>Email công ty <span>(*)</span></label>
                                    <input placeholder="Email công ty" />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="form-row">
                        <div className="form-group">
                            <label>Email cá nhân <span>(*)</span></label>
                            <input
                                name="email"
                                value={formData.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Email" />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại <span>(*)</span></label>
                            <input name="phone"
                                   value={formData.phone}
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   placeholder="Số điện thoại" />
                            {errors.phone && <p className="error-text">{errors.phone}</p>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>Ngày sinh <span>(*)</span></label>
                            <input type="date"
                                   name="birthday"
                                   value={formData.birthday}
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   placeholder="Ngày sinh" />
                            {errors.birthday && <p className="error-text">{errors.birthday}</p>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Tỉnh/Thành phố <span>(*)</span></label>
                            <input
                                name="province"
                                value={formData.province}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Tỉnh/Thành phố" />
                            {errors.province && <p className="error-text">{errors.province}</p>}
                        </div>
                        <div className="form-group">
                            <label>Phường/Xã <span>(*)</span></label>
                            <input name="ward"
                                   value={formData.ward}
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   placeholder="Phường/Xã" />
                            {errors.ward && <p className="error-text">{errors.ward}</p>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>Địa chỉ <span>(*)</span></label>
                            <input type="address"
                                   name="detail"
                                   value={formData.detail}
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   placeholder="Địa chỉ" />
                            {errors.detail && <p className="error-text">{errors.detail}</p>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>Mật khẩu <span>(*)</span></label>
                            <input type="password"
                                   name="password"
                                   value={formData.password}
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   placeholder="Mật khẩu" />
                            {errors.password && <p className="error-text">{errors.password}</p>}
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">Đăng ký</button>
                </form>

                <div className="account-login-container">
                    <p className="account-title">Bạn đã có tài khoản
                        <a> Đăng nhập tại đây </a>
                    </p>
                    <div className="account-gg-fb">
                        <Button className="account-gg"> <GoogleIcon style={{ fontSize: 20 }} /> Google</Button>
                        <Button className="account-fb"> <FacebookRoundedIcon
                            style={{ fontSize: 20 }} /> Facebook</Button>
                    </div>
                </div>

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

export default RegisterPages;