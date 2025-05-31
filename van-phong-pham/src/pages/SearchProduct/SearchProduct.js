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
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Range, getTrackBackground } from 'react-range';

import styles from './SearchProduct.module.scss';
import images from '~/assets/images';
import SubSidebar from '~/components/Layouts/components/SubSidebar';
import { menus, brands, priceRanges, colors } from '~/data';
import { ProductItem, Pagination } from '../components';
import { Product as ProductModel, StarRating } from '~/models';
import { getProductsByCategory, getProductsByKeyword } from '~/api/productApi';
import { useUpdateUrlParams } from '~/utils/url';

const cx = classNames.bind(styles);

function SearchProduct() {
    console.log('product screen');
    const [searchParams, setSearchParams] = useSearchParams();
    const updateUrlParams = useUpdateUrlParams();

    const keyword = searchParams.get('keyword');

    const page = parseInt(searchParams.get('page')) || 0;
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    const sortBy = searchParams.get('sortBy') || 'price';
    const direction = searchParams.get('direction') || 'asc';
    const size = parseInt(searchParams.get('size') || '6');
    const priceRange = searchParams.get('priceRange');
    const [products, setProducts] = useState(null);
    const [tempPriceRange, setTempPriceRange] = useState('');
    const [totalResult,setTotalResult] = useState(0);

    useEffect(() => {
         const fetchProductsByKeyword = (keyword, sortBy, direction, page, size, priceRange) => {
               getProductsByKeyword({
                keyword, sortBy, direction, page, size, priceRange
            })
                .then((data) => {
                    setProducts(data.content);
                    const pageInfo = data.pageInfo;

                    setTotalPages(pageInfo.totalPages);
                    setTotalResult(pageInfo.totalElements);
                })
                .catch((err) => {
                    console.error('Lỗi tải sản phẩm:', err);
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        fetchProductsByKeyword(keyword, sortBy, direction, page, size, priceRange);
      
    }, [keyword, sortBy, direction, page, size, priceRange]);

    const barRef = useRef(null);

    const handlePageChange = (newPage) => {
        const actualPage = newPage - 1;
        updateUrlParams({
            page: actualPage,
        });
    };

    const updateSort = (newSortBy, newDirection) => {
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

    const [sliderValues, setSliderValues] = useState([0, 1000000]);

    const handlePriceRange = (newValues) => {
        console.log('handlePageChange');
        const minPrice = newValues[0] / 1000;
        const maxPrice = newValues[1] / 1000;
        setTempPriceRange(minPrice + '-' + maxPrice);
        setSliderValues(newValues);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(tempPriceRange!=='') 
                updateUrlParams({ priceRange: tempPriceRange });
        }, 1000);

        return () => clearTimeout(timeout);
    }, [tempPriceRange]);

    const PriceRangeSlider = ({ min = 0, max = 1000000, step = 10000, onChange, values, onFinalChange }) => {
        const [internalValues, setInternalValues] = useState(values);

        useEffect(() => {
            setInternalValues(values);
        }, [values]);

        const handleChange = (newValues) => {
            setInternalValues(newValues);
            if (onChange) onChange(newValues);
        };

        const handleFinalChange = () => {
            if (onFinalChange) onFinalChange(internalValues);
        };

        return (
            <div className={classNames(cx(), 'd-flex-al-center grid-col-12')} style={{ marginTop: '20px' }}>
                <p className="d-flex-al-center">
                    Khoảng giá:{' '}
                    <span className={classNames(cx('price-range-item'))} style={{ marginLeft: '10px' }}>
                        {internalValues[0].toLocaleString()}đ
                    </span>
                </p>
                <Range
                    values={internalValues}
                    step={step}
                    min={min}
                    max={max}
                    onChange={handleChange}
                    onFinalChange={handleFinalChange} // giả sử thư viện có, hoặc dùng onMouseUp onTouchEnd ở wrapper
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            className={classNames(cx('my-slider-track'), 'grid-col-6')}
                            style={{
                                ...props.style,
                                background: getTrackBackground({
                                    values: internalValues,
                                    colors: ['#ccc', '#0d6efd', '#ccc'],
                                    min,
                                    max,
                                }),
                                height: 10,
                                margin: '0 10px',
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => <div {...props} className={cx('price-range-thumb')} />}
                />
                <p className={classNames(cx('price-range-item'))}>{internalValues[1].toLocaleString()}đ</p>
            </div>
        );
    };

    return (
        <div className={classNames(cx('wrapper'))}>
            <div className={classNames(cx('content-container', 'product-show-container'), 'd-flex')}>
                <div className={classNames(cx('content'))} style={{ flex: 1 }}>
                    <p className={classNames(cx('title'), 'uppercase-text')}>Có tất cả {totalResult} kết quả phù hợp</p>
                    <PriceRangeSlider
                        onFinalChange={(range) => {
                            handlePriceRange(range);
                        }}
                        values={sliderValues}
                    />

                    <div className="d-flex" style={{ marginTop: '20px' }}>
                        <p>Sắp xếp:</p>
                        <ul className={classNames(cx('sort-option-list'))}>
                            <li>
                                <a
                                    className={classNames(cx({ active: sortBy === 'price' && direction === 'asc' }))}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        updateSort('price', 'asc');
                                    }}
                                >
                                    Giá tăng dần
                                </a>
                            </li>
                            <li>
                                <a
                                    className={classNames(cx({ active: sortBy === 'price' && direction === 'desc' }))}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        updateSort('price', 'desc');
                                    }}
                                >
                                    Giá giảm dần
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={classNames(cx('divider'))} style={{ marginTop: '14px' }}></div>
                    {products && <ProductList items={products} />}
                    <div className={classNames(cx('pagination-container'))}>
                        <Pagination totalPages={totalPages} currentPage={page + 1} onPageChange={handlePageChange} />
                    </div>
                </div>
            </div>
        </div>
    );

    function ProductList({ items }) {
        return (
            <div className={cx('product-list-container')}>
                <div className="grid-row">
                    {items.map((item, index) => (
                        <ProductItem key={index} item={item} style={{width: '20%'}}/>
                    ))}
                </div>
            </div>
        );
    }
}

export default SearchProduct;
