import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useParams, useSearchParams } from 'react-router-dom';

import styles from './Product.module.scss';
import SubSidebar from '~/components/Layouts/components/SubSidebar';
import { ProductItem, Pagination } from '../components';
import { getProductsByCategory } from '~/api/productApi';
import { useUpdateUrlParams } from '~/utils/url';
import { useFEContext } from '~/context/FEProvider';
import { useData } from '~/context/DataContext';
import useI18n from '~/hooks/useI18n';

const cx = classNames.bind(styles);

function Product() {
    const { t, lower } = useI18n();
    const { menus } = useData();
    const { category } = useParams(); // lấy từ URL path
    const [searchParams, setSearchParams] = useSearchParams();
    const updateUrlParams = useUpdateUrlParams();

    const page = parseInt(searchParams.get('page')) || 0;
    const [totalPages, setTotalPages] = useState(1);

    const sortBy = searchParams.get('sortBy') || 'price';
    const direction = searchParams.get('direction') || 'asc';
    const size = parseInt(searchParams.get('size') || '20');
    const sub = searchParams.get('sub');
    const brands = searchParams.get('brands');
    const priceRange = searchParams.get('priceRange');
    const [products, setProducts] = useState(null);
    let recentlyViewedProducts = localStorage.getItem('recentlyViewedProducts');
    if (recentlyViewedProducts) {
        recentlyViewedProducts = JSON.parse(recentlyViewedProducts);
    }

    useEffect(() => {
        getProductsByCategory({
            category,
            sub,
            brands,
            priceRange,
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
    }, [category, sortBy, direction, page, size, sub, brands, priceRange]);

    useEffect(() => {
        // if(page!==0)
        // scrollHeader();
    }, [page]);

    let parent = menus.find((m) => m.link === category);
    if (!parent) parent = null;

    const barRef = useRef(null);

    const handlePageChange = (newPage) => {
        const actualPage = newPage - 1;
        updateUrlParams({
            page: actualPage,
        });
    };

    const updateSort = (newSortBy, newDirection) => {
        // updateUrlParams(searchParams, setSearchParams, {
        //     sortBy: newSortBy,
        //     direction: newDirection,
        //     page: 0,
        // });
        updateUrlParams({ sortBy: newSortBy, direction: newDirection, page: 0 });
    };

    useEffect(() => {
        const handleWindowScroll = () => {
            const currentScroll = window.scrollY;

            if (currentScroll >= 1500 && barRef.current) {
                const barScroll = currentScroll - 1500;

                barRef.current.scrollTo({
                    top: barScroll,
                    behavior: 'smooth',
                });
            }
        };

        window.addEventListener('scroll', handleWindowScroll);
        return () => {
            window.removeEventListener('scroll', handleWindowScroll);
        };
    }, []);

    const { isSubSidebarOpen, toggleSubSidebar } = useFEContext();
    const contentRef = useRef(null);

    const scrollHeader = () => {
        contentRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    return (
        <div className={classNames(cx('wrapper'))}>
            <div className={classNames(cx('content-container', 'product-show-container'), 'd-flex')}>
                <div
                    ref={barRef}
                    className={classNames(cx('subsidebar-container'), 'grid-col-2 w-30-tab w-50-mob', {
                        'hide-tab': !isSubSidebarOpen,
                        'hide-mob': !isSubSidebarOpen,
                    })}
                    style={{}}
                >
                    <SubSidebar />
                </div>

                {isSubSidebarOpen && (
                    <div
                        className={classNames(cx('overlay'), 'hide', { show: isSubSidebarOpen })}
                        onClick={toggleSubSidebar}
                    ></div>
                )}

                <div ref={contentRef} className={classNames(cx('content'))} style={{ flex: 1 }}>
                    <p className={classNames(cx('title'), 'uppercase-text p-header-size-mob')}>
                        {parent?.title || t('all')}
                    </p>
                    {Array.isArray(products) && products.length > 0 ? (
                        <>
                            <div className="d-flex" style={{ marginTop: '20px' }}>
                                <p className="p-content-size-mob">{t('sort')}:</p>
                                <ul className={classNames(cx('sort-option-list'))}>
                                    <li>
                                        <a
                                            className={classNames(
                                                cx({ active: sortBy === 'price' && direction === 'asc' }),
                                                'p-content-size-mob',
                                            )}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                updateSort('price', 'asc');
                                            }}
                                        >
                                            {t('upper-price')}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className={classNames(
                                                cx({ active: sortBy === 'price' && direction === 'desc' }),
                                                'p-content-size-mob',
                                            )}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                updateSort('price', 'desc');
                                            }}
                                        >
                                            {t('downer-price')}
                                        </a>
                                    </li>
                                </ul>
                                <i
                                    className={classNames(cx('filter-icon'), 'hide show-tab show-mob')}
                                    onClick={toggleSubSidebar}
                                >
                                    <FontAwesomeIcon icon={faFilter} />
                                </i>
                            </div>
                            <div className={classNames(cx(''), 'divider mt-14 mt-0-tab mt-0-mob')}></div>
                            <ProductList items={products} />
                            <div className={classNames(cx('pagination-container'))}>
                                <Pagination
                                    totalPages={totalPages}
                                    currentPage={page + 1}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <p>{t('there-are-no')} {lower('matching-results')}</p>
                        </>
                    )}
                </div>
            </div>
            {recentlyViewedProducts && (
                <div className={classNames(cx('content-container', 'recent-viewed-product'))}>
                    <p className={classNames(cx('title'))}>{t('recent-viewed-products')}</p>
                    <ProductList items={recentlyViewedProducts.slice(0, 4)} />
                </div>
            )}
        </div>
    );

    function ProductList({ items }) {
        return (
            <div className={cx('product-list-container')}>
                <div className="grid-row">
                    {items.map((item, index) => (
                        <ProductItem key={index} item={item} />
                    ))}
                </div>
            </div>
        );
    }
}

export default Product;
