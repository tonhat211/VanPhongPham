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
import { Link, useParams } from 'react-router-dom';

import styles from './Product.module.scss';
import images from '~/assets/images';
import SubSidebar from '~/components/Layouts/components/SubSidebar';
import { menus, brands, priceRanges, colors } from '~/data';
import { ProductItem, Pagination } from '../components';
import { Product as ProductModel, StarRating } from '~/models';

const cx = classNames.bind(styles);

function Product() {
    const { category } = useParams();
    const [page, setPage] = useState(3);
    //code chinh thuc
    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const category = queryParams.get('category');

    // test
    // const category = '/but-viet';
    // useEffect(() => {
    //     axios.get(`http://localhost:8080/api/products/category/${category}`)
    //       .then(response => {
    //         setProducts(response.data);
    //       })
    //       .catch(error => {
    //         console.error('Error fetching products:', error);
    //       });
    //   }, [category]);

    console.log('category: ' +category);

    let parent = menus.find((m) => m.link === "/"+category);
    if (!parent) parent = null;

    console.log('parent: ' +parent);

    // du lieu demo
    const products = [
        new ProductModel(
            1,
            'Bút gel Quick Dry Thiên Long GEL-066 - Premium Tip - Vật liệu tái chế',
            15300,
            17000,
            10,
            images.product1,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            2,
            'Combo 20 Bút Gel Thiên Long Doraemon GEL-012/DO Nature - Mực tím - Phiên bản 2025',
            190300,
            220000,
            10,
            images.product2,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            3,
            'Bút mực gel khô nhanh - nét viết êm mượt Flexgel Thiên Long GEL-042 - Dành cho Văn Phòng Sinh Viên Học sinh',
            45300,
            67000,
            30,
            images.product3,
            864,
            4.6,
            600,
        ),

        new ProductModel(
            4,
            'Bút gel Quick Dry Thiên Long GEL-066 - Premium Tip - Vật liệu tái chế',
            15300,
            17000,
            10,
            images.product1,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            5,
            'Combo 20 Bút Gel Thiên Long Doraemon GEL-012/DO Nature - Mực tím - Phiên bản 2025',
            190300,
            220000,
            10,
            images.product2,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            6,
            'Bút mực gel khô nhanh - nét viết êm mượt Flexgel Thiên Long GEL-042 - Dành cho Văn Phòng Sinh Viên Học sinh',
            45300,
            67000,
            30,
            images.product3,
            864,
            4.6,
            600,
        ),
        new ProductModel(
            1,
            'Bút gel Quick Dry Thiên Long GEL-066 - Premium Tip - Vật liệu tái chế',
            15300,
            17000,
            10,
            images.product1,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            2,
            'Combo 20 Bút Gel Thiên Long Doraemon GEL-012/DO Nature - Mực tím - Phiên bản 2025',
            190300,
            220000,
            10,
            images.product2,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            3,
            'Bút mực gel khô nhanh - nét viết êm mượt Flexgel Thiên Long GEL-042 - Dành cho Văn Phòng Sinh Viên Học sinh',
            45300,
            67000,
            30,
            images.product3,
            864,
            4.6,
            600,
        ),

        new ProductModel(
            4,
            'Bút gel Quick Dry Thiên Long GEL-066 - Premium Tip - Vật liệu tái chế',
            15300,
            17000,
            10,
            images.product1,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            5,
            'Combo 20 Bút Gel Thiên Long Doraemon GEL-012/DO Nature - Mực tím - Phiên bản 2025',
            190300,
            220000,
            10,
            images.product2,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            6,
            'Bút mực gel khô nhanh - nét viết êm mượt Flexgel Thiên Long GEL-042 - Dành cho Văn Phòng Sinh Viên Học sinh',
            45300,
            67000,
            30,
            images.product3,
            864,
            4.6,
            600,
        ),
        new ProductModel(
            1,
            'Bút gel Quick Dry Thiên Long GEL-066 - Premium Tip - Vật liệu tái chế',
            15300,
            17000,
            10,
            images.product1,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            2,
            'Combo 20 Bút Gel Thiên Long Doraemon GEL-012/DO Nature - Mực tím - Phiên bản 2025',
            190300,
            220000,
            10,
            images.product2,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            3,
            'Bút mực gel khô nhanh - nét viết êm mượt Flexgel Thiên Long GEL-042 - Dành cho Văn Phòng Sinh Viên Học sinh',
            45300,
            67000,
            30,
            images.product3,
            864,
            4.6,
            600,
        ),

        new ProductModel(
            4,
            'Bút gel Quick Dry Thiên Long GEL-066 - Premium Tip - Vật liệu tái chế',
            15300,
            17000,
            10,
            images.product1,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            5,
            'Combo 20 Bút Gel Thiên Long Doraemon GEL-012/DO Nature - Mực tím - Phiên bản 2025',
            190300,
            220000,
            10,
            images.product2,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            6,
            'Bút mực gel khô nhanh - nét viết êm mượt Flexgel Thiên Long GEL-042 - Dành cho Văn Phòng Sinh Viên Học sinh',
            45300,
            67000,
            30,
            images.product3,
            864,
            4.6,
            600,
        ),
        new ProductModel(
            6,
            'Bút mực gel khô nhanh - nét viết êm mượt Flexgel Thiên Long GEL-042 - Dành cho Văn Phòng Sinh Viên Học sinh',
            45300,
            67000,
            30,
            images.product3,
            864,
            4.6,
            600,
        ),
        new ProductModel(
            6,
            'Bút mực gel khô nhanh - nét viết êm mượt Flexgel Thiên Long GEL-042 - Dành cho Văn Phòng Sinh Viên Học sinh',
            45300,
            67000,
            30,
            images.product3,
            864,
            4.6,
            600,
        ),
    ];

    const barRef = useRef(null);


    useEffect(() => {
        const handleWindowScroll = () => {
            const currentScroll = window.scrollY;

            if (currentScroll >= 1500 && barRef.current) {
                const barScroll = currentScroll - 1500;
        
                barRef.current.scrollTo({
                    top: barScroll,
                    behavior: 'smooth'
                });
            }
        };

        window.addEventListener('scroll', handleWindowScroll);
        return () => {
            window.removeEventListener('scroll', handleWindowScroll);
        };
    }, []);

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
                                <Link className={classNames(cx('active'))}>Giá tăng dần</Link>
                            </li>
                            <li>
                                <Link>Giá giảm dần</Link>
                            </li>
                            <li>
                                <Link>Hàng mới</Link>
                            </li>
                        </ul>
                    </div>
                    <div className={classNames(cx('divider'))} style={{ marginTop: '14px' }}></div>
                    <ProductList items={products} />
                    <div className={classNames(cx('pagination-container'))}>
                        <Pagination totalPages={10} currentPage={page} onPageChange={setPage} />
                    </div>
                </div>
            </div>
            <div className={classNames(cx('content-container', 'recent-viewed-product'))}>
                <p className={classNames(cx('title'))}>Sản phẩm đã xem</p>
                <ProductList items={products.slice(0, 4)} />
            </div>
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
