import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';

import styles from './DeliveryInfo.module.scss';
import CheckoutHeader from '../CheckoutHeader';
import Area from '~/models/Area';

const cx = classNames.bind(styles);

function DeliveryInfo() {
    const { t, i18n } = useTranslation();
    const [nameInput, setNameInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [addressDetailInput, setAddressDetailInput] = useState('');
    const [province, setProvince] = useState('');
    const [ward, setWard] = useState('');

    const handleProvinceChange = (e) => {
        setProvince(e.target.value);
    };
    const handleWardChange = (e) => {
        setWard(e.target.value);
    };

    const provinces = [
        new Area('HCM', 'hcm'),
        new Area('Hà Nội', 'ha-noi'),
        new Area('Đồng Nai', 'dong-nai'),
        new Area('Vũng Tàu', 'vung-tau'),
    ];

    const wards = [new Area('Quận 1', 'q1'), new Area('Quận 2', 'q2'), new Area('Bình Thạnh', 'binh-thanh')];

    return (
        <div className={cx('wrapper')}>
            {/* <CheckoutHeader /> */}
            <div className={cx('content')}>
            <p className={cx('title')}>{t('delivery-info')}</p>
            <form className={classNames(cx(''))}>
                <input placeholder={t('fullname')} value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                <input
                    placeholder={t('phone-number')}
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                />
                <input
                    placeholder={t('address-detail')}
                    value={addressDetailInput}
                    onChange={(e) => setAddressDetailInput(e.target.value)}
                />

                <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                    <div className="grid-col-5">
                        <select value={province} onChange={handleProvinceChange}>
                            <option value="">{t('choose-province')}</option>
                            {provinces &&
                                provinces.map((item) => (
                                    <option value={item.value} key={item.value}>
                                        {item.title}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="grid-col-5">
                        <select value={ward} onChange={handleWardChange}>
                            <option value="">{t('choose-ward')}</option>
                            {province & wards &&
                                wards.map((item) => (
                                    <option value={item.value} key={item.value}>
                                        {item.title}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
            </form>
            <div className="d-flex" style={{ justifyContent: 'right' }}>
                <button>{t('continue-to-payment')}</button>
            </div>
            </div>
        </div>
    );
}

export default DeliveryInfo;
