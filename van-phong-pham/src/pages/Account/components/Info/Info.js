import classNames from 'classnames/bind';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import styles from './Info.module.scss';
import { CustomInput, Modal } from '~/pages/components';

const cx = classNames.bind(styles);

function Info() {
    const { t, i18n } = useTranslation();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState(new Date());
    const [modalType, setModalType] = useState(null);
    const isModalOpen = modalType !== null;
    const openModal = (type) => setModalType(type);
    const closeModal = () => setModalType(null);

    // Các loại modal
    const MODAL_TYPES = {
        BIRTHDAY_CALENDAR: 'BIRTHDAY_CALENDAR',
    };
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('wrapper')}>{t('account-info')}</h1>
            <form>
                <div className={cx('form-item')}>
                    <CustomInput
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label={t('fullname')}
                        className="mb-10"
                    />
                </div>
                <div className={cx('form-item')}>
                    <p>
                        Email: <span className={cx('detail')}>21130463@st.hcmuaf.edu.vn</span>
                    </p>
                </div>
                <div className={cx('form-item')}>
                    <CustomInput
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        label={t('phone-number')}
                        className="mb-10"
                    />
                </div>
                <div className={cx('form-item')}>
                    <CustomInput
                        value={birthday.toLocaleDateString('vi-VN')}
                        onChange={(e) => setBirthday(e.target.value)}
                        onClick={() => openModal('BIRTHDAY_CALENDAR')}
                        label={t('birthday')}
                        className="mb-10"
                    />
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
                <Calendar onChange={setBirthday} value={birthday} />
            </div>
        );
    }
}

export default Info;
