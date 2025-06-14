import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';
import { Range, getTrackBackground } from 'react-range';

import styles from './SearchProduct.module.scss';
import { ProductItem, Pagination } from '../components';
import { useUpdateUrlParams } from '~/utils/url';
import { getProductsByKeyword } from '~/api/productApi';
import useI18n from '~/hooks/useI18n';
import { formatMoney } from '~/utils';

const cx = classNames.bind(styles);

function SearchProduct() {
    const { t, lower } = useI18n();

    const [searchParams, setSearchParams] = useSearchParams();
    const updateUrlParams = useUpdateUrlParams();

    const keyword = searchParams.get('keyword');

    const page = parseInt(searchParams.get('page')) || 0;
    const [totalPages, setTotalPages] = useState(1);

    const sortBy = searchParams.get('sortBy') || 'price';
    const direction = searchParams.get('direction') || 'asc';
    const size = parseInt(searchParams.get('size') || '6');
    const priceRange = searchParams.get('priceRange');
    const [products, setProducts] = useState(null);
    const [tempPriceRange, setTempPriceRange] = useState('');
    const [totalResult, setTotalResult] = useState(0);

    useEffect(() => {
        const fetchProductsByKeyword = (keyword, sortBy, direction, page, size, priceRange) => {
            getProductsByKeyword({
                keyword,
                sortBy,
                direction,
                page,
                size,
                priceRange,
            })
                .then((data) => {
                    setProducts(data.content);
                    const pageInfo = data.pageInfo;

                    setTotalPages(pageInfo.totalPages);
                    setTotalResult(pageInfo.totalElements);
                })
                .catch((err) => {
                  
                })
               
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
        const minPrice = newValues[0] / 1000;
        const maxPrice = newValues[1] / 1000;
        setTempPriceRange(minPrice + '-' + maxPrice);
        setSliderValues(newValues);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (tempPriceRange !== '') updateUrlParams({ priceRange: tempPriceRange });
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
                    <span className="hide-mob">{t('price-range')}:</span>
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
    useEffect(() => {
        scrollHeader();
    }, [page]);
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
                <div ref={contentRef} className={classNames(cx('content'))} style={{ flex: 1 }}>
                    {Array.isArray(products) && products.length > 0 ? (
                        <>
                            <p className={classNames(cx('title'), 'uppercase-text p-header-size-mob')}>
                                {t('there-are')} {totalResult} {t('matching-results')}
                            </p>
                            <PriceRangeSlider
                                onFinalChange={(range) => {
                                    handlePriceRange(range);
                                }}
                                values={sliderValues}
                            />
                            <div className="d-flex-al-center" style={{ marginTop: '20px' }}>
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
                            </div>
                            <div className={classNames(cx(''), 'divider mt-14')}></div>
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
                            <p>Không có kết quả phù hợp</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    function ProductList({ items }) {
        return (
            <div className={cx('product-list-container')}>
                <div className="grid-row">
                    {items.map((item, index) => (
                        <ProductItem key={index} item={item} className="grid-col-2_4" />
                    ))}
                </div>
            </div>
        );
    }
}

export default SearchProduct;
