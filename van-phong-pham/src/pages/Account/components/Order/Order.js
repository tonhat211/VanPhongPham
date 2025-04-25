import classNames from 'classnames/bind';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import styles from './Order.module.scss';
import { Modal } from '~/pages/components';
import { formatMoney } from '~/utils';
import orders from '~/data/orders';
import { default as StarRating } from '~/pages/components/StarRating';
import useI18n from '~/hooks/useI18n'


const cx = classNames.bind(styles);

function Order() {
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

    const statusMap = {
        0: 'Chờ xác nhận',
        1: 'Đã xác nhận',
        2: 'Vận chuyển',
        3: 'Hoàn thành',
        4: 'Hoàn thành',
        // -1: 'Trả hàng',
        // -2: 'Xác',
        // -3: 'Đã hủy',
        // -4: 'Đã hủy'
    };

    const WAIT = 0;
    const CONFIRM = 1;
    const DELIVERY = 2;
    const COMPLETE = 3;
    const REVIEW = 4;
    const CANCEL = -1;
    const BACK = -2;
    const BACKING = -3;
    const BACKED = -4;

    // Các loại modal
    const MODAL_TYPES = {
        CONFIRM_CANCEL: 'CONFIRM_CANCEL',
        CONFIRM_COMPLETE: 'CONFIRM_COMPLETE',
        REVIEW: 'REVIEW',
    };
    return (
        <div className={cx('wrapper')}>
            <h1>{t('your-order')}</h1>
            <OrderList items={orders} />
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalType === MODAL_TYPES.CONFIRM_CANCEL && <ConfirmCancel item={selectedItem} />}
                {modalType === MODAL_TYPES.CONFIRM_COMPLETE && <ConfirmComplete item={selectedItem} />}
                {modalType === MODAL_TYPES.REVIEW && <Review item={selectedItem} />}
            </Modal>
        </div>
    );

    function ConfirmCancel({ item }) {
        return (
            <div style={{ padding: '10px' }}>
                <p style={{ textAlign: 'center' }}>
                    {t('confirm')} {lower('cancel')} {lower('order')} ID: {item.id}
                </p>
                <p className="note" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    {t('note')}: {t('cannot-reverse')}
                </p>
                <div className="d-flex-space-around">
                    <button className="btn cancel-btn">{t('cancel')}</button>
                    <button className="btn confirm-btn">{t('confirm')}</button>
                </div>
            </div>
        );
    }

    function ConfirmComplete({ item }) {
        return (
            <div style={{ padding: '10px' }}>
                <p style={{ textAlign: 'center' }}>
                    {t('confirm')} {lower('complete')} {lower('order')} ID: {item.id}
                </p>
                <p className="note" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    {t('received-and-payed-success')}
                </p>
                <div className="d-flex-space-around">
                    <button className="btn cancel-btn">{t('cancel')}</button>
                    <button className="btn confirm-btn">{t('confirm')}</button>
                </div>
            </div>
        );
    }

    function Review({ item }) {
        const cartItems = item.cartItems;
        return (
            <div style={{ padding: '10px' }}>
                <p style={{ textAlign: 'center' }}>
                    {t('review')} {lower('order')}
                </p>
                <p className="note" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    {t('just-can-review-once')}
                </p>
                <p className={cx('label')}>
                    ID: <span className={cx('value')}>{item.id}</span>
                </p>
                <div className="divider"></div>
                <div className={cx('review-list-container')}>
                    {cartItems.map((item) => (
                        <ReviewItem key={item.id} item={item} />
                    ))}
                </div>
                <div className="d-flex-space-around">
                    <button className="btn cancel-btn">{t('cancel')}</button>
                    <button className="btn confirm-btn">{t('confirm')}</button>
                </div>
            </div>
        );
    }

    function ReviewItem({ item }) {
        const [text, setText] = useState('');
        const [rate, setRate] = useState(0);
        return (
            <div className={classNames(cx('cart-item'))} style={{ padding: '10px' }}>
                <div className="d-flex" style={{ marginBottom: '10px' }}>
                    <div className="grid-col-1">
                        <img src={item.thumbnail} alt="thumbnail" style={{ width: '100%' }} />
                    </div>
                    <div className={classNames(cx('product-info'), 'grid-col-10')}>
                        <p className={classNames(cx('name'))}>{item.name}</p>
                        <p className={cx('label')}>
                            {t('classification')}: {item.classification}
                        </p>
                    </div>
                </div>
                <StarRating rate={rate} onChange={setRate} />
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={5}
                    placeholder={`${t('type-here')}...`}
                    style={{ margin: '10px 0', padding: '10px', width: '100%' }}
                />
            </div>
        );
    }

    function OrderList({ items }) {
        return (
            <div className={cx('order-list-container')}>
                {items.map((item) => (
                    <>
                        <OrderItem key={item.id} item={item} />
                    </>
                ))}
            </div>
        );
    }

    function OrderItem({ item }) {
        const cartItems = item.cartItems;
        const [expanded, setExpanded] = useState(false);
        let visibleItems = expanded ? cartItems : cartItems.slice(0, 1);
        return (
            <div className={cx('order-item-container')}>
                <div className="d-flex-space-between">
                    <p className={cx('label')}>
                        ID: <span className={cx('value')}>{item.id}</span>
                    </p>
                    <div className="d-flex" style={{ alignItems: 'center' }}>
                        <p className={cx('status', `status-${item.status}`)}>{statusMap[item.status]}</p>
                        {(item.status == 0 || item.status == 1) && (
                            <button
                                className={classNames(cx('cancel-btn'), 'btn')}
                                onClick={() => openModal(MODAL_TYPES.CONFIRM_CANCEL, item)}
                            >
                                {t('cancel')}
                            </button>
                        )}
                        {item.status == 3 && (
                            <button
                                className={classNames(cx('complete-btn'), 'btn')}
                                onClick={() => openModal(MODAL_TYPES.CONFIRM_COMPLETE, item)}
                            >
                                {t('confirm')} {lower('complete')}
                            </button>
                        )}
                        {item.status == 4 && (
                            <button
                                className={classNames(cx('review-btn'), 'btn')}
                                onClick={() => openModal(MODAL_TYPES.REVIEW, item)}
                            >
                                {t('review')}
                            </button>
                        )}
                    </div>
                </div>
                <div className="divider"></div>
                <div className={cx('cart-list-container')}>
                    {visibleItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}

                    <div className={classNames(cx('more-btn'), 'btn')} onClick={() => setExpanded(!expanded)}>
                        {expanded ? (
                            <>
                                {t('less')}
                                <i>
                                    <FontAwesomeIcon icon={faAngleUp} style={{ marginLeft: '5px' }} />
                                </i>
                            </>
                        ) : (
                            <>
                                {t('more')}
                                <i>
                                    <FontAwesomeIcon icon={faAngleDown} style={{ marginLeft: '5px' }} />
                                </i>
                            </>
                        )}
                    </div>
                </div>
                <div className="d-flex-space-between">
                    <div className="">
                        <p className={cx('label')}>{t('order-on')}: {item.setDate}</p>
                        {item.completeDate && (
                            <p className={cx('label')} style={{ marginTop: '15px' }}>
                                {t('complete-on')}: {item.completeDate}
                            </p>
                        )}
                    </div>
                    <div className="">
                        <p className={classNames(cx('init-price'))}>{formatMoney(item.initPrice)}</p>
                        <p className={classNames(cx('current-price'))}>{formatMoney(item.totalPrice)}</p>
                    </div>
                </div>
            </div>
        );
    }

    function CartItem({ item }) {
        return (
            <div className={classNames(cx('cart-item'), 'd-flex')}>
                <div className="grid-col-1">
                    <img src={item.thumbnail} alt="thumbnail" style={{ width: '100%' }} />
                </div>
                <div className={classNames(cx('product-info'), 'grid-col-10')}>
                    <p className={classNames(cx('name'))}>{item.name}</p>
                    <p className={cx('label')}>{t('classification')}: {item.classification}</p>
                </div>
            </div>
        );
    }
}

export default Order;
