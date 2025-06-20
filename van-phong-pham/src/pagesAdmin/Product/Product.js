import classNames from 'classnames/bind';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
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
import { CustomInput, Modal, EditorWithUseQuill as Editor, StarRating } from '~/pages/components';
import { ImageUpload, MultiImageUpload } from '~/pages/components/InputFile/index';

import { formatMoney } from '~/utils';
import useI18n from '~/hooks/useI18n';
import { productApi } from '~/api';
import { useData } from '~/context/DataContext';
import { getProductsByCategory } from '~/api/productApi';
import {
    getAdminProductDetails,
    getAdminProductsAllCategory,
    getAdminProductsByCategory,
    updateBaseProduct,
    updateClassification,
} from '~/api/adminProductApi';
import { useUpdateUrlParams } from '~/utils/url';
import { set } from 'date-fns';
import { uploadThumbnail } from '~/api/uploadApi';
import { toast } from 'react-toastify';

// import {Editor as Editor1} from '~/pages/components/EditorWithUseQuill/Editor'

const cx = classNames.bind(styles);
// const viewTypes = [
//     {
//         value: 'all',
//         title: 'Tất cả',
//     },
//     {
//         value: 'pen',
//         title: 'Bút',
//     },
//     {
//         value: 'book',
//         title: 'sách',
//     },
// ];

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

// const categories = [
//     {
//         value: 'but',
//         title: 'but',
//     },
//     {
//         value: 'vo',
//         title: 'vo',
//     },
//     {
//         value: 'sach',
//         title: 'sach',
//     },
//     {
//         value: 'dung cu hoc tap',
//         title: 'dung cu hoc tap',
//     },
// ];

