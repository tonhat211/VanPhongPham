import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
    faMinus,
    faPlus,
    faTicket,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import styles from './Checkout.module.scss';
import CheckoutHeader from './components/CheckoutHeader';
import { CustomInput, Modal } from '../components';
import icons from '~/assets/icons';
import { formatMoney } from '~/utils';
import { getCartByIds } from '~/api/cartApi';
import { addOrder } from '~/api/orderApi';
import { getAddress } from '~/api/addressApi';
import useI18n from '~/hooks/useI18n';

const cx = classNames.bind(styles);
function Checkout() {
    const { t, lower } = useI18n();

    // const { t, i18n } = useTranslation();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [province, setProvince] = useState('');
    const [ward, setWard] = useState('');
    const [isFreeship, setFreeship] = useState(true);
    const [selectedPayment, setSelectedPayment] = useState('cod');
    const paymentOptions = [
        { value: 'cod', label: t('cod'), icon: icons.icon_cod },
        { value: 'vnpay', label: t('online-with-vnpay'), icon: icons.icon_vnpay },
        { value: 'momo', label: t('online-with-momo'), icon: icons.icon_momo },
        { value: 'zalopay', label: t('online-with-zalopay-by-qrcode'), icon: icons.icon_zalopay },
        { value: 'shopeepay', label: t('online-with-shopeepay'), icon: icons.icon_shopeepay },
    ];
    const [note, setNote] = useState('');

    const [shippingFee, setShippingFee] = useState(0);
    const [payingMoney, setPayingMoney] = useState(0);

    const [cartItems, setCartItems] = useState([]);
    const totalPrice = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
    }, [cartItems]);
    const [modalType, setModalType] = useState(null);

    const isModalOpen = modalType !== null;
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleQtyChange = (id, newQty) => {
        const updatedItems = cartItems.map((item) => (item.id === id ? { ...item, qty: newQty } : item));
        setCartItems(updatedItems);
    };

    const handleChangeFreeship = (e) => {
        setFreeship(e.target.checked);
    };

    const [addresses, setAddresses] = useState([]);

    const [areaMap, setAreaMap] = useState(new Map());

    const fetchAddresses = () => {
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
            })
            .finally(() => {});
    };

    const location = useLocation();
    const selectedItems = location.state?.selectedItems || [];

    useEffect(() => {
        const fetchCartItem = (ids) => {
        console.log("selected item: " + JSON.stringify(ids,null,2))

            setLoading(true);
            getCartByIds({
                ids,
            })
                .then((data) => {
                    setCartItems(data);
                })
                .catch((err) => {
                    console.error('Lỗi tải sản phẩm:', err);
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        fetchCartItem(selectedItems);
        fetchAddresses();
    }, []);

    useEffect(() => {
        if (Array.isArray(addresses) && addresses.length > 0) {
            const first = addresses[0];
            setAddress(
                first.detail +
                    ', ' +
                    (areaMap.get(first.ward) || first.ward) +
                    ', ' +
                    (areaMap.get(first.province) || first.province),
            );
            setName(first.name);
            setPhone(first.phone);
        }
    }, [addresses]);

    useEffect(() => {
        setPayingMoney(totalPrice + shippingFee);
    }, [totalPrice, shippingFee, cartItems]);

    const handleOrder = async () => {
        const cartIds = selectedItems;
        const receiverInfo = name + ' (' + phone + ') Địa chỉ: ' + address;
        const addResult = await addOrder({ cartIds, receiverInfo, shippingFee, voucherCode: null, note });
        if (addResult === true) {
            navigate('/account?view=orders');
        }
    };

    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (type, item) => {
        console.log('open modal');
        setModalType(type);
        // setSelectedItem(item);
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedItem(null);
    };

    // Các loại modal
    const MODAL_TYPES = {
        CHANGE_ADDRESS: 'CHANGE_ADDRESS',
    };

    const updateAddress = (address) => {
          setAddress(
                address.detail +
                    ', ' +
                    (areaMap.get(address.ward) || address.ward) +
                    ', ' +
                    (areaMap.get(address.province) || address.province),
            );
            setName(address.name);
            setPhone(address.phone);
    };

    return (
        <div className={cx('wrapper')}>
            <CheckoutHeader />
            <div className="d-flex p-0-80">
                <div className="grid-col-7 p-20">
                    <div className={cx('content-container')}>
                        <div className="d-flex-space-between">
                            <p className={cx('title')}>{t('account')}</p>
                            <Link to="/logout" className="btn" style={{ marginBottom: '20px', fontSize: '1.4rem' }}>
                                {/* {t('more-product')}  */}
                                {t('logout')}
                            </Link>
                        </div>
                        <div className={classNames(cx('account-info'), 'd-flex')}>
                            <p className={classNames(cx('avatar-container'))}>TM</p>

                            <div className={cx('info-container')}>
                                <p className={cx('name')}>To minh nhat</p>
                                <p className={cx('info')}>21130463@st.hcmuaf.edu.vn</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('content-container')}>
                        <div className="d-flex-space-between">
                            <p className={cx('title')}>{t('delivery-info')}</p>
                            <p className="fake-a" style={{fontSize: '1.4rem'}} onClick={() => openModal(MODAL_TYPES.CHANGE_ADDRESS)}>
                                {t('change-address')}
                            </p>
                        </div>
                        <form>
                            <CustomInput
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                label={t('fullname')}
                                className="mb-10"
                                disabled={true}
                            />
                            <CustomInput
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                label={t('phone-number')}
                                className="mb-10"
                                disabled={true}
                            />
                            <CustomInput
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                label={t('address')}
                                className="mb-10"
                                disabled={true}
                            />
                            {/* <div className="d-flex" style={{ justifyContent: 'space-between' }}>
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
                            </div> */}
                        </form>
                    </div>
                    <div className={cx('content-container')}>
                        <p className={cx('title')}>{t('delivery-method')}</p>
                        <div>
                            <div className={cx('checkout-item')}>
                                <label className={cx('circle-checkbox')}>
                                    <input type="checkbox" checked={isFreeship} onChange={handleChangeFreeship} />
                                    <span className={cx('checkmark')}></span>
                                    {t('free')}
                                </label>
                                <p>{t('free')}</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('content-container')}>
                        <p className={cx('title')}>{t('payment-method')}</p>
                        <div>
                            {paymentOptions.map((item) => (
                                <RadioItem
                                    key={item.value}
                                    item={item}
                                    name="payment"
                                    selectedValue={selectedPayment}
                                    onChange={setSelectedPayment}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={cx('content-container')}>
                        <input
                            className={cx('note-input')}
                            placeholder={t('note-for-order')}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>
                </div>
                <div className="grid-col-5 p-20">
                    <div className={cx('content-container')}>
                        <p className={cx('title')}>{t('the-order')}</p>
                        <CartList items={cartItems} onQtyChange={handleQtyChange} />
                    </div>
                    <div className={cx('content-container', 'voucher-container')}>
                        <p className={cx('title')}>{t('voucher')}</p>
                        <button onClick={openModal}>
                            <p>
                                {' '}
                                <i>
                                    <FontAwesomeIcon icon={faTicket} style={{ marginLeft: '5px' }} />
                                </i>{' '}
                                {t('choose-voucher')}
                            </p>
                            <i>
                                <FontAwesomeIcon icon={faAngleRight} style={{ marginLeft: '5px' }} />
                            </i>
                        </button>
                        <div className="d-flex-space-between">
                            <input
                                // className={cx('note-input')}
                                placeholder={t('enter-voucher')}
                                // value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                            <div className="grid-col-3">
                                <button className={classNames(cx('btn'))}>{t('apply')}</button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('content-container', 'summary-container')}>
                        <p className={cx('title')}>{t('summary-of-order')}</p>
                        <div className="d-flex-space-between mb-10">
                            <p>{t('total-product-money')}</p>
                            <p> {formatMoney(totalPrice)}</p>
                        </div>
                        <div className="d-flex-space-between mb-10">
                            <p>{t('shipping-fee')}</p>
                            <p> {formatMoney(shippingFee)}</p>
                        </div>
                        <div className="d-flex-space-between mb-10" style={{ fontWeight: '600' }}>
                            <p>{t('total-payment-money')}</p>
                            <p> {formatMoney(payingMoney)}</p>
                        </div>
                        <button className={classNames(cx('order-btn'))} onClick={handleOrder}>
                            {t('let-order')}
                        </button>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalType === MODAL_TYPES.CHANGE_ADDRESS && (
                    <ChangeAddress addresses={addresses} updateAddress={updateAddress} />
                )}
            </Modal>
        </div>
    );

    function ChangeAddress({ addresses, updateAddress }) {
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
                <div className={cx('address-item')} onClick={() => handleChosen(item)}>
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
            );
        }

        const handleChosen = (item) => {
            updateAddress(item);
            closeModal();
        }

        return (
            <div className={cx('confirm-container')} style={{ padding: '10px' }}>
                <p style={{ textAlign: 'center' }}>
                    {t('address-list')}
                </p>
                <p className="note" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    {t('choose-address-you-want-to-receive')}
                </p>
                <AddressList items={addresses} />
               
            </div>
        );
    }

    function RadioItem({ item, selectedValue, onChange, name }) {
        return (
            <div className={cx('checkout-item')}>
                <label className={cx('circle-checkbox')}>
                    <input
                        type="radio"
                        value={item.value}
                        name={name}
                        checked={selectedValue === item.value}
                        onChange={() => onChange(item.value)}
                    />
                    <span className={cx('checkmark')}></span>
                    <div className={cx('img-container')}>
                        <img src={item.icon} alt="" />
                    </div>
                    {item.label}
                </label>
            </div>
        );
    }

    function CartList({ items, onQtyChange }) {
        return (
            <div className={cx('cart-list-container')}>
                {items.map((item) => (
                    <div key={item.id}>
                        <CartItem item={item} onQtyChange={onQtyChange} />
                    </div>
                ))}
            </div>
        );
    }

    function CartItem({ item, onQtyChange }) {
        const [qty, setQty] = useState(item.qty);

        const handlePlus = () => {
            setQty((prev) => prev + 1);
            // onQtyChange(item.id, qty)
        };

        const handleMinus = () => {
            if (qty > 1) {
                const newQty = qty - 1;
                setQty(newQty);
                // onQtyChange(item.id, newQty);
            }
        };

        return (
            <div className={classNames(cx('cart-item'), 'd-flex')}>
                <div className="grid-col-1_5">
                    <img src={item.imageUrl} alt="thumbnail" style={{ width: '100%' }} />
                </div>
                <div className={classNames(cx('product-info'), 'grid-col-10')}>
                    <div className="d-flex">
                        <p className={classNames(cx('name'), 'grid-col-11')}>{item.productName}</p>
                        <i>
                            <FontAwesomeIcon icon={faTrash} style={{ marginLeft: '5px' }} />
                        </i>
                    </div>
                    <button className="btn">
                        {' '}
                        {item.productDetailTitle}{' '}
                        <span>
                            {' '}
                            <FontAwesomeIcon icon={faAngleRight} style={{ marginLeft: '5px' }} />
                        </span>
                    </button>
                    <div className="d-flex-space-between">
                        <div>
                            <p className={classNames(cx('init-price'))}>{formatMoney(item.initPrice)}</p>
                            <p className={classNames(cx('current-price'))}>{formatMoney(item.price)}</p>
                        </div>
                        <div className={classNames(cx('qty-control'))}>
                            <i onClick={handleMinus}>
                                <FontAwesomeIcon icon={faMinus} />
                            </i>
                            <input
                                // className={cx('note-input')}

                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                            />
                            <i onClick={handlePlus}>
                                <FontAwesomeIcon icon={faPlus} />
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Checkout;
