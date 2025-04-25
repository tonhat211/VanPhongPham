import classNames from 'classnames/bind';
import { useState, useRef, useEffect, useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import styles from './Address.module.scss';
import { CustomInput, Modal } from '~/pages/components';
import addresses from '~/data/addresses';
import Area from '~/models/Area';
import useI18n from '~/hooks/useI18n'

const cx = classNames.bind(styles);

function Address() {
    const { t, lower } = useI18n();
    const [birthday, setBirthday] = useState(new Date());
    const [modalType, setModalType] = useState(null);
    const isModalOpen = modalType !== null;
    const openModal = (type, item) => {
        setModalType(type);
        setSelectedItem(item);
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedItem(null);
    };
    const [selectedItem, setSelectedItem] = useState(null);

    const provinces = [
        new Area('HCM', 'hcm'),
        new Area('Hà Nội', 'ha-noi'),
        new Area('Đồng Nai', 'dong-nai'),
        new Area('Vũng Tàu', 'vung-tau'),
    ];

    const wards = [new Area('Quận 1', 'q1'), new Area('Quận 2', 'q2'), new Area('Bình Thạnh', 'binh-thanh')];

    // Các loại modal
    const MODAL_TYPES = {
        ADD_ADDRESS: 'ADD_ADDRESS',
        EDIT_ADDRESS: 'EDIT_ADDRESS',
        CONFIRM_DELETE: 'CONFIRM_DELETE',
    };
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('wrapper')}>{t('your-address')}</h1>
            <button className={classNames(cx('add-btn'), 'btn')} onClick={() => openModal(MODAL_TYPES.ADD_ADDRESS)}>
                {t('add-address')}
            </button>
            <AddressList items={addresses} />
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalType === MODAL_TYPES.ADD_ADDRESS && <AddAdress />}
                {modalType === MODAL_TYPES.EDIT_ADDRESS && <EditAdress item={selectedItem} />}
                {modalType === MODAL_TYPES.CONFIRM_DELETE && <ConfirmDelete item={selectedItem} />}
            </Modal>
        </div>
    );

    function AddAdress() {
        const [name, setName] = useState('');
        const [phone, setPhone] = useState('');
        const [address, setAddress] = useState('');
        const [ward, setWard] = useState('');
        const [province, setProvince] = useState('');
        const [checkedDefault, setCheckedDefault] = useState(false);

        const handleChange = (e) => {
            setCheckedDefault(e.target.checked);
        };

        const handleProvinceChange = (e) => {
            setProvince(e.target.value);
        };
        const handleWardChange = (e) => {
            setWard(e.target.value);
        };

        return (
            <div className={cx('form-container')} style={{ padding: '10px' }}>
                <p style={{ textAlign: 'center' }}>{t('add-new-address')}</p>
                <form className="">
                    <CustomInput
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label={t('fullname')}
                        className="mb-10"
                    />
                    <CustomInput
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        label={t('phone-number')}
                        className="mb-10"
                    />
                    <CustomInput
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        label={t('address')}
                        className="mb-10"
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
                    <label>
                        <input type="checkbox" checked={checkedDefault} onChange={handleChange} />
                        <span style={{ fontSize: '1.2rem' }}> {t('set-as-default')}</span>
                    </label>
                </form>
                <div className="d-flex-space-around" style={{ marginTop: '10px' }}>
                    <button className="btn cancel-btn">{t('cancel')}</button>
                    <button className="btn confirm-btn">{t('confirm')}</button>
                </div>
            </div>
        );
    }

    function EditAdress({ item }) {
        const [name, setName] = useState(item.name);
        const [phone, setPhone] = useState(item.phone);
        const [address, setAddress] = useState(item.detail);
        const [ward, setWard] = useState(item.ward);
        const [province, setProvince] = useState(item.province);
        const [checkedDefault, setCheckedDefault] = useState(item.isDefault);

        const handleChange = (e) => {
            setCheckedDefault(e.target.checked);
        };

        const handleProvinceChange = (e) => {
            setProvince(e.target.value);
        };
        const handleWardChange = (e) => {
            setWard(e.target.value);
        };

        return (
            <div className={cx('form-container')} style={{ padding: '10px' }}>
                <p style={{ textAlign: 'center' }}>{t('edit-address')}</p>
                <form className="">
                    <CustomInput
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label={t('fullname')}
                        className="mb-10"
                    />
                    <CustomInput
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        label={t('phone-number')}
                        className="mb-10"
                    />
                    <CustomInput
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        label={t('address')}
                        className="mb-10"
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
                    <label>
                        <input type="checkbox" checked={checkedDefault} onChange={handleChange} />
                        <span style={{ fontSize: '1.2rem' }}> {t('set-as-default')}</span>
                    </label>
                </form>
                <div className="d-flex-space-around" style={{ marginTop: '10px' }}>
                    <button className="btn cancel-btn">{t('cancel')}</button>
                    <button className="btn confirm-btn">{t('confirm')}</button>
                </div>
            </div>
        );
    }

    function ConfirmDelete({ item }) {
        return (
            <div className={cx('confirm-container')} style={{ padding: '10px' }}>
                <p style={{ textAlign: 'center' }}>{t('confirm')} {lower('delete')} {lower('address')}</p>
                <p className="note" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    {t('note')}: {t('cannot-reverse')}
                </p>
                <div className={cx('address-item')}>
                    <p className={cx('label')}>
                    {t('fullname')}: <span className={cx('value')}>{item.name}</span>
                    </p>
                    <p className={cx('label')}>
                    {t('phone-number')} <span className={cx('value')}>{item.phone}</span>
                    </p>
                    <p className={cx('label')}>
                    {t('address')}{' '}
                        <span className={cx('value')}>
                            {item.detail} | {item.ward} | {item.province}
                        </span>
                    </p>
                </div>
                <div className="d-flex-space-around">
                    <button className="btn cancel-btn">{t('cancel')}</button>
                    <button className="btn confirm-btn">{t('confirm')}</button>
                </div>
            </div>
        );
    }

    function AddressList({ items }) {
        return (
            <div className={cx('address-list-container')}>
                {items.map((item) => (
                    <>
                        <AddressItem key={item.id} item={item} />
                    </>
                ))}
            </div>
        );
    }

    function AddressItem({ item }) {
        return (
            <div className={classNames(cx('address-item'), 'd-flex')}>
                <div className="grid-col-10">
                    <div className="d-flex-space-between grid-col-6 mb-10">
                        <p className={cx('label')}>
                        {t('fullname')}: <span className={cx('value')}>{item.name}</span>
                        </p>
                        <p className={cx('label')}>
                        {t('phone-number')} <span className={cx('value')}>{item.phone}</span>
                        </p>
                        {item.isDefault && <p className={cx('default-label')}>{t('default')}</p>}
                    </div>
                    <p className={cx('label')}>
                    {t('address')}{' '}
                        <span className={cx('value')}>
                            {item.detail} | {item.ward} | {item.province}
                        </span>
                    </p>
                </div>
                <div className="d-flex">
                    <p className={cx('edit-address-btn')} onClick={() => openModal(MODAL_TYPES.EDIT_ADDRESS, item)}>
                    {t('edit-address')}
                    </p>
                    {!item.isDefault && (
                        <p
                            className={cx('delete-address-btn')}
                            style={{ marginLeft: '20px' }}
                            onClick={() => openModal(MODAL_TYPES.CONFIRM_DELETE, item)}
                        >
                            {t('delete')}
                        </p>
                    )}
                </div>
            </div>
        );
    }
}

export default Address;
