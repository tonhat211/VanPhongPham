import classNames from 'classnames/bind';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';
import styles from './Info.module.scss';
import { CustomInput, Modal } from '~/pages/components';
import { updateUserInfo } from '~/api/updateUserInfoApi.js';
const cx = classNames.bind(styles);

function Info() {
    const { t, i18n } = useTranslation();
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState(new Date());
    const [address, setAddress] = useState('');
    const [detail, setDetail] = useState('');
    const [ward, setWard] = useState('');
    const [province, setProvince] = useState('');

    const [modalType, setModalType] = useState(null);
    const isModalOpen = modalType !== null;
    const openModal = (type) => setModalType(type);
    const closeModal = () => setModalType(null);

    // Các loại modal
    const MODAL_TYPES = {
        BIRTHDAY_CALENDAR: 'BIRTHDAY_CALENDAR',
    };

    // Tải user từ localStorage và theo dõi thay đổi
    useEffect(() => {
        const loadUserFromStorage = () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser && storedUser !== 'undefined') {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    setName(parsedUser.name || '');
                    setEmail(parsedUser.email || '');
                    setBirthday(parsedUser.birthday ? new Date(parsedUser.birthday) : null);

                    const defaultAddress = parsedUser.addresses?.find((addr) => addr.isDefault === 1);
                    if (defaultAddress) {
                        setPhone(defaultAddress.phone || '');
                        setDetail(defaultAddress.detail || '');
                        setWard(defaultAddress.ward || '');
                        setProvince(defaultAddress.province || '');
                        setAddress([defaultAddress.detail, defaultAddress.ward, defaultAddress.province].filter(Boolean).join(', '));
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Lỗi khi parse user từ localStorage:', error);
                setUser(null);
            }
        };

        loadUserFromStorage();
        window.addEventListener('storage', loadUserFromStorage);
        return () => window.removeEventListener('storage', loadUserFromStorage);
    }, []);

    const validateInput = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error(t('infoUser.errEmail'));
            return false;
        }

        if (!/^\d{9,11}$/.test(phone)) {
            toast.error(t('infoUser.errPhone'));
            return false;
        }

        if (!birthday || isNaN(birthday.getTime())) {
            toast.error(t('infoUser.errBirthday'));
            return false;
        }

        const today = new Date();
        let age = today.getFullYear() - birthday.getFullYear();
        const m = today.getMonth() - birthday.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
            age--;
        }

        if (age < 16 || age > 85) {
            toast.error(t('infoUser.errAge'));
            return false;
        }

        const parts = address.split(',').map((p) => p.trim());
        if (parts.length < 3) {
            toast.error(t('infoUser.errAddress'));
            return false;
        }

        return true;
    };

    //Xử lý cập nhật thông tin người dùng
    const handleUpdate = async () => {
        if (!user) return;
        if (!validateInput()) return;

        // Tách address thành detail, ward, province
        const addressParts = address.split(',').map(part => part.trim());
        const [detailInput, wardInput, provinceInput] = addressParts;

        const updatedData = {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            birthday: birthday ? birthday.toISOString().split('T')[0] : null,
            detail: detailInput || '',
            ward: wardInput || '',
            province: provinceInput || '',
        };

        const defaultAddress = user.addresses?.find((addr) => addr.isDefault === 1);

        const originalBirthday = user.birthday
            ? new Date(user.birthday).toISOString().split('T')[0]
            : null;

        const originalData = {
            name: user.name,
            email: user.email,
            phone: defaultAddress?.phone,
            detail: defaultAddress?.detail,
            ward: defaultAddress?.ward,
            province: defaultAddress?.province,
            birthday: originalBirthday,
        };

        const isChanged = Object.keys(updatedData).some(
            key => updatedData[key] !== originalData[key]
        );

        if (!isChanged) {
            toast.info(t('infoUser.noChange'));
            return;
        }

        try {
            const updatedUser = await updateUserInfo(updatedData);

            const newUser = {
                ...user,
                ...updatedUser,
                addresses: user.addresses.map(addr =>
                    addr.isDefault === 1
                        ? {
                            ...addr,
                            phone: updatedData.phone,
                            detail: updatedData.detail,
                            ward: updatedData.ward,
                            province: updatedData.province,
                        }
                        : addr
                ),
            };

            localStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);
            toast.success(t('infoUser.updateSuccess'));
        } catch (error) {
            console.error('Cập nhật thất bại:', error);
            toast.error(t('infoUser.updateFail'));
        }
    };
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('wrapper')}>{t('infoUser.title')}</h1>
            <form>
                {/* Họ và tên */}
                <div className={cx('form-item')}>
                    <CustomInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label={t('infoUser.email')}
                        className="mb-10"
                    />
                </div>
                <div className={cx('form-item')}>
                    <CustomInput
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label={t('infoUser.name')}
                        className="mb-10"
                    />
                </div>
                <div className={cx('form-item')}>
                    <CustomInput
                        value={birthday ? birthday.toLocaleDateString('vi-VN') : ''}
                        onChange={() => {}} //Không cho nhập bằng tay
                        onClick={() => openModal(MODAL_TYPES.BIRTHDAY_CALENDAR)}
                        label={t('infoUser.birthday')}
                        className="mb-10"
                        readOnly
                    />
                </div>
                <div className={cx('form-item')}>
                    <CustomInput
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        label={t('infoUser.phone')}
                        className="mb-10"
                    />
                </div>
                <div className={cx('form-item')}>
                    <CustomInput
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        label={t('infoUser.address')}
                        placeholder={t('infoUser.addressHint')}
                        className="mb-10"
                    />
                </div>

                {/* Nút cập nhật */}
                <div className={cx('form-item')}>
                    <button type="button" className={cx('update-button')} onClick={handleUpdate}>
                        {t('infoUser.updateBtn')}
                    </button>
                </div>
            </form>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalType === MODAL_TYPES.BIRTHDAY_CALENDAR && <BirthdayCalendar />}
            </Modal>
        </div>
    );

    function BirthdayCalendar() {
        return (
            <div style={{ padding: '10px' }}>
                <Calendar  onChange={(date) => {setBirthday(date);closeModal();}}
                           value={birthday instanceof Date ? birthday : new Date(birthday)} />
            </div>
        );
    }
}

export default Info;