function Product() {
    const { t, lower } = useI18n();
    const [searchInput, setSearchInput] = useState('');
    const formRef = useRef(null);
    const [formWidth, setFormWidth] = useState(0);
    const [isVisible, setVisible] = useState(false);
    const [searchRestults, setSearchRestults] = useState([]);
    const [modalType, setModalType] = useState(null);
    const isModalOpen = modalType !== null;
    const { menus, featureMenus } = useData();

    const { category } = useParams(); // lấy từ URL path
    const [searchParams, setSearchParams] = useSearchParams();
    const updateUrlParams = useUpdateUrlParams();

    const page = parseInt(searchParams.get('page')) || 0;
    const [totalPages, setTotalPages] = useState(1);

    const sortBy = searchParams.get('sortBy') || 'price';
    const direction = searchParams.get('direction') || 'asc';
    const size = parseInt(searchParams.get('size') || '20');
    const [products, setProducts] = useState([]);
    const [productDetails, setProductDetails] = useState(null);

    const viewTypes = [
        { link: 'all', title: 'Tất cả' },
        ...menus.map((menu) => ({
            link: menu.link,
            title: menu.title,
        })),
    ];

    const categories = [
        {
            link: 'none',
            title: 'Không xác định',
        },
        ...menus.map((menu) => ({
            link: menu.link,
            title: menu.title,
        })),
    ];

    const subCategories = [
        {
            link: 'none',
            title: 'Không xác định',
        },
        ...menus.flatMap((menu) =>
            (menu.subs || []).map((sub) => ({
                link: sub.link,
                title: sub.title,
            })),
        ),
    ];

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

    const [viewType, setViewType] = useState(viewTypes[0].link);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleViewTypeChange = (e) => {
        setViewType(e.target.value);
    };

    useEffect(() => {
        getAdminProductsAllCategory({
            sortBy,
            direction,
            page,
            size,
        })
            .then((data) => {
                setProducts(data.content);
                const pageInfo = data.pageInfo;
                setTotalPages(pageInfo.totalPages);
            })
            .catch((err) => {
                console.error('Lỗi tải sản phẩm:', err);
            });
    }, []);

    const [tempModalType, setTempModalType] = useState(null);
    useEffect(() => {
        getAdminProductsByCategory({
            category,
            sortBy,
            direction,
            page,
            size,
        })
            .then((data) => {
                setProducts(data.content);
                const pageInfo = data.pageInfo;

                setTotalPages(pageInfo.totalPages);
            })
            .catch((err) => {
                console.error('Lỗi tải sản phẩm:', err);
            });
    }, [category, sortBy, direction, page, size]);

    // useEffect(() => {
    //     if (selectedItem) fetchProductDetails(selectedItem.id);
    //     setSelectedItem(null);
    // }, [selectedItem]);

    useEffect(
        () => {
            if (productDetails && tempModalType) openModal(tempModalType, productDetails);
            setTempModalType(null);
        },
        [productDetails],
        tempModalType,
    );

    const fetchProductDetails = (id) => {
        getAdminProductDetails({
            id,
        })
            .then((data) => {
                setProductDetails(data);
            })
            .catch((err) => {
                console.error('Lỗi tải chi tiết sản phẩm:', err);
            });
    };

    const handleClickItem = (item) => {
        fetchProductDetails(item.id);
        setTempModalType(MODAL_TYPES.DETAIL);
    };

    const handleEditAction = (item) => {
        fetchProductDetails(item.id);
        setTempModalType(MODAL_TYPES.EDIT);
    };

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
                            <option value={item.link} key={item.link}>
                                {item.title}
                            </option>
                        ))}
                </select>
            </div>
            <div className={cx('content')}>
                <ProductTable items={products}></ProductTable>
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
        console.log('Edit procduct');
        console.log(item);
        const [name, setName] = useState(item?.name || '');
        const [id, setId] = useState(item?.id || null);
        const [label, setLabel] = useState(item?.label || null);
        const [totalQty, setTotalQty] = useState();
        const [avgRating, setAvgRating] = useState(item?.avgRating || 0);
        const [totalReview, setTotalReview] = useState(item?.totalReview || 0);
        const [totalRemainQty, setTotalRemainQty] = useState(item?.totalRemainQty || 0);
        const [totalSoldQty, setTotalSoldQty] = useState(item?.totalSoldQty || 0);
        const [thumbnailUrl, setThumbnailUrl] = useState(item?.thumbnailUrl || '');
        const [thumbnailId, setThumbnailId] = useState(item?.thumbnailId || 0);
        const [description, setDescription] = useState(item?.description || '');
        const [categoryCode, setCategoryCode] = useState(item?.categoryCode || '');
        const [subCategoryCode, setSubCategoryCode] = useState(item?.subCategoryCode || '');
        const [brandCode, setBrandCode] = useState(item?.brandCode || '');
        const [status, setStatus] = useState(item?.status || '');
        const [classifications, setClassifications] = useState(item?.classifications || []);
        const [images, setImages] = useState(item?.images || []);

        useEffect(() => {
            // Tính tổng qty
            const total = classifications.reduce((sum, c) => sum + (Number(c.qty) || 0), 0);
            // const totalSaled = classifications.reduce((sum, c) => sum + (Number(c.saledQty) || 0), 0);
            setTotalQty(total);
            // setTotalSaledQty(totalSaled);
        }, [classifications]);

        const handleCategoryChange = (e) => {
            setCategoryCode(e.target.value);
        };

        const handleAddClassification = () => {
            const newClassification = {
                id: classifications.length + 1, // id tang tu dong de khong trung key, nhung khi add vao db thi de db tu tang
                title: '',
            };

            setClassifications([...classifications, newClassification]);
        };

        const [tempThumbnailUrl, setTempThumbnailUrl] = useState(null);
        const [thumbnailFile, setThumbnailFile] = useState(null);

        const handleThumb = (file) => {
            if (file) {
                // Chọn ảnh mới
                const objUrl = URL.createObjectURL(file);
                setTempThumbnailUrl(objUrl); // hiển thị trước
                setThumbnailFile(file); // lưu để upload khi nhấn Save
            } else {
                // Đã bấm nút xoá ⇒ quay về ảnh gốc
                setTempThumbnailUrl(thumbnailUrl);
                setThumbnailFile(null);
            }
        };

        const [addedImgs, setAddedImgs] = useState([]);
        const [keptImgs, setKeptImgs] = useState([]);
        const [removedImgs, setRemovedImgs] = useState([]);

        const handleImagesChange = ({ added, kept, removed }) => {
            console.log('🟢 Thêm:', added);
            console.log('🟡 Giữ lại:', kept);
            console.log('🔴 Bị xoá:', removed);
            setAddedImgs(added);
            setKeptImgs(kept);
            setRemovedImgs(removed);
        };

        const handleSubmit = async () => {
            let newThumbnailId = thumbnailId; // giữ ảnh cũ mặc định

            if (thumbnailFile != null) {
                const response = await uploadThumbnail({ thumbnail: thumbnailFile });
                if (response?.id) {
                    newThumbnailId = response.id;
                    console.log('new thumb id: ' + newThumbnailId);
                }
            }

            const updateBase = await updateBaseProduct({
                id,
                name,
                label,
                description,
                categoryCode,
                subCategoryCode,
                brandCode,
                status,
                thumbnailId: newThumbnailId, // dùng ảnh mới nếu có
            });
        };

        const handleupdateDetail = async (id, initPrice, price, title, qty) => {
            const updateDetail = await updateClassification({
                id,
                initPrice,
                price,
                title,
                qty,
            });
            if (updateDetail.success) {
                toast.success('Cap nhat thanh cong');
                const classification = updateDetail.classification;
                console.log(" new classification: " + JSON.stringify(classification,null,2))
                const updatedClassifications = classifications.map((c) =>
                    c.id === classification.id
                        ? {
                              ...c,
                              ...classification, 
                          }
                        : c,
                );
                console.log("update classification: " + JSON.stringify(updatedClassifications,null,2))
                setClassifications(updatedClassifications);

            } else toast.error('Cap nhat that bai');
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
                            className="mb-10 grid-col-9"
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
                                <StarRating rate={avgRating} />
                                <p>
                                    (<span>{totalReview}</span>)
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="d-flex-al-center" style={{ marginTop: '10px' }}>
                        <div className="grid-col-6">
                            <p className={cx('heading')}>Phân loại</p>
                            <select
                                style={{ marginLeft: '10px' }}
                                value={categoryCode}
                                onChange={handleCategoryChange}
                                disabled={isDisabled}
                            >
                                {categories &&
                                    categories.map((item) => (
                                        <option value={item.link} key={item.link}>
                                            {item.title}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="grid-col-6">
                            <p className={cx('heading')}>Phân loại phụ</p>
                            <select
                                style={{ marginLeft: '10px' }}
                                value={subCategoryCode}
                                onChange={handleCategoryChange}
                                disabled={isDisabled}
                            >
                                {subCategories &&
                                    subCategories.map((item) => (
                                        <option value={item.link} key={item.link}>
                                            {item.title}
                                        </option>
                                    ))}
                            </select>
                        </div>
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
                            classifications.map((item) => (
                                <Classification item={item} key={item.id} onUpdate={handleupdateDetail} />
                            ))
                        ) : (
                            <p className="note">Không có phân loại</p>
                        )}
                    </div>
                    <div className="d-flex-space-between">
                        <CustomInput
                            value={totalRemainQty}
                            onChange={(e) => setTotalRemainQty(e.target.value)}
                            label={t('tong con lai')}
                            className="mb-10 grid-col-5"
                            disabled={true}
                        />
                        <CustomInput
                            value={totalSoldQty}
                            onChange={(e) => setTotalSoldQty(e.target.value)}
                            label={t('da ban')}
                            className="mb-10 grid-col-5"
                            disabled={true}
                        />
                    </div>
                    <div className="d-flex-space-between">
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
                        <ImageUpload img={thumbnailUrl} isDisabled={isDisabled} onImageChange={handleThumb} />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <p className={cx('heading')}>Anh mo ta</p>
                        <MultiImageUpload initialImages={images} onImagesChange={handleImagesChange} />
                    </div>
                    <div style={{ margin: '20px 0' }}>
                        <p className={cx('heading')}>Mo ta</p>
                        {isDisabled ? (
                            <Editor placeholder={'Write something...'} value={description} />
                        ) : (
                            <Editor placeholder={'Write something...'} value={description} onChange={setDescription} />
                        )}
                    </div>
                    {!isDisabled && (
                        <div className="d-flex-space-around" style={{ marginTop: '20px' }}>
                            <button className="btn cancel-btn">{t('cancel')}</button>
                            <button className="btn confirm-btn" onClick={handleSubmit}>
                                {t('confirm')}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        );
    }

    function Classification({ item, onUpdate, onRemove }) {
        const [id, setId] = useState(item.id || 0);
        const [title, setTitle] = useState(item.title || '');
        const [price, setPrice] = useState(item.price || 0);
        const [initPrice, setInitPrice] = useState(item.initPrice || 0);
        const [isDeleted, setIsDeleted] = useState(item.isDeleted || 0);
        const [qty, setQty] = useState(item.qty || 0);
        const [soldQty, setSoldQty] = useState(item.soldQty || 0);
        const [discount, setDiscount] = useState(item.discount || 0);

        // Gọi hàm onChange mỗi khi có thay đổi
        const handleUpdate = () => {
            onUpdate?.(id, initPrice, price, title, qty);
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
                                }}
                            />
                        )}
                    </p>
                    <p>
                        Đã bán: <span>{soldQty}</span>
                    </p>
                </div>

                {isDisabled || (
                    <>
                        <button style={{ color: 'blue' }} type="button" onClick={handleUpdate}>
                            <FontAwesomeIcon icon={faFloppyDisk}  />
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
                        <th>Thuong hieu</th>
                        <th>Phan loai</th>
                        <th>Da ban</th>
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
                    handleEditAction(item);
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
                <td className="center">
                    <Link to={item.brandCode}>{item.brandName}</Link>
                </td>
                <td className="center">
                    <Link to={item.categoryCode}>{item.categoryTitle}</Link>
                </td>
                <td className="center">{item.soldQty}</td>
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
                                handleClickItem(item);
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
