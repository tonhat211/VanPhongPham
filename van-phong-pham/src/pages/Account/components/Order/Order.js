import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import styles from './Order.module.scss';
import { Modal } from '~/pages/components';
import { formatMoney } from '~/utils';
import { default as StarRating } from '~/pages/components/StarRating';
import useI18n from '~/hooks/useI18n';
import { getOrder, updateStatus } from '~/api/orderApi';
import OrderModel, {
    CANCEL_STATUS,
    COMPLETE_STATUS,
    CONFIRM_COMPLETE_STATUS,
    CONFIRM_STATUS,
    REVIEW_STATUS,
    WAIT_STATUS,
} from '~/models/OrderModel';
import { addReviews } from '~/api/reviewApi';
import formatDateTime from '~/utils/formatDateTime';

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

    function isSmallerThan7Days(date) {
        const updatedAtDate = new Date(date);
        const today = new Date();
        const diffTime = Math.abs(today - updatedAtDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    }

    // Các loại modal
    const MODAL_TYPES = {
        CONFIRM_CANCEL: 'CONFIRM_CANCEL',
        CONFIRM_COMPLETE: 'CONFIRM_COMPLETE',
        REVIEW: 'REVIEW',
    };

    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getOrder()
            .then((data) => {
                setOrders(data);
            })
            .catch((err) => {
                console.error('Lỗi tải don hang:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleCancel = async () => {
        const id = selectedItem.id;
        const status = CANCEL_STATUS;
        console.log('handle cancel: ' + id + ' || status: ' + status);
        const res = await updateStatus({ id, status });
        if (res.success === true && res.order) {
            const { id, status } = res.order;
            setOrders((prevOrders) => prevOrders.map((order) => (order.id === id ? { ...order, status } : order)));
            setSelectedItem((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
        closeModal();
    };

    const handleConfirmComplete = async () => {
        const id = selectedItem.id;
        const status = CONFIRM_COMPLETE_STATUS;
        console.log('handle ConfirmComplete: ' + id + ' || status: ' + status);
        const res = await updateStatus({ id, status });
        if (res.success === true && res.order) {
            const { id, status } = res.order;
            setOrders((prevOrders) => prevOrders.map((order) => (order.id === id ? { ...order, status } : order)));
            setSelectedItem((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
            closeModal();
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };

    useEffect(() => {}, [orders]);

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
                    <button className="btn cancel-btn" onClick={closeModal}>
                        {t('cancel')}
                    </button>
                    <button className="btn confirm-btn" onClick={handleCancel}>
                        {t('confirm')}
                    </button>
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
                    <button className="btn cancel-btn" onClick={closeModal}>
                        {t('cancel')}
                    </button>
                    <button className="btn confirm-btn" onClick={handleConfirmComplete}>
                        {t('confirm')}
                    </button>
                </div>
            </div>
        );
    }

    function Review({ item }) {
        const orderItems = item.orderItems;
        const [reviews, setReviews] = useState(() =>
            item.orderItems.map((orderItem) => ({
                id: orderItem.id,
                productId: orderItem.productId,
                classificationName: orderItem.classificationName,
                rating: 0,
                content: '',
            })),
        );

        const updateReview = (id, newData) => {
            setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, ...newData } : r)));
        };

        const handleSendReviews = async () => {
            const orderId = selectedItem.id || 0;
            const res = await addReviews({ orderId: orderId, reviewItems: reviews });
            if (res.success === true && res.order) {
                const { id, status } = res.order;
                setOrders((prevOrders) => prevOrders.map((order) => (order.id === id ? { ...order, status } : order)));
                setSelectedItem((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
                closeModal();
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        };

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
                    {orderItems.map((item) => (
                        <ReviewItem
                            key={item.id}
                            item={item}
                            review={reviews.find((r) => r.id === item.id)}
                            onChange={(newData) => updateReview(item.id, newData)}
                        />
                    ))}
                </div>
                <div className="d-flex-space-around">
                    <button className="btn cancel-btn" onClick={closeModal}>
                        {t('cancel')}
                    </button>
                    <button className="btn confirm-btn" onClick={handleSendReviews}>
                        {t('confirm')}
                    </button>
                </div>
            </div>
        );
    }

    function ReviewItem({ item, review, onChange }) {
        // const [text, setText] = useState('');
        // const [rate, setRate] = useState(0);
        const handleTextChange = (e) => {
            onChange({ content: e.target.value });
        };

        const handleRateChange = (newRate) => {
            onChange({ rating: newRate });
        };
        return (
            <div className={classNames(cx('cart-item'))} style={{ padding: '10px' }}>
                <div className="d-flex" style={{ marginBottom: '10px' }}>
                    <div className="grid-col-1">
                        <img src={item.thumbnail} alt="thumbnail" style={{ width: '100%' }} />
                    </div>
                    <div className={classNames(cx('product-info'), 'grid-col-10')}>
                        <p className={classNames(cx('name'))}>{item.productName}</p>
                        <p className={cx('label')}>
                            {t('classification')}: {item.classificationName}
                        </p>
                    </div>
                </div>
                <StarRating rate={review.rating} onChange={handleRateChange} />
                <textarea
                    value={review.content}
                    onChange={handleTextChange}
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
        const orderItems = item.orderItems;
        const [expanded, setExpanded] = useState(false);
        let visibleItems = expanded ? orderItems : orderItems.slice(0, 1);
        return (
            <div className={cx('order-item-container')}>
                <div className="d-flex-space-between">
                    <p className={cx('label')}>
                        ID: <span className={cx('value')}>{item.id}</span>
                    </p>
                    <div className="d-flex" style={{ alignItems: 'center' }}>
                        <p className={cx('status', `${item.status}`)}>{t(item.status)}</p>
                        {(item.status == WAIT_STATUS || item.status === CONFIRM_STATUS) && (
                            <button
                                className={classNames(cx('cancel-btn'), 'btn')}
                                onClick={() => openModal(MODAL_TYPES.CONFIRM_CANCEL, item)}
                            >
                                {t('cancel')}
                            </button>
                        )}
                        {item.status === COMPLETE_STATUS && (
                            <button
                                className={classNames(cx('complete-btn'), 'btn')}
                                onClick={() => openModal(MODAL_TYPES.CONFIRM_COMPLETE, item)}
                            >
                                {t('confirm')} {lower('complete')}
                            </button>
                        )}
                        {item.status === CONFIRM_COMPLETE_STATUS && (
                            <button
                                className={classNames(cx('review-btn'), 'btn')}
                                onClick={() => openModal(MODAL_TYPES.REVIEW, item)}
                            >
                                {t('review')}
                            </button>
                        )}
                        {(item.status === CONFIRM_COMPLETE_STATUS || item.status === REVIEW_STATUS) &&
                            isSmallerThan7Days(item.updatedAt) && (
                                <button
                                    className={classNames(cx('back-btn'), 'btn')}
                                    onClick={() => openModal(MODAL_TYPES.BACK, item)}
                                >
                                    {t('back')}
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
                        <p className={cx('label')}>
                            {t('order-on')}: {formatDateTime(item.createdAt)}
                        </p>
                        {item.updatedAt && (
                            <p className={cx('label')} style={{ marginTop: '15px' }}>
                                {t('complete-on')}: {formatDateTime(item.updatedAt)}
                            </p>
                        )}
                          <p className={cx('label')} style={{marginTop:'10px'}}>
                            {t('receiver-info')}: {item.receiverInfo}
                        </p>
                    </div>
                    <div className="">
                        <p className={classNames(cx('init-price'))}>{formatMoney(item.initMoney)}</p>
                        <p className={classNames(cx('current-price'))}>{formatMoney(item.payedMoney)}</p>
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
                    <p className={classNames(cx('name'))}>{item.productName}</p>
                    <p className={cx('label')}>
                        {t('classification')}: {item.classificationName}
                    </p>
                </div>
            </div>
        );
    }
}

export default Order;
