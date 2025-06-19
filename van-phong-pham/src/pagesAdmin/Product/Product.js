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
} from '@fortawesome/free-solid-svg-icons';

import styles from './Product.module.scss';
import images from '~/assets/images';
import { CustomInput, Modal, EditorWithUseQuill as Editor, StarRating } from '~/pages/components';
import { ImageUpload, ImageUploadRemovable, MultiImageUpload } from '~/pages/components/InputFile';

import { formatMoney } from '~/utils';
import useI18n from '~/hooks/useI18n';
import { productApi } from '~/api';
import { useData } from '~/context/DataContext';
import { getProductsByCategory } from '~/api/productApi';
import {
    deleteImg,
    getAdminProductDetails,
    getAdminProductsByCategory,
    updateBaseProduct,
    insertImgs,
    deleteThumb,
    insertThumb,
    deleteDetail,
    updateDetail,
    updateStatus,
} from '~/api/adminProductApi';
import { useUpdateUrlParams } from '~/utils/url';
import { toast } from 'react-toastify';

// import {Editor as Editor1} from '~/pages/components/EditorWithUseQuill/Editor'

const cx = classNames.bind(styles);

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

const MODAL_TYPES = {
    DETAIL: 'DETAIL',
    ADD: 'ADD',
    EDIT: 'EDIT',
    DELETE: 'DELETE',
    LOCK: 'LOCK',
    UNLOCK: 'UNLOCK',
    FEEDBACK: 'FEEDBACK',
    CONFIRM_DELETE_IMG: 'CONFIRM_DELETE_IMG',
};

