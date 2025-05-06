import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
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
} from '@fortawesome/free-solid-svg-icons';

import styles from './Product.module.scss';
import images from '~/assets/images';
import { CustomInput, Modal, ImageUpload, EditorWithUseQuill as Editor, StarRating } from '~/pages/components';
import { formatMoney } from '~/utils';
import useI18n from '~/hooks/useI18n';
import { productApi } from '~/api';

// import {Editor as Editor1} from '~/pages/components/EditorWithUseQuill/Editor'

const cx = classNames.bind(styles);
const viewTypes = [
    {
        value: 'all',
        title: 'Tất cả',
    },
    {
        value: 'pen',
        title: 'Bút',
    },
    {
        value: 'book',
        title: 'sách',
    },
];

const actions = [
    {
        value: 'none',
        title: '...',
    },
    {
        value: 'EDIT',
        title: 'Cập nhật',
    },
    {
        value: 'UNLOCK',
        title: 'Mở khóa',
    },
    {
        value: 'LOCK',
        title: 'Khóa',
    },
    {
        value: 'DELETE',
        title: 'Xóa',
    },
];

const categories = [
    {
        value: 'but',
        title: 'but',
    },
    {
        value: 'vo',
        title: 'vo',
    },
    {
        value: 'sach',
        title: 'sach',
    },
    {
        value: 'dung cu hoc tap',
        title: 'dung cu hoc tap',
    },
];
function Product() {
    const { t, lower } = useI18n();
    const [searchInput, setSearchInput] = useState('');
    const formRef = useRef(null);
    const [formWidth, setFormWidth] = useState(0);
    const [isVisible, setVisible] = useState(false);
    const [searchRestults, setSearchRestults] = useState([]);
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

    const MODAL_TYPES = {
        DETAIL: 'DETAIL',
        ADD: 'ADD',
        EDIT: 'EDIT',
        DELETE: 'DELETE',
        LOCK: 'LOCK',
        UNLOCK: 'UNLOCK',
        FEEDBACK: 'FEEDBACK',
    };

    useEffect(() => {
        if (formRef.current) {
            setFormWidth(formRef.current.offsetWidth);
        }
    }, [isVisible]);

    const handleSearchSubmit = (e) => {
        //cal API
        e.preventDefault();
        if (searchInput !== '') {
            setSearchInput(searchInput);
            // addRecentSearch('bút bi');
        }
        // chuyen den trang hien thi nhung san pham tim kiem
    };

    const handleClearSearch = () => {
        setSearchInput('');
    };

    useEffect(() => {
        if (searchInput !== '') {
            const controller = new AbortController();
            const fetchData = async () => {
                try {
                    const response = await productApi.searchFiveProducts(searchInput, controller.signal);
                    setSearchRestults(response);
                } catch (error) {
                    if (error.name !== 'CanceledError') {
                        console.error('Fetch error:', error);
                    }
                }
            };
            fetchData();

            return () => {
                controller.abort(); // Huỷ API call nếu input thay đổi quá nhanh
            };
        } else {
            setSearchRestults(null);
        }
    }, [searchInput]);

    const [viewType, setViewType] = useState(viewTypes[0].value);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleViewTypeChange = (e) => {
        setViewType(e.target.value);
    };

    const data = [
        {
            id: 1,
            thumbnail: images.product1,
            name: 'but bi van phong',
            category: 'but viet',
            saledQty: 1,
            visit: 100,
            classifications: [
                {
                    title: '10 cay',
                    id: 1,
                    qty: 10,
                    saledQty: 100,
                    initPrice: 3000000,
                    price: 1000000,
                },
                {
                    title: '20 cay',
                    id: 2,
                    qty: 20,
                    saledQty: 200,
                    initPrice: 3000000,
                    price: 1000000,
                },
            ],
            imgs: [
                images.product1,
                images.product2,
                images.product3,
                images.product1,
                images.product2,
                images.product3,
            ],
            rateAvg: 4.6,
            rateNum: 100,
            label: 'new',
        },

        { id: 2, thumbnail: images.product1, name: 'but bi van phong', category: 'but viet', saledQty: 1, visit: 100 },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className="d-flex-space-between" style={{ alignItems: 'center', fontSize: '1.4rem' }}>
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
                            <option value={item.value} key={item.value}>
                                {item.title}
                            </option>
                        ))}
                </select>
            </div>
            <div className={cx('content')}>
                <ProductTable items={data}></ProductTable>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalType === MODAL_TYPES.DETAIL && <EditorProduct item={selectedItem} />}
                {modalType === MODAL_TYPES.ADD && <EditorProduct />}
                {modalType === MODAL_TYPES.EDIT && <EditorProduct item={selectedItem} />}
                {modalType === MODAL_TYPES.DELETE && <Confirm item={selectedItem} />}
                {modalType === MODAL_TYPES.LOCK && <Confirm item={selectedItem} />}
                {modalType === MODAL_TYPES.UNLOCK && <Confirm item={selectedItem} />}
                {/* {modalType === MODAL_TYPES.FEEDBACK && <Feedback item={selectedItem} />} */}
            </Modal>
        </div>
    );

    function Confirm({ item }) {
        return (
            <div style={{ padding: '10px' }}>
                <p style={{ textAlign: 'center' }}>
                    {t('confirm')}{' '}
                    {modalType === MODAL_TYPES.DELETE
                        ? lower('delete')
                        : modalType === MODAL_TYPES.LOCK
                        ? lower('lock')
                        : lower('unlock')}{' '}
                    {lower('product')} ID: {item.id}
                </p>
                {modalType === MODAL_TYPES.DELETE && (
                    <p className="note" style={{ textAlign: 'center' }}>
                        {t('note')}: {t('cannot-reverse')}
                    </p>
                )}

                <div className="d-flex-space-around" style={{ marginTop: '20px' }}>
                    <button className="btn cancel-btn">{t('cancel')}</button>
                    <button className="btn confirm-btn">{t('confirm')}</button>
                </div>
            </div>
        );
    }

    function EditorProduct({ item }) {
        const [name, setName] = useState(item?.name || '');
        const [id, setId] = useState(item?.id || null);
        const [category, setCategory] = useState(item?.category || null);
        const [saledQty, setSaledQty] = useState(item?.saledQty || 0);
        const [visit, setVisit] = useState(item?.visit || 0);
        const [label, setLabel] = useState(item?.label || null);
        const [classifications, setClassifications] = useState(item?.classifications || []);
        const [thumbnail, setThumbnail] = useState(item?.thumbnail || null);
        const [imgs, setImgs] = useState(item?.imgs || []);
        const [totalQty, setTotalQty] = useState();
        const [totalSaledQty, setTotalSaledQty] = useState();

        useEffect(() => {
            // Tính tổng qty
            const total = classifications.reduce((sum, c) => sum + (Number(c.qty) || 0), 0);
            const totalSaled = classifications.reduce((sum, c) => sum + (Number(c.saledQty) || 0), 0);
            setTotalQty(total);
            setTotalSaledQty(totalSaled);
        }, [classifications]);

        const handleCategoryChange = (e) => {
            setCategory(e.target.value);
        };
        const handleAddClassification = () => {
            const newClassification = {
                id: classifications.length + 1, // id tang tu dong de khong trung key, nhung khi add vao db thi de db tu tang
                title: '',
            };

            setClassifications([...classifications, newClassification]);
        };
        const handleUpload = (file) => {
            console.log('File được chọn:', file);
            // Gửi file lên server ở đây nếu cần
        };

        const isDisabled = modalType === MODAL_TYPES.DETAIL;

        return (
            <div className={cx('product-detail')} style={{ padding: '10px' }}>
                <p className={cx('title')}>
                    {modalType === MODAL_TYPES.DETAIL
                        ? 'Chi tiết sản phẩm'
                        : modalType === MODAL_TYPES.EDIT
                        ? 'Chỉnh sửa sản phẩm'
                        : 'Thêm sản phẩm'}
                </p>

                <form style={{ marginTop: '20px' }}>
                    <div className="d-flex-space-between">
                        <CustomInput
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label={t('name')}
                            className="mb-10"
                            disabled={isDisabled}
                        />
                        <CustomInput
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            label={t('id')}
                            className="mb-10 grid-col-2"
                            disabled={isDisabled}
                        />
                    </div>
                    {isDisabled && (
                        <div>
                            <p className={cx('heading')}>Rating</p>
                            <div className={cx('rate-container')}>
                                <StarRating rate={item.rateAvg} />
                                <p>
                                    (<span>{item.rateNum}</span>)
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="d-flex-al-center" style={{ marginTop: '10px' }}>
                        <p className={cx('heading')}>Phân loại</p>
                        <select
                            style={{ marginLeft: '10px' }}
                            value={category}
                            onChange={handleCategoryChange}
                            disabled={isDisabled}
                        >
                            {categories &&
                                categories.map((item) => (
                                    <option value={item.value} key={item.value}>
                                        {item.title}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div style={{ margin: '20px 0' }}>
                        <div className="d-flex-space-between">
                            <p className={cx('heading')}>Các phân loại của sản phẩm</p>
                            {isDisabled || (
                                <Link
                                    className="fake-a"
                                    style={{ fontSize: '1.2rem' }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleAddClassification();
                                    }}
                                >
                                    Thêm phân loại
                                </Link>
                            )}
                        </div>
                        {classifications ? (
                            classifications.map((item) => <Classification item={item} key={item.id} />)
                        ) : (
                            <p className="note">Không có phân loại</p>
                        )}
                    </div>
                    <div className="d-flex-space-between">
                        <CustomInput
                            value={totalQty}
                            onChange={(e) => setSaledQty(e.target.value)}
                            label={t('tong con lai')}
                            className="mb-10 grid-col-5"
                            disabled={true}
                        />
                        <CustomInput
                            value={totalSaledQty}
                            onChange={(e) => setSaledQty(e.target.value)}
                            label={t('da ban')}
                            className="mb-10 grid-col-5"
                            disabled={true}
                        />
                    </div>
                    <div className="d-flex-space-between">
                        <CustomInput
                            value={visit}
                            onChange={(e) => setVisit(e.target.value)}
                            label={t('Luot truy cap')}
                            className="mb-10 grid-col-5"
                            disabled={isDisabled}
                        />
                          <CustomInput
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            label={t('Nhan')}
                            className="mb-10 grid-col-5"
                            disabled={isDisabled}
                        />
                    </div>
                    <div>
                        <p className={cx('heading')}>Anh dai dien</p>
                        <div className={classNames(cx('img-container'), 'grid-col-3')}>
                            <img src={thumbnail} />
                        </div>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <p className={cx('heading')}>Anh mo ta</p>
                        <div className={classNames(cx('imgs-container'), 'grid-row')}>
                            {imgs ? (
                                imgs.map((img) => (
                                    <div className={classNames(cx('img-container'), 'grid-col-3')}>
                                        <img src={img} />
                                    </div>
                                ))
                            ) : (
                                <p className="note">Không có imgs</p>
                            )}
                        </div>
                    </div>
                    <div style={{ margin: '20px 0' }}>
                        <p className={cx('heading')}>Mo ta</p>
                        <Editor placeholder={'Write something...'} />
                    </div>
                </form>
            </div>
        );
    }

    function Classification({ item, onChange, onRemove }) {
        const [title, setTitle] = useState(item.title || '');
        const [qty, setQty] = useState(item.qty || 0);
        const [price, setPrice] = useState(item.price || 0);
        const [initPrice, setInitPrice] = useState(item.initPrice || 0);

        const saledQty = item.saledQty;

        // Gọi hàm onChange mỗi khi có thay đổi
        const handleUpdate = () => {
            onChange?.({
                ...item,
                title,
                initPrice,
                price,
                qty,
                saledQty,
            });
        };

        const isDisabled = modalType === MODAL_TYPES.DETAIL;

        return (
            <div className={classNames(cx('classification'), 'd-flex-space-between')} style={{ alignItems: 'start' }}>
                <p>
                    Phân loại:{' '}
                    {isDisabled ? (
                        <span>{title}</span>
                    ) : (
                        <input
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                handleUpdate();
                            }}
                        />
                    )}
                </p>
                <div>
                    <p style={{ marginBottom: '4px' }}>
                        Giá khởi tạo:{' '}
                        {isDisabled ? (
                            <span>{formatMoney(initPrice)}</span>
                        ) : (
                            <input
                                value={initPrice}
                                onChange={(e) => {
                                    setInitPrice(e.target.value);
                                    handleUpdate();
                                }}
                            />
                        )}
                    </p>
                    <p>
                        Đơn giá:{' '}
                        {isDisabled ? (
                            <span>{formatMoney(price)}</span>
                        ) : (
                            <input
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                    handleUpdate();
                                }}
                            />
                        )}
                    </p>
                </div>
                <div>
                    <p style={{ marginBottom: '4px' }}>
                        Còn lại:{' '}
                        {isDisabled ? (
                            <span>{qty}</span>
                        ) : (
                            <input
                                type="number"
                                value={qty}
                                onChange={(e) => {
                                    setQty(Number(e.target.value));
                                    handleUpdate();
                                }}
                            />
                        )}
                    </p>
                    <p>
                        Đã bán: <span>{saledQty}</span>
                    </p>
                </div>

                {isDisabled || (
                    <>
                        <button style={{ color: 'blue' }}>
                            <FontAwesomeIcon icon={faFloppyDisk} />
                        </button>
                        <button>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </>
                )}
            </div>
        );
    }

    function ProductTable({ items }) {
        return (
            <table className="custom-table fixed">
                <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '10%' }} />
                    {/* <col style={{ width: '10%' }} /> */}
                    <col style={{ width: '15%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Phân loại</th>
                        <th>Đã bán</th>
                        <th>Lượng truy cập</th>
                        {/* <th>Feedback</th> */}
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <RowData key={item.id} item={item} index={index} />
                    ))}
                </tbody>
            </table>
        );
    }

    function RowData({ item, index }) {
        const [action, setAction] = useState(actions[0]?.value || '');

        const handleActionChange = (e) => {
            const selectedAction = e.target.value;
            setAction(selectedAction);
            switch (selectedAction) {
                case 'EDIT':
                    openModal(MODAL_TYPES.EDIT, item);
                    break;
                case 'DELETE':
                    openModal(MODAL_TYPES.DELETE, item);
                    break;
                case 'LOCK':
                    openModal(MODAL_TYPES.LOCK, item);
                    break;
                case 'UNLOCK':
                    openModal(MODAL_TYPES.UNLOCK, item);
                    break;
            }
        };

        return (
            <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>
                    <img src={item.thumbnail} />
                </td>
                <td>{item.name}</td>
                <td className="center">{item.category}</td>
                <td className="center">{item.saledQty}</td>
                <td className="center">{item.visit}</td>
                {/* <td className="center">
                    <Link className="fake-a" style={{ fontSize: '1.3rem', marginTop: '20px' }}>
                        Feedback
                    </Link>
                </td> */}
                <td className="center">
                    <div className="d-flex-col">
                        <select
                            style={{ marginLeft: '10px', fontSize: '1.4rem' }}
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
                        <Link
                            className="fake-a"
                            style={{ fontSize: '1.3rem', marginTop: '15px' }}
                            onClick={(e) => {
                                e.preventDefault();
                                openModal(MODAL_TYPES.DETAIL, item);
                            }}
                        >
                            Chi tiết
                        </Link>
                    </div>
                </td>
            </tr>
        );
    }
}

export default Product;
