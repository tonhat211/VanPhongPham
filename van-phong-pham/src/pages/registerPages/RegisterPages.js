import './RegisterPages.scss'
import { useState } from 'react';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { toast } from 'react-toastify';
import { registerUser } from '~/api/registerApi';
import { useNavigate } from 'react-router-dom';
import useI18n from '~/hooks/useI18n';
function RegisterPages({children}) {
    const { t, lower } = useI18n();
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
            return t('login.force-input');
        }
        if (['firstName', 'lastName', 'province', 'ward'].includes(name)) {
            if (containsEmoji(value)) {
                return t('register.no-emoji');

            }
            if (!isVietnameseLettersOnly(value)) {
                return  t('register.only-letter');

            }
            if (value.length < 2 || value.length > 50) {
                return  t('register.erro-limit');

            }
        }

        if (name === 'detail') {
            if (containsEmoji(value)) {
                return t('register.no-emoji');
            }
            if (!isVietnameseLettersAndNumbers(value)) {
                return t('register.no-special-character');

            }
            if (value.length < 5 || value.length > 100) {
                return  t('register.erro-limit-add');

            }
        }


        if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return t('login.erro-mail');
        }

        if (name === 'phone' && !/^\d{9,11}$/.test(value)) {
            return t('register.erro-phone');

        }

        if (name === 'password') {
            if (value.length < 8) {
                return t('login.erro-pass');
            }
            if (/\s/.test(value)) {
                return t('login.no-space');
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
                return t('register.erro-birth');

            }
            if (age < 16 || age > 85) {
                return t('register.tbirth-limit');

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
            toast.error(t('login.error-toast'));
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
            console.log("Đăng ký thành công, Xác minh Email:", response);
            toast.success(t('register.toast-success'));
            setTimeout(() => navigate('/verify-code', { state: { email: formData.email } }), 2000);

        } catch (error) {
            toast.error(error.message ||  t('register.erro-register'));

        }
    };

    return (
        <div className="register-page-container">
            <div className="register-section">
                <h4>{t('register.title')}</h4>
                <p>{t('register.type-label')}</p>
                <div className="register-tabs">
                    <button
                        className={customerType === 'personal' ? 'active' : ''}
                        onClick={() => setCustomerType('personal')}
                    >
                        {t('register.type-personal')}
                    </button>
                    <button
                        className={customerType === 'business' ? 'active' : ''}
                        onClick={() => setCustomerType('business')}
                    >
                        {t('register.type-business')}
                    </button>
                </div>

                <form className="register" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label> {t('register.label-firstname')} <span>(*)</span></label>
                            <input name="firstName"
                                   value={formData.firstName}
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   placeholder={ t('register.label-firstname')} />
                            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
                        </div>
                        <div className="form-group">
                            <label> {t('register.label-lastname')} <span>(*)</span></label>
                            <input name="lastName"
                                   value={formData.lastName}
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   placeholder={ t('register.label-lastname')} />
                            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
                        </div>
                    </div>

                    {customerType === 'business' && (
                        <>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>{t('register.label-company-name')} <span>(*)</span></label>
                                    <input placeholder={t('register.label-company-name')} />
                                </div>
                                <div className="form-group">
                                    <label>{t('register.label-tax-code')} <span>(*)</span></label>
                                    <input placeholder={ t('register.label-tax-code')} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>{t('register.label-company-address')} <span>(*)</span></label>
                                    <input placeholder={t('register.label-company-address')} />
                                </div>
                                <div className="form-group">
                                    <label>{t('register.label-company-email')} <span>(*)</span></label>
                                    <input placeholder={t('register.label-company-email')} />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="form-row">
                        <div className="form-group">
                            <label>{t('register.label-personal-email')} <span>(*)</span></label>
                            <input
                                name="email"
                                value={formData.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder={t('register.label-personal-email')} />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>
                        <div className="form-group">
                            <label>{t('register.label-phone')} <span>(*)</span></label>
                            <input name="phone"
                                   value={formData.phone}
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   placeholder={t('register.label-phone')} />
                            {errors.phone && <p className="error-text">{errors.phone}</p>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>{t('register.label-birthday')}<span>(*)</span></label>
                            <input type="date"
                                   name="birthday"
                                   value={formData.birthday}
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   placeholder={t('register.label-birthday')} />
                            {errors.birthday && <p className="error-text">{errors.birthday}</p>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>{t('register.label-province')} <span>(*)</span></label>
                            <input
                                name="province"
                                value={formData.province}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder={t('register.label-province')} />
                            {errors.province && <p className="error-text">{errors.province}</p>}
                        </div>
                        <div className="form-group">
                            <label>{t('register.label-ward')} <span>(*)</span></label>
                            <input name="ward"
                                   value={formData.ward}
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   placeholder={t('register.label-ward')} />
                            {errors.ward && <p className="error-text">{errors.ward}</p>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>{t('register.label-detail')}<span>(*)</span></label>
                            <input type="address"
                                   name="detail"
                                   value={formData.detail}
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   placeholder={t('register.label-detail')} />
                            {errors.detail && <p className="error-text">{errors.detail}</p>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>{t('register.label-password')}<span>(*)</span></label>
                            <input type="password"
                                   name="password"
                                   value={formData.password}
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                                   placeholder={t('register.label-password')} />
                            {errors.password && <p className="error-text">{errors.password}</p>}
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">{t('register.title')}</button>
                </form>

                <div className="account-login-container">
                    <p className="account-title">{t('register.login-question')}
                        <a href="/login"> {t('register.login-link')} </a>
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