function Product() {
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
    const [products, setProducts] = useState([]);
    const [productDetails, setProductDetails] = useState(null);
 const navigate = useNavigate();
    const viewTypes = [
        { link: '', title: 'Tất cả' },
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

    const handleViewTypeChange = (e) => {
        setViewType(e.target.value);
        navigate(`/admin/products/${e.target.value}`);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
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
    };

    const [tempModalType, setTempModalType] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, [category, sortBy, direction, page, size]);

    useEffect(() => {
        if (productDetails && tempModalType) {
            openModal(tempModalType, productDetails);
            // setTempModalType(null);
        }
    }, [productDetails, tempModalType]);

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

    const handleSubmitDeleteThumb = async (id) => {
        return deleteThumb({ id })
            .then((data) => {
                const success = data.success;
                if (success) {
                    setProducts((prev) =>
                        prev.map((product) =>
                            product.id === id ? { ...product, thumbnail: data.thumbnail.url } : product,
                        ),
                    );
                    toast.success('Da thiet lap ve anh mac dinh');
                    return data.thumbnail;
                }
                return null;
            })
            .catch((err) => {
                console.error('Lỗi tải sản phẩm:', err);
                return null;
            });
    };

    const handleInsertThumb = async (img) => {
        return insertThumb({ id: selectedItem.id, file: img })
            .then((data) => {
                const success = data.success;
                if (success) {
                    setProducts((prev) =>
                        prev.map((product) =>
                            product.id === selectedItem.id ? { ...product, thumbnail: data.thumbnail.url } : product,
                        ),
                    );
                    toast.success('Them anh thanh cong');
                    return data.thumbnail;
                }
                return null;
            })
            .catch((err) => {
                console.error('Lỗi tải sản phẩm:', err);
                return null;
            });
    };

    const handleUpdateBase = async (id, name, label, description, categoryCode, subCategoryCode, brandCode) => {
        return updateBaseProduct({
            id,
            name,
            label,
            description,
            categoryCode,
            subCategoryCode,
            brandCode,
        })
            .then((data) => {
                const success = data.success;
                if (success) {
                    toast.success('Cap nhat thanh cong');
                    return data.base;
                }
                return null;
            })
            .catch((err) => {
                console.error('Lỗi tải sản phẩm:', err);
                return null;
            });
    };

    const handleUpdateStatus = async (item, status) => {
        updateStatus({ id: item.id, status })
            .then((data) => {
                const success = data.success;
                const id = data.id;
                const status = data.status;
                if (success) {
                    toast.success('Cap nhat thanh cong');
                    if ('DELETE' === status) {
                        const filteredProducts = products.filter((item) => item.id !== id);
                        setProducts(filteredProducts);
                    } else {
                        setProducts((prev) => prev.map((item) => (item.id === id ? { ...item, id, status } : item)));
                    }

                    closeModal();
                }
            })
            .catch((err) => {
                console.error('Lỗi tải sản phẩm:', err);
            });
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
                {modalType === MODAL_TYPES.DETAIL && (
                    <EditorProduct
                        item={selectedItem}
                        mode="VIEW"
                        categories={categories}
                        subCategories={subCategories}
                        brands={brands}
                    />
                )}
                {modalType === MODAL_TYPES.ADD && (
                    <EditorProduct mode="ADD" categories={categories} subCategories={subCategories} brands={brands} />
                )}
                {modalType === MODAL_TYPES.EDIT && (
                    <EditorProduct
                        item={selectedItem}
                        onSubmitDeleteThumb={handleSubmitDeleteThumb}
                        onInsertThumb={handleInsertThumb}
                        categories={categories}
                        subCategories={subCategories}
                        brands={brands}
                        onSubmit={handleUpdateBase}
                        mode="EDIT"
                    />
                )}
                {modalType === MODAL_TYPES.DELETE && (
                    <Confirm item={selectedItem} onConfirm={handleUpdateStatus} status="DELETE" />
                )}
                {modalType === MODAL_TYPES.LOCK && (
                    <Confirm item={selectedItem} onConfirm={handleUpdateStatus} status="LOCKED" />
                )}
                {modalType === MODAL_TYPES.UNLOCK && (
                    <Confirm item={selectedItem} onConfirm={handleUpdateStatus} status="ACTIVE" />
                )}
                {/* {modalType === MODAL_TYPES.FEEDBACK && <Feedback item={selectedItem} />} */}
            </Modal>
        </div>
    );

    function Confirm({ item, onConfirm, status }) {
        const submitUpdateStatus = () => {
            onConfirm?.(item, status);
        };

        return (
            <div style={{ padding: '10px' }}>
                <p style={{ textAlign: 'center' }}>
                    {t('confirm')}{' '}
                    {'DELETE' === status ? lower('delete') : 'LOCKED' === status ? lower('lock') : lower('unlock')}{' '}
                    {lower('product')} ID: {item.id}
                </p>
                {'DELETE' === status && (
                    <p className="note" style={{ textAlign: 'center' }}>
                        {t('note')}: {t('cannot-reverse')}
                    </p>
                )}

                <div className="d-flex-space-around" style={{ marginTop: '20px' }}>
                    <button className="btn cancel-btn" onClick={closeModal}>
                        {t('cancel')}
                    </button>
                    <button className="btn confirm-btn" onClick={submitUpdateStatus}>
                        {t('confirm')}
                    </button>
                </div>
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
        const isLocked = item.status === 'LOCKED';
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

        console.log('item status: ' + JSON.stringify(item, null, 2));

        return (
            <tr key={item.id} className={cx({ blocked: isLocked })}>
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

function EditorProduct({
    item,
    mode,
    categories,
    subCategories,
    brands,
    onSubmitDeleteThumb,
    onInsertThumb,
    onSubmit,
    // onDeleteDetail,
}) {
    console.log('Edit procduct');
    const { t, lower } = useI18n();
    const [name, setName] = useState(item?.name || '');
    const [id, setId] = useState(item?.id || null);
    const [label, setLabel] = useState(item?.label || null);
    const [totalQty, setTotalQty] = useState();
    const [avgRating, setAvgRating] = useState(item?.avgRating || 0);
    const [totalReview, setTotalReview] = useState(item?.totalReview || 0);
    const [totalRemainQty, setTotalRemainQty] = useState(item?.totalRemainQty || 0);
    const [totalSoldQty, setTotalSoldQty] = useState(item?.totalSoldQty || 0);
    const [thumbnailId, setThumbnailId] = useState(item?.thumbnailId || 0);
    const [description, setDescription] = useState(item?.description || '');
    const [categoryCode, setCategoryCode] = useState(item?.categoryCode || '');
    const [subCategoryCode, setSubCategoryCode] = useState(item?.subCategoryCode || '');
    const [brandCode, setBrandCode] = useState(item?.brandCode || '');
    const [status, setStatus] = useState(item?.status || '');
    const [classifications, setClassifications] = useState(item?.classifications || []);
    const [images, setImages] = useState(item?.images || []);

    // const initialName = useRef(name);
    // const initialLabel = useRef(label);
    // const initialDescription = useRef(description);
    // const initialCategory = useRef(categoryCode);
    // const initialSubCategory = useRef(subCategoryCode);
    // const initialBrand = useRef(brandCode);

    const [isSubmit, setIsSubmit] = useState(true);

    // useEffect(() => {
    //     if(initialName.current!==name
    //         || initialLabel.current!==label
    //         || initialDescription.current!==description
    //         || initialCategory.current!==categoryCode
    //         || initialSubCategory.current!==subCategoryCode
    //         || initialBrand.current!==brandCode

    //     ) setIsSubmit(true);
    //     else {
    //         setIsSubmit(false)
    //     }

    // }, [name, label, description, categoryCode, subCategoryCode, brandCode]);

    useEffect(() => {
        const total = classifications.reduce((sum, c) => sum + (Number(c.qty) || 0), 0);
        setTotalQty(total);
        console.log('classififcations changed: ' + JSON.stringify(classifications, null, 2));
    }, [classifications]);

    const handleCategoryChange = (e) => {
        setCategoryCode(e.target.value);
    };

    const handleSubCategoryChange = (e) => {
        setSubCategoryCode(e.target.value);
    };

    const handleBrandChange = (e) => {
        setBrandCode(e.target.value);
    };

    const handleAddClassification = () => {
        const newClassification = {
            id: classifications.length + 1, // id tang tu dong de khong trung key, nhung khi add vao db thi de db tu tang
            title: '',
            productId: id,
        };

        setClassifications([...classifications, newClassification]);
    };

    const [thumbnailFile, setThumbnailFile] = useState({ id: item?.thumbnailId, url: item?.thumbnailUrl });

    const handleInsertImgs = async (imgs) => {
        insertImgs({ id, files: imgs })
            .then((data) => {
                const success = data.success;
                if (success) {
                    toast.success('Them anh thanh cong');
                    const newImages = data.images;
                    if (newImages) {
                        setImages((prev) => [...prev, ...newImages]);
                    }
                }
            })
            .catch((err) => {
                console.error('Lỗi tải sản phẩm:', err);
            });
    };

    const handleDeleteThumb = async (img) => {
        const thumbnail = await onSubmitDeleteThumb?.(id);
        if (thumbnail) {
            setThumbnailFile({ id: thumbnail.id, url: thumbnail.url });
            return true;
        }
        return false;
    };

    const handleInsertThumb = async (file) => {
        console.log('handleInsertThumb');
        // console.log('file: ' + JSON.stringify(file, null, 2));
        const newThumb = await onInsertThumb?.(file);
        if (newThumb) {
            setThumbnailFile({ id: newThumb.id, url: newThumb.url });
            return true;
        } else return false;
    };

    const handleSubmit = async () => {
        const result = await onSubmit(id, name, label, description, categoryCode, subCategoryCode, brandCode);
        if (result) {
            setName(result.product);
            setLabel(result.label);
            setDescription(result.discription);
            setCategoryCode(result.categoryCode);
            setSubCategoryCode(result.subCategoryCode);
            setBrandCode(result.brandCode);
        }
    };

    const handleDeleteDetail = async (detailId) => {
        deleteDetail({
            detailId,
        })
            .then((data) => {
                const success = data.success;
                if (success) {
                    const newDetailId = data.detailId;
                    const filteredDetails = classifications.filter((detail) => detail.id !== newDetailId);
                    setClassifications(filteredDetails);
                    toast.success('Cap nhat thanh cong');
                }
            })
            .catch((err) => {
                console.error('Lỗi tải sản phẩm:', err);
            });
    };

    const handleUpdateDetail = async (productId, detailId, title, initPrice, price, qty) => {
        updateDetail({
            productId,
            detailId,
            title,
            initPrice,
            price,
            qty,
        })
            .then((data) => {
                const success = data.success;
                if (success) {
                    const { id, title, initPrice, price, qty } = data.detail;
                    setClassifications((prev) =>
                        prev.map((cls) => (cls.id === id ? { ...cls, title, initPrice, price, qty } : cls)),
                    );
                    toast.success('Cap nhat thanh cong');
                }
            })
            .catch((err) => {
                console.error('Lỗi tải sản phẩm:', err);
            });
    };

    const handleDeleteImg = async (img) => {
        deleteImg({ id, imgId: img.id })
            .then((data) => {
                const success = data.success;
                if (success) {
                    toast.success('xoa anh thanh cong');
                    const removedId = data.imgId;
                    if (removedId) {
                        setImages((prev) => prev.filter((img) => img.id !== removedId));
                    }
                }
            })
            .catch((err) => {
                console.error('Lỗi tải sản phẩm:', err);
            });
    };
    const isDisabled = mode === 'VIEW';

    return (
        <div className={cx('product-detail')} style={{ padding: '10px' }}>
            <p className={cx('title')}>
                {mode === 'VIEW' ? 'Chi tiết sản phẩm' : mode === 'EDIT' ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}
            </p>

            <div style={{ marginTop: '20px' }}>
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
                            onChange={handleSubCategoryChange}
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
                <div className="d-flex-al-center" style={{ marginTop: '10px' }}>
                    <div className="grid-col-6">
                        <p className={cx('heading')}>Thuong hieu</p>
                        <select
                            style={{ marginLeft: '10px' }}
                            value={brandCode}
                            onChange={handleBrandChange}
                            disabled={isDisabled}
                        >
                            {brands &&
                                brands.map((item) => (
                                    <option value={item.code} key={item.code}>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="grid-col-6"></div>
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
                            <Classification
                                item={item}
                                key={item.id}
                                onUpdate={handleUpdateDetail}
                                onDelete={handleDeleteDetail}
                                productId={item.productId}
                                mode={mode}
                            />
                        ))
                    ) : (
                        <p className="note">Không có phân loại</p>
                    )}
                </div>
                {/* qty */}
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
                {/* label */}
                <div className="d-flex-space-between">
                    <CustomInput
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        label={t('Nhan')}
                        className="mb-10 grid-col-5"
                        disabled={isDisabled}
                    />
                </div>
                {!isDisabled && (
                    <div className="d-flex-space-around" style={{ marginTop: '20px' }}>
                        <button className="btn cancel-btn">{t('cancel')}</button>
                        <button className="btn confirm-btn" disabled={!isSubmit} onClick={handleSubmit}>
                            {t('confirm')}
                        </button>
                    </div>
                )}
                {/* anh dai dien */}
                <div>
                    <p className={cx('heading')}>Anh dai dien</p>
                    <div className="d-flex-space-between">
                        <ImageUploadRemovable
                            img={thumbnailFile}
                            isDisabled={isDisabled}
                            onDelete={handleDeleteThumb}
                        />
                        <ImageUploadRemovable isDisabled={isDisabled} onInsert={handleInsertThumb} />
                    </div>
                </div>
                {/* anh mo ta */}
                <div style={{ marginTop: '20px' }}>
                    <p className={cx('heading')}>Anh mo ta</p>
                    <div className={cx('imgs-container')}>
                        {images ? (
                            images.map((item) => (
                                <ImageUploadRemovable
                                    key={item.id}
                                    img={item}
                                    isDisabled={isDisabled}
                                    onDelete={handleDeleteImg}
                                />
                            ))
                        ) : (
                            <p className="note">Không có hình </p>
                        )}
                        <ImageUploadRemovable
                            isDisabled={isDisabled}
                            onInsert={handleInsertImgs}
                            onDelete={handleDeleteImg}
                            isMultiple={true}
                        />
                    </div>
                </div>
                {/* mo ta */}
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
            </div>
        </div>
    );
}

function Classification({ item, onUpdate, onDelete, productId, mode }) {
    const { t, lower } = useI18n();
    const [id, setId] = useState(item.id || 0);
    const [title, setTitle] = useState(item.title || '');
    const [price, setPrice] = useState(item.price || 0);
    const [initPrice, setInitPrice] = useState(item.initPrice || 0);
    const [isDeleted, setIsDeleted] = useState(item.isDeleted || 0);
    const [qty, setQty] = useState(item.qty || 0);
    const [soldQty, setSoldQty] = useState(item.soldQty || 0);
    const [discount, setDiscount] = useState(item.discount || 0);
    // const tempProductId = productId;
    // const procductId
    // Gọi hàm onChange mỗi khi có thay đổi
    const handleUpdate = () => {
        console.log('handleUpdate:  productId:' + productId);
        onUpdate?.(productId, id, title, initPrice, price, qty);
    };
    const isDisabled = mode === 'VIEW';
    // const isDisabled = false;
    const [showConfirm, setShowConfirm] = useState(false);

    const handleIsDelete = () => {
        setShowConfirm(true);
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
    };

    const handleDelete = () => {
        onDelete?.(id);
    };
    return (
        <div className={classNames(cx('classification'), 'd-flex-space-between')} style={{ alignItems: 'start' }}>
            <p>
                Phân loại: {productId}
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
                <div>
                    <button style={{ color: 'blue' }} type="button" onClick={handleUpdate}>
                        <FontAwesomeIcon icon={faFloppyDisk} />
                    </button>
                    <button onClick={handleIsDelete}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            )}
            <div className={cx('confirm-delete', { active: showConfirm })}>
                <div
                    className="d-flex-space-around"
                    style={{ alignItems: 'center', marginTop: 'auto', marginBottom: 'auto' }}
                ></div>
                <p className={cx('heading')}>Xác nhân xóa</p>
                <button className="btn cancel-btn" onClick={handleCancelDelete}>
                    {t('cancel')}
                </button>
                <button className="btn confirm-btn" onClick={handleDelete}>
                    {t('confirm')}
                </button>
            </div>
        </div>
    );
}
