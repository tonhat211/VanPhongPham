import { useState } from 'react';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import './LoginPage.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPassword, loginUser } from '~/api/LoginApi';
import { useDispatch } from 'react-redux';
import { fetchCart } from '~/pages/productCardsPage/cartSlice';
import { useAuth } from '~/context/AuthContext';
import useI18n from '~/hooks/useI18n';
function LoginPage() {
    const { t, lower } = useI18n();
    const [mode, setMode] = useState('login');
    const [formData, setFormData] = useState({
        email: '',
        pwd: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { login } = useAuth();

    const validateField = (name, value) => {
        if (!value.trim()) {
            return t('login.force-input');
        }

        if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return t('login.erro-mail');
        }

        if (name === 'pwd') {
            if (value.length < 8) {
                return t('login.erro-pass');
            }
            if (/\s/.test(value)) {
                return t('login.no-space');

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
            const payload = {
                email: formData.email,
                pwd: formData.pwd,
            };

            // const payload = {
            //     email: "tonhat@gmail.com",
            //     pwd: "nook1234",
            // };

            const response = await loginUser(payload);
            dispatch(fetchCart());
            login(response.user, response.permissions);
            toast.success(t('login.success-toast'));
            // setTimeout(() => navigate('/', { state: { email: formData.email } }), 2000);


            navigate('/', { state: { email: formData.email } });
            // console.log('handleSubmit ' + JSON.stringify(response.permissions, null, 2));
        } catch (error) {
            toast.error(error.message || t('login.fail-toast'));
        }
    };

    const [resetEmail, setResetEmail] = useState('');

    const validateResetEmail = () => {
        if (!resetEmail.trim()) return t('login.force-input');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetEmail)) return t('login.erro-mail');
        return '';
    };

    const handleforgotPassword = async (e) => {
        e.preventDefault();

        const error = validateResetEmail();
        if (error) {
            setErrors((prev) => ({ ...prev, email: error }));
            toast.error(t('login.reset-error-toast'));
            return;
        }

        try {
            await forgotPassword(resetEmail);
            toast.success(t('login.reset-success-toast'));
            setResetEmail('');
            setMode('login');
        } catch (err) {
            toast.error(err.message || t('login.fail-mail'));
        }
    };

    const renderLoginForm = () => (
        <>
            <h4>{t('login.title')}</h4>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>{t('login.email-label')} <span> *</span></label>
                    <input type="email"  name="email"
                           value={formData.email}
                           onBlur={handleBlur}
                           onChange={handleChange}
                           placeholder={t('login.email-label')} />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label>{t('login.password-label')} <span> *</span></label>
                    <input type="password" name="pwd"
                           value={formData.pwd}
                           onBlur={handleBlur}
                           onChange={handleChange}
                           placeholder={t('login.placeholder-password')} />
                    {errors.pwd && <p className="error-text">{errors.pwd}</p>}
                </div>
                <button type="submit" className="submit-btn">{t('login.title')}</button>
            </form>

            <div className="account-login-container">
                <p className="account-title">
                    {t('login.forgot-password')}
                    <a onClick={() => setMode('reset')}> {t('login.here')}</a>
                </p>
                <p className="account-title">{t('login.with')} </p>
                <div className="account-gg-fb">
                    <Button className="account-gg">
                        {' '}
                        <GoogleIcon style={{ fontSize: 20 }} /> Google
                    </Button>
                    <Button className="account-fb">
                        {' '}
                        <FacebookRoundedIcon style={{ fontSize: 20 }} /> Facebook
                    </Button>
                </div>
                <p className="account-title">
                    {t('login.register-prompt')}
                    <a href="/register"> {t('login.register-link')} </a>
                </p>
            </div>
        </>
    );

    const renderResetForm = () => (
        <>
            <h4>{t('login.reset-title')}</h4>
            <p className="reset-text">{t('login.reset-desc')}</p>
            <form className="reset-form" onSubmit={handleforgotPassword}>
                <div className="form-group">
                    <label>{t('login.email-label')} <span> *</span> </label>
                    <input type="email" placeholder="Email" name="email"
                           onBlur={handleBlur} value={resetEmail}
                           onChange={(e) => setResetEmail(e.target.value)}/>
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
                <button type="submit" className="submit-btn yellow-btn">{t('login.reset-submit')}</button>
            </form>

            <div className="account-login-container">
            <p className="back-link">
                <a onClick={() => setMode('login')}>{t('login.reset-back')}</a>
            </p>
            <p className="account-title">{t('login.with')}</p>
            <div className="account-gg-fb">
                <Button className="account-gg"> <GoogleIcon style={{ fontSize: 20 }} /> Google</Button>
                <Button className="account-fb"> <FacebookRoundedIcon style={{ fontSize: 20 }} /> Facebook</Button>
            </div>
            <p className="account-title">
                {t('login.register-prompt')}
                <a href="/register"> {t('login.register-link')} </a>
            </p>
            </div>
        </>
    );

    return (
        <div className="login-container">
            <div className="login-section">{mode === 'login' ? renderLoginForm() : renderResetForm()}</div>

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
