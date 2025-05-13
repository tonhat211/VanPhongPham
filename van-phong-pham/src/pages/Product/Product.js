import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faCircleXmark,
    faXmark,
    faAngleRight,
    faArrowTrendUp,
} from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import styles from './Product.module.scss';
import images from '~/assets/images';
import SubSidebar from '~/components/Layouts/components/SubSidebar';
import { menus, brands, priceRanges, colors } from '~/data';
import { ProductItem, Pagination } from '../components';
import { Product as ProductModel, StarRating } from '~/models';
import { getProductsByCategory } from '~/api/productApi';

const cx = classNames.bind(styles);

function Product() {
    console.log('product screen');
    const { category } = useParams(); // lấy từ URL path
    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    const sortBy = searchParams.get('sortBy') || 'price';
    const direction = searchParams.get('direction') || 'asc';
    const size = parseInt(searchParams.get('size') || '10');
    const sub = searchParams.get('sub');
    const [products, setProducts] = useState(null);

    useEffect(() => {
        searchParams.set('page', page);
        searchParams.set('sortBy', sortBy);
        searchParams.set('direction', direction);
        searchParams.set('size', size);
        setSearchParams(searchParams);

        setLoading(true);
        getProductsByCategory({
            category,
            sub,
            sortBy,
            direction,
            page,
            size,
        })
            .then((data) => {
                // console.log('products creen: ' + JSON.stringify(data, null, 2));
                setProducts(data.content); // nếu backend trả về Page<>
                const pageInfo = data.pageInfo;
                setPage(pageInfo.page);
                setTotalPages(pageInfo.totalPages);
            })
            .catch((err) => {
                // console.error(err);
                alert('Không thể tải sản phẩm');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [category, sortBy, direction, page, size, sub]);

    let parent = menus.find((m) => m.link === '/' + category);
    if (!parent) parent = null;


    const barRef = useRef(null);

    const handlePageChange = (newPage) => {
        newPage = newPage-1;
        console.log("handlePageChange newpage: " + newPage)
        setPage(newPage);
        searchParams.set('page', newPage);
        setSearchParams(searchParams); // Cập nhật URL
    };

      const updateSort = (newSortBy, newDirection) => {
        searchParams.set('sortBy', newSortBy);
        searchParams.set('direction', newDirection);
        searchParams.set('page', 1); 
        setSearchParams(searchParams);
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

    console.log("totalpage: " + totalPages);
    console.log("page:" + page);

    return (
        <div className={classNames(cx('wrapper'))}>
            <div className={classNames(cx('content-container', 'product-show-container'), 'd-flex')}>
                <div ref={barRef} className={classNames(cx('subsidebar-container'), 'grid-col-2')} style={{}}>
                    <SubSidebar />
                </div>
                <div className={classNames(cx('content'))} style={{ flex: 1 }}>
                    <p className={classNames(cx('title'), 'uppercase-text')}>{parent?.title || 'Tất cả'}</p>
                    <div className="d-flex" style={{ marginTop: '20px' }}>
                        <p>Sắp xếp:</p>
                        <ul className={classNames(cx('sort-option-list'))}>
                            <li>
                                <Link
                                    className={classNames(cx({ active: sortBy === 'price' && direction === 'asc' }))}
                                    onClick={() => updateSort('price', 'asc')}
                                >
                                    Giá tăng dần
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={classNames(cx({ active: sortBy === 'price' && direction === 'desc' }))}
                                    onClick={() => updateSort('price', 'desc')}
                                >
                                    Giá giảm dần
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={classNames(
                                        cx({ active: sortBy === 'createdDate' && direction === 'desc' }),
                                    )}
                                    onClick={() => updateSort('createdDate', 'desc')}
                                >
                                    Hàng mới
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={classNames(cx('divider'))} style={{ marginTop: '14px' }}></div>
                    {products && <ProductList items={products} />}
                    <div className={classNames(cx('pagination-container'))}>
                        <Pagination totalPages={totalPages} currentPage={page+1} onPageChange={handlePageChange} />
                    </div>
                </div>
            </div>
            {products && (
                <div className={classNames(cx('content-container', 'recent-viewed-product'))}>
                    <p className={classNames(cx('title'))}>Sản phẩm đã xem</p>
                    <ProductList items={products.slice(0, 4)} />
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
