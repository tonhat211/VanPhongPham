import classNames from 'classnames/bind';
import { json, Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
    faMinus,
    faPlus,
    faTicket,
    faFloppyDisk,
    faMagnifyingGlass,
    faCircleXmark,
    faXmark,
    faAngleRight,
    faArrowTrendUp,
    faAngleDown,
    faAngleUp,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Order.module.scss';
import images from '~/assets/images';
import { CustomInput, Modal, EditorWithUseQuill as Editor, StarRating } from '~/pages/components';
import { ImageUpload, ImageUploadRemovable, MultiImageUpload } from '~/pages/components/InputFile';

import OrderModel, {
    CANCEL_STATUS,
    COMPLETE_STATUS,
    CONFIRM_COMPLETE_STATUS,
    CONFIRM_STATUS,
    DELIVERY_STATUS,
    REVIEW_STATUS,
    WAIT_STATUS,
} from '~/models/OrderModel';
import { formatMoney } from '~/utils';
import useI18n from '~/hooks/useI18n';
import { useData } from '~/context/DataContext';

import { useUpdateUrlParams } from '~/utils/url';
import { toast } from 'react-toastify';
import { getAllOrder, updateStatus } from '~/api/adminOrderApi';
import formatDateTime from '~/utils/formatDateTime';
import OrderInvoice from './OrderInvoice';

// import {Editor as Editor1} from '~/pages/components/EditorWithUseQuill/Editor'

const cx = classNames.bind(styles);
function isSmallerThan7Days(date) {
    const updatedAtDate = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today - updatedAtDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
}

const actions = [
    {
        value: 'none',
        title: '...',
    },
    {
        value: 'CONFIRM',
        title: 'Xac nhan',
    },
    {
        value: 'DELIVERY',
        title: 'Giao hang',
    },
    {
        value: 'COMPLETE',
        title: 'Thanh cong',
    },
    {
        value: 'CANCEL',
        title: 'Huy',
    },
      {
        value: 'PRINT',
        title: 'In',
    },
];

const MODAL_TYPES = {
    PRINT: 'PRINT',
};

function Order() {
    const { t, lower } = useI18n();
    const [searchInput, setSearchInput] = useState('');
    const formRef = useRef(null);
    const [formWidth, setFormWidth] = useState(0);
    const [isVisible, setVisible] = useState(false);
    const [searchRestults, setSearchRestults] = useState([]);
    const [modalType, setModalType] = useState(null);
    const isModalOpen = modalType !== null;
    const { menus, featureMenus, brands } = useData();

    const { category } = useParams(); // lấy từ URL path
    const [searchParams, setSearchParams] = useSearchParams();
    const updateUrlParams = useUpdateUrlParams();

    const page = parseInt(searchParams.get('page')) || 0;
    const [totalPages, setTotalPages] = useState(1);

    const sortBy = searchParams.get('sortBy') || 'price';
    const direction = searchParams.get('direction') || 'asc';
    const size = parseInt(searchParams.get('size') || '20');
    const navigate = useNavigate();
    const viewTypes = [
        { link: '', title: 'Tất cả' },
        ...menus.map((menu) => ({
            link: menu.link,
            title: menu.title,
        })),
    ];


    const openModal = (type, item) => {
        setModalType(type);
        setSelectedItem(item);
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedItem(null);
    };

    useEffect(() => {
        if (formRef.current) {
            setFormWidth(formRef.current.offsetWidth);
        }
    }, [isVisible]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchInput !== '') {
            setSearchInput(searchInput);
        }
    };

    const handleClearSearch = () => {
        setSearchInput('');
    };

    const [viewType, setViewType] = useState(viewTypes[0].link);
    const [selectedItem, setSelectedItem] = useState(null);



    useEffect(() => {
        fetchOrders();
    }, []);

    const [orders, setOrders] = useState([]);

    const fetchOrders = () => {
        getAllOrder()
            .then((data) => {
                setOrders(data);
            })
            .catch((err) => {
                console.error('Lỗi tải sản phẩm:');
            });
    };

    const handleUpdateStatus = async (id, status) => {
        const res = await updateStatus({ id, status });
        if (res.success === true) {
            setOrders((prev) => {
                let bumped = null;
                const rest = prev.filter((o) => {
                    if (o.id === id) {
                        bumped = { ...o, status };
                        return false;
                    }
                    return true;
                });
                return bumped ? [bumped, ...rest] : prev;
            });
            toast.success('cap nhat thanh cong');
        } else {
            toast.error('Cap nhat that bai');
        }
    };

    return (
        <div className={cx('wrapper')}>
            {/* <div className="d-flex-space-between" style={{ alignItems: 'center', fontSize: '1.4rem' }}>
                <div>
                    <form ref={formRef} className={classNames(cx('search-form'), 'd-flex')}>
                        <input
                            placeholder={t('search-product')}
                            onClick={() => setVisible(true)}
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <i className="btn-opposite" onClick={handleClearSearch}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </i>
                        <button className={classNames('btn-primary', cx('search-btn'))} onClick={handleSearchSubmit}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>
                </div>
                <Link
                    className="fake-a"
                    onClick={(e) => {
                        e.preventDefault();
                        openModal(MODAL_TYPES.ADD);
                    }}
                >
                    Thêm sản phẩm
                </Link>
            </div>
            <div className="d-flex-al-center" style={{ marginTop: '10px' }}>
                <p className={cx('pLabel')}>Xem theo phaan loaji</p>
                <select style={{ marginLeft: '10px' }} value={viewType} onChange={handleViewTypeChange}>
                    {viewTypes &&
                        viewTypes.map((item) => (
                            <option value={item.link} key={item.link}>
                                {item.title}
                            </option>
                        ))}
                </select>
            </div> */}
            <div className={cx('content')}>
                <OrderTable items={orders} onUpdate={handleUpdateStatus} />
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalType === MODAL_TYPES.PRINT && <OrderInvoice order={selectedItem} />}
            </Modal>
        </div>
    );

    function OrderTable({ items, onUpdate }) {
        return (
            <table className="custom-table fixed">
                <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '15%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Dat vao</th>
                        <th>Danh sach san pham</th>
                        <th>Tong tien</th>
                        <th>Trang thai</th>
                        <th>Cap nhat vao</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <RowData key={item.id} item={item} index={index} onUpdate={onUpdate} />
                    ))}
                </tbody>
            </table>
        );
    }

    function RowData({ item, index, onUpdate }) {
        const [action, setAction] = useState(actions[0]?.value || '');
        const isLocked = item.status === 'LOCKED';

        const handleUpdate = (id, status) => {
            onUpdate?.(id, status);
        };

        const handleActionChange = (e) => {
            const selectedAction = e.target.value;
            setAction(selectedAction);
            switch (selectedAction) {
                case 'CONFIRM':
                    handleUpdate(item.id, CONFIRM_STATUS);
                    break;
                case 'DELIVERY':
                    handleUpdate(item.id, DELIVERY_STATUS);
                    break;
                case 'COMPLETE':
                    handleUpdate(item.id, COMPLETE_STATUS);
                    break;
                case 'CANCEL':
                    handleUpdate(item.id, CANCEL_STATUS);
                    break;
                case 'PRINT':
                    openModal(MODAL_TYPES.PRINT, item);
                    break;
            }
        };

        const orderItems = item.orderItems;
        const info = orderItems
            .map(
                (item) =>
                    `ID: ${item.productId} - ${item.productName} (${item.classificationName}) x Số lượng: ${item.qty}`,
            )
            .join('\n');
        return (
            <tr key={item.id} className={cx({ blocked: isLocked })}>
                <td className="center">{item.id}</td>
                <td className={classNames(cx('time'), 'center')}>{formatDateTime(item.createdAt)}</td>
                <td style={{ whiteSpace: 'pre-line', fontSize: '1.4rem' }}>{info}</td>
                <td className={classNames(cx('price'), 'center')}>{formatMoney(item.payedMoney)}</td>
                <td className="center">
                    {' '}
                    <p className={cx('status', `${item.status}`)}>{t(item.status)}</p>
                </td>
                <td className={classNames(cx('time'), 'center')}>{formatDateTime(item.updatedAt)}</td>
                <td className="center">
                    <div className="d-flex-col">
                        <select
                            style={{ marginBottom: '10px', fontSize: '1.4rem' }}
                            value={action}
                            onChange={handleActionChange}
                        >
                            {actions &&
                                actions.map((acItem) => (
                                    <option value={acItem.value} key={acItem.value}>
                                        {acItem.title}
                                    </option>
                                ))}
                        </select>

                        {item.status == WAIT_STATUS && (
                            <button
                                className={classNames(cx('btn', 'confirm'))}
                                onClick={() => handleUpdate(item.id, CONFIRM_STATUS)}
                            >
                                {t('confirm')}
                            </button>
                        )}
                        {item.status === CONFIRM_STATUS && (
                            <button
                                className={classNames(cx('btn', 'delivery'))}
                                onClick={() => handleUpdate(item.id, DELIVERY_STATUS)}
                            >
                                {t('delivery')}
                            </button>
                        )}
                        {item.status === DELIVERY_STATUS && (
                            <button
                                className={classNames(cx('btn', 'complete'))}
                                onClick={() => handleUpdate(item.id, COMPLETE_STATUS)}
                            >
                                {t('complete')}
                            </button>
                        )}
                    </div>
                </td>
            </tr>
        );
    }
}

export default Order;
