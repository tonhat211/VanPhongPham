import classNames from 'classnames/bind';
import { useState, useRef, useEffect, useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import styles from './Address.module.scss';
import { CustomInput, Modal } from '~/pages/components';
import Area from '~/models/Area';
import useI18n from '~/hooks/useI18n';
import { addAddress, addAdress, deleteAddress, editAddress, getAddress, getProvince, getWard } from '~/api/addressApi';

const cx = classNames.bind(styles);

function Address() {
    const { t, lower } = useI18n();
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
    const [addresses, setAddresses] = useState([]);

    const [provinces, setProvinces] = useState([]);
    const fetchProvinces = () => {
        getProvince()
            .then((data) => {
                setProvinces(data);
            })
            .catch((err) => {
                console.error('Lỗi tải dia chi:', err);
            });
    };

    // Các loại modal
    const MODAL_TYPES = {
        ADD_ADDRESS: 'ADD_ADDRESS',
        EDIT_ADDRESS: 'EDIT_ADDRESS',
        CONFIRM_DELETE: 'CONFIRM_DELETE',
    };

    const provinceMap = useMemo(() => {
        const map = new Map();
        provinces.forEach((item) => map.set(item.code, item.name));
        return map;
    }, [provinces]);

    const [areaMap, setAreaMap] = useState(new Map());

    const updateAreaMap = (areas) => {
        const map = new Map();
        areas.forEach((area) => {
            map.set(area.code, area.name);
        });
        setAreaMap(map);
    };

    useEffect(() => {
        getAddress()
            .then((data) => {
                setAddresses(data.addresses);
                const map = new Map();
                data.areas.forEach((area) => {
                    map.set(area.code, area.name);
                });
                setAreaMap(map);
            })
            .catch((err) => {
                console.error('Lỗi tải dia chi:', err);
            });

        fetchProvinces();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('wrapper')}>{t('your-address')}</h1>
            <button className={classNames(cx('add-btn'), 'btn')} onClick={() => openModal(MODAL_TYPES.ADD_ADDRESS)}>
                {t('add-address')}
            </button>
            <AddressList items={addresses} />
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalType === MODAL_TYPES.ADD_ADDRESS && (
                    <AddAddress provinceMap={provinceMap} updateAreaMap={updateAreaMap} />
                )}
                {modalType === MODAL_TYPES.EDIT_ADDRESS && (
                    <EditAddress
                        item={selectedItem}
                        areaMap={areaMap}
                        updateAreaMap={updateAreaMap}
                        provinceMap={provinceMap}
                    />
                )}
                {modalType === MODAL_TYPES.CONFIRM_DELETE && <ConfirmDelete item={selectedItem} />}
            </Modal>
        </div>
    );

    function AddAddress({ provinceMap, updateAreaMap }) {
        const [name, setName] = useState('');
        const [phone, setPhone] = useState('');
        const [detail, setDetail] = useState('');
        const [ward, setWard] = useState('');
        const [province, setProvince] = useState('');
        const [checkedDefault, setCheckedDefault] = useState(false);

        const [wardMap, setWardMap] = useState(new Map());

        const handleChange = (e) => {
            setCheckedDefault(e.target.checked);
        };

        const handleProvinceChange = (e) => {
            // setProvince(e.target.value);
            const code = e.target.value; // luôn là string
            if (code !== province) {
                // tránh set trùng
                setProvince(code);
                setWard(''); // reset ward khi đổi tỉnh
                setWardMap(new Map()); // xoá danh sách xã/phường cũ
            }
        };

        const fetchWards = (provinceCode) => {
            getWard({ provinceCode })
                .then((data) => {
                    const map = new Map();
                    data.forEach((area) => {
                        map.set(area.code, area.name);
                    });
                    setWardMap(map);
                })
                .catch((err) => {
                    console.error('Lỗi tải dia chi:', err);
                });
        };

        useEffect(() => {
            if (!province) return;
            fetchWards(province);
        }, [province]);

        const handleWardChange = (e) => {
            setWard(e.target.value);
        };

        const handleAdd = async () => {
            const isDefault = checkedDefault ? 1 : 0;
            const re = await addAddress({ name, phone, province, ward, detail, isDefault });
            if (re.success === true) {
                setAddresses(re.addresses);

                updateAreaMap(re.areas);
                closeModal();
                toast.success(re.message);
            } else {
                toast.error(re.message);
            }
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
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        label={t('address')}
                        className="mb-10"
                    />
                    <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                        <div className="grid-col-5">
                            <select value={province} onChange={handleProvinceChange}>
                                <option value="">{t('choose-province')}</option>
                                {provinceMap &&
                                    Array.from(provinceMap.entries()).map(([code, name]) => (
                                        <option value={code} key={code}>
                                            {name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="grid-col-5">
                            <select value={ward} onChange={handleWardChange}>
                                <option value="">{t('choose-ward')}</option>
                                {wardMap &&
                                    Array.from(wardMap.entries()).map(([code, name]) => (
                                        <option value={code} key={code}>
                                            {name}
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
                    <button className="btn cancel-btn" onClick={closeModal}>
                        {t('cancel')}
                    </button>
                    <button className="btn confirm-btn" onClick={handleAdd}>
                        {t('confirm')}
                    </button>
                </div>
            </div>
        );
    }

    function EditAddress({ item, updateAreaMap, provinceMap }) {
        const [name, setName] = useState(item.name);
        const [phone, setPhone] = useState(item.phone);
        const [detail, setDetail] = useState(item.detail);
        const [ward, setWard] = useState(item.ward);
        const [province, setProvince] = useState(item.province);
        const [checkedDefault, setCheckedDefault] = useState(item.isDefault);
        const [wardMap, setWardMap] = useState(new Map());

        const fetchWards = (provinceCode) => {
            getWard({ provinceCode })
                .then((data) => {
                    const map = new Map();
                    data.forEach((area) => {
                        map.set(area.code, area.name);
                    });
                    setWardMap(map);
                })
                .catch((err) => {
                    console.error('Lỗi tải dia chi:', err);
                });
        };

        const handleChange = (e) => {
            setCheckedDefault(e.target.checked);
        };

        const handleProvinceChange = (e) => {
            // setProvince(e.target.value);
            const code = e.target.value;
            if (code !== province) setProvince(code);
        };

        useEffect(() => {
            fetchWards(province);
        }, [province]);

        // useEffect(() => {
        //     fetchWards(item.province);
        // }, []);

        const handleWardChange = (e) => {
            setWard(e.target.value);
        };

        const handleEdit = async () => {
            const isDefault = checkedDefault ? 1 : 0;
            const id = item.id;
            const re = await editAddress({ id, name, phone, province, ward, detail, isDefault });
            if (re.success === true) {
                setAddresses(re.addresses);
                updateAreaMap(re.areas);
                closeModal();
                toast.success(re.message);
            } else {
                toast.error(re.message);
            }
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
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        label={t('address')}
                        className="mb-10"
                    />
                    <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                        <div className="grid-col-5">
                            <select value={province} onChange={handleProvinceChange}>
                                <option value="">{t('choose-province')}</option>
                                {provinceMap &&
                                    Array.from(provinceMap.entries()).map(([code, name]) => (
                                        <option value={code} key={code}>
                                            {name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="grid-col-5">
                            <select value={ward} onChange={handleWardChange}>
                                <option value="">{t('choose-ward')}</option>
                                {wardMap &&
                                    Array.from(wardMap.entries()).map(([code, name]) => (
                                        <option value={code} key={code}>
                                            {name}
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
                    <button className="btn cancel-btn" onClick={closeModal}>
                        {t('cancel')}
                    </button>
                    <button className="btn confirm-btn" onClick={handleEdit}>
                        {t('confirm')}
                    </button>
                </div>
            </div>
        );
    }

    function ConfirmDelete({ item }) {
        const handleDelete = async () => {
            const id = item.id;
            const re = await deleteAddress({ id });
            if (re.success === true) {
                setAddresses(re.addresses);
                closeModal();
                toast.success(re.message);
            } else {
                toast.error(re.message);
            }
        };

        return (
            <div className={cx('confirm-container')} style={{ padding: '10px' }}>
                <p style={{ textAlign: 'center' }}>
                    {t('confirm')} {lower('delete')} {lower('address')}
                </p>
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
                            {item.detail} | {areaMap.get(item.ward) || item.ward} |{' '}
                            {areaMap.get(item.province) || item.province}
                        </span>
                    </p>
                </div>
                <div className="d-flex-space-around">
                    <button className="btn cancel-btn" onClick={closeModal}>
                        {t('cancel')}
                    </button>
                    <button className="btn confirm-btn" onClick={handleDelete}>
                        {t('confirm')}
                    </button>
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
                    <div className="d-flex-space-between mb-10 grid-col-10">
                        <p className={cx('label')}>
                            {t('fullname')}: <span className={cx('value')}>{item.name}</span>
                        </p>
                        <p className={cx('label')}>
                            {t('phone-number')} <span className={cx('value')}>{item.phone}</span>
                            {item.isDefault === 1 && <span className={cx('default-label')}>{t('default')}</span>}
                        </p>
                    </div>
                    <p className={cx('label')}>
                        {t('address')}{' '}
                        <span className={cx('value')}>
                            {item.detail} | {areaMap.get(item.ward) || item.ward} |{' '}
                            {areaMap.get(item.province) || item.province}
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
