
import { toast } from 'react-toastify';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomInput, Modal } from '~/pages/components';
import styles from './ChangePass.module.scss';
import classNames from 'classnames/bind';
import { changePasswordUser} from '~/api/updateUserInfoApi';
const cx = classNames.bind(styles);
function ChangePass() {
        const { t } = useTranslation();
        const [formData, setFormData] = useState({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    });
    const togglePasswordVisibility = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleChange = (field) => (e) => {
            setFormData((prev) => ({
                ...prev,
                [field]: e.target.value
            }));
        };

        const validateInput = () => {
            const { oldPassword, newPassword, confirmPassword } = formData;

            if (![oldPassword, newPassword, confirmPassword].every(Boolean)) {
                toast.error(t('changePass.toast-fillAll'));
                return false;
            }

            if (/\s/.test(oldPassword) || /\s/.test(newPassword)) {
                toast.error(t('changePass.toast-noWhitespace'));
                return false;
            }

            if (oldPassword.length < 8 || newPassword.length < 8) {
                toast.error(t('changePass.toast-minLength'));
                return false;
            }

            if (newPassword !== confirmPassword) {
                toast.error(t('changePass.toast-passwordMismatch'));
                return false;
            }

            return true;
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!validateInput()) return;
            try {
                await changePasswordUser(formData);
                setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
            } catch (error) {
                console.error('Cập nhật thất bại:', error);
                toast.error(t('changePass.toast-failed'));
            }
        };

        return (
        <div className={cx('wrapper')}>
            <h1 className={cx('wrapper')}>{t('changePass.title')}</h1>
            <form className="change-pass-form" onSubmit={handleSubmit}>
                <div className={cx('form-item')}>
                    <CustomInput
                        label={t('changePass.oldPassword')}
                        type={showPassword.oldPassword ? 'text' : 'password'}
                        value={formData.oldPassword}
                        onChange={handleChange('oldPassword')}
                        required
                    />
                    <p className={cx('toggle-text')} onClick={() => togglePasswordVisibility('oldPassword')}>
                        {showPassword.oldPassword ? t('changePass.hidePassword') : t('changePass.showPassword')}
                    </p>
                </div>
                <div className={cx('form-item')}>
                    <CustomInput
                        label={t('changePass.newPassword')}
                        type={showPassword.newPassword ? 'text' : 'password'}
                        value={formData.newPassword}
                        onChange={handleChange('newPassword')}
                        required
                    />
                    <p className={cx('toggle-text')} onClick={() => togglePasswordVisibility('newPassword')}>
                        {showPassword.newPassword ? t('changePass.hidePassword') : t('changePass.showPassword')}
                    </p>
                </div>
                <div className={cx('form-item')}>
                    <CustomInput
                        label={t('changePass.confirmPassword')}
                        type={showPassword.confirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        required
                    />
                    <p className={cx('toggle-text')} onClick={() => togglePasswordVisibility('confirmPassword')}>
                        {showPassword.confirmPassword ? t('changePass.hidePassword') : t('changePass.showPassword')}
                    </p>
                </div>
                {/* Nút cập nhật */}
                <div className={cx('form-item')}>
                    <button type="submit" className={cx('update-button')}>
                        {t('changePass.updateButton')}
                    </button>
                </div>
            </form>
        </div>
);
}
export default ChangePass;