
import { toast } from 'react-toastify';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomInput, Modal } from '~/pages/components';
import styles from './ChangePass.scss';
import classNames from 'classnames/bind';
import { changePasswordUser, updateUserInfo } from '~/api/updateUserInfoApi';
const cx = classNames.bind(styles);
function ChangePass() {
        const { t } = useTranslation();
        const [formData, setFormData] = useState({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        const handleChange = (field) => (e) => {
            setFormData((prev) => ({
                ...prev,
                [field]: e.target.value
            }));
        };

        const validateInput = () => {
            const { oldPassword, newPassword, confirmPassword } = formData;

            if (![oldPassword, newPassword, confirmPassword].every(Boolean)) {
                toast.error("Vui lòng điền đầy đủ tất cả các trường.");
                return false;
            }

            if (/\s/.test(oldPassword) || /\s/.test(newPassword)) {
                toast.error("Mật khẩu không được chứa khoảng trắng.");
                return false;
            }

            if (oldPassword.length < 8 || newPassword.length < 8) {
                toast.error("Mật khẩu phải có ít nhất 8 ký tự.");
                return false;
            }

            if (newPassword !== confirmPassword) {
                toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp.");
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
                toast.error('Cập nhật thất bại!');
            }
        };

        return (
        <div className={cx('wrapper')}>
            <h1 className={cx('wrapper')}>{t('Bạn muốn đổi mật khẩu?')}</h1>
            <form className="change-pass-form" onSubmit={handleSubmit}>
                <div className={cx('form-item')}>
                    <CustomInput
                        label="Mật khẩu cũ"
                        type="password"
                        value={formData.oldPassword}
                        onChange={handleChange('oldPassword')}
                        required
                    />
                </div>
                <div className={cx('form-item')}>
                    <CustomInput
                        label="Mật khẩu mới"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange('newPassword')}
                        required
                    />
                </div>
                <div className={cx('form-item')}>
                    <CustomInput
                        label="Nhập lại mật khẩu mới"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        required
                    />
                </div>
                {/* Nút cập nhật */}
                <div className={cx('form-item')}>
                    <button type="submit" className={cx('update-button')}>
                        Cập nhật mật khẩu
                    </button>
                </div>
            </form>
        </div>
);
}
export default ChangePass;