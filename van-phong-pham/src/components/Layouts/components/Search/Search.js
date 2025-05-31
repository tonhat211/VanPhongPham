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
import { Link, useNavigate } from 'react-router-dom';

import styles from './Search.module.scss';
import images from '~/assets/images';
import { productApi } from '~/api';
import { getRecentSearches, addRecentSearch, removeRecentSearch } from '~/utils/recentSearch';
import { formatMoney } from '~/utils';
import { getProductsByKeyword } from '~/api/productApi';

const cx = classNames.bind(styles);

// du lieu de demo
// const recentSearchList = ['but bi', 'thuoc ke', 'tay'];
const trendSearchList = ['Bút bi', 'Giấy A3', 'Tảy', 'Vở 200 trang', 'Bút bi', 'Giấy A3', 'Tảy', 'Vở 200 trang'];

function Search() {
    const [isVisible, setVisible] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const { t, i18n } = useTranslation();
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    const [recentSearchList, setRecentSearchList] = useState([]);
    //thay doi ngon ngu
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const formRef = useRef(null);
    const [formWidth, setFormWidth] = useState(0);

    useEffect(() => {
        if (formRef.current) {
            setFormWidth(formRef.current.offsetWidth);
        }
        setRecentSearchList(getRecentSearches());
    }, [isVisible]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('search btn');
        if (searchInput !== '') {
            addRecentSearch(searchInput);
            navigate(`/products/search?keyword=${encodeURIComponent(searchInput)}`);
            setVisible(false);
        }
        // chuyen den trang hien thi nhung san pham tim kiem
    };

    const handleClearSearch = () => {
        setSearchInput('');
    };

    const handleTrendSearch = (item) => {
        setSearchInput(item);
        addRecentSearch(item);
        navigate(`/products/search?keyword=${encodeURIComponent(item)}`);
        setVisible(false);
        // chuyen den trang hien thi nhung san pham tim kiem
    };

    useEffect(() => {
        if (searchInput !== '') {
            const debounceTimeout = setTimeout(async () => {
                try {
                    getProductsByKeyword({
                        keyword: searchInput,
                        sortBy: 'price',
                        direction: 'asc',
                        page: 0,
                        size: 5,
                        priceRange: '0-1000',
                    }).then((data) => {
                        setSearchResults(data.content);
                    });
                } catch (error) {
                    if (error.name !== 'CanceledError') {
                        console.error('Fetch error:', error);
                    }
                }
            }, 1000);

            return () => clearTimeout(debounceTimeout);
        } else {
            setSearchResults([]);
        }
    }, [searchInput]);

    const handleRemoveSearchItem = (keyword) => {
        removeRecentSearch(keyword);
        setRecentSearchList(getRecentSearches());
    };

    return (
        <div
            className="grid-col-5"
            style={{
                margin: '0 20px',
            }}
        >
            <HeadlessTippy
                interactive
                visible={isVisible}
                onClickOutside={() => setVisible(false)}
                render={(attrs) => (
                    <div
                        className={classNames(cx('search-box'), 'custom-scroll')}
                        tabIndex="-1"
                        {...attrs}
                        style={{ width: formWidth }}
                    >
                        {Array.isArray(searchResults) && searchResults.length > 0 ? (
                            <>
                                <SearchResultList items={searchResults} />
                                <div className="d-flex-center-cetner">
                                    <Link onClick={handleSearchSubmit} className={classNames(cx('title'), 'btn')}>
                                        {t('more-product')}

                                        <FontAwesomeIcon icon={faAngleRight} style={{ marginLeft: '5px' }} />
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <RecentSearchList
                                    items={recentSearchList}
                                    onRemove={handleRemoveSearchItem}
                                    onClick={handleTrendSearch}
                                />
                                <TrendSearchList items={trendSearchList} />
                            </>
                        )}
                    </div>
                )}
            >
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
            </HeadlessTippy>
        </div>
    );

    function TrendSearchItem({ item }) {
        return (
            <div className={cx('trend-search-item')} onClick={() => handleTrendSearch(item)}>
                <FontAwesomeIcon icon={faArrowTrendUp} style={{ marginRight: '5px' }} />
                <p>{item}</p>
            </div>
        );
    }

    function TrendSearchList({ items }) {
        return (
            <>
                <p className={cx('title')}>{t('trend-search')}</p>
                <div className="grid-row">
                    {items.map((item, index) => (
                        <TrendSearchItem key={index} item={item} />
                    ))}
                </div>
            </>
        );
    }

    function RecentSearchItem({ item, onRemove, onClick }) {
        return (
            <div className={cx('recent-search-item')} onClick={() => onClick(item)}>
                <p>{item}</p>
                <i onClick={() => onRemove(item)}>
                    <FontAwesomeIcon icon={faXmark} />
                </i>
            </div>
        );
    }

    function RecentSearchList({ items, onRemove, onClick }) {
        return (
            <>
                <p className={cx('title')}>{t('recent-search')}</p>
                <div>
                    {items.map((item) => (
                        <RecentSearchItem key={item} item={item} onRemove={onRemove} onClick={onClick} />
                    ))}
                </div>
            </>
        );
    }

    function SearchResultItem({ item }) {
        return (
            <div className={classNames(cx('search-result-item'))}
                onClick={() =>  navigate(`/products/detail/${item.id}`)}
            >
                <div className="grid-col-1_5">
                    <img src={item.thumbnail} alt="But bi" />
                </div>
                <div className="grid-col-10">
                    <p
                        className={cx('name')}
                        style={{
                            marginTop: '10px',
                        }}
                    >
                        {item.name}
                    </p>
                    <div
                        className="d-flex-space-between grid-col-4"
                        style={{
                            marginTop: '10px',
                        }}
                    >
                        <p className={cx('current-price')}>{formatMoney(item.price)}</p>
                        <p className={cx('init-price')}>{formatMoney(item.initPrice)}</p>
                    </div>
                </div>
            </div>
        );
    }

    function SearchResultList({ items }) {
        if (!Array.isArray(items)) return null;
        const itemsLen = items.length;
        return (
            <div>
                {items.map((item) => (
                    <>
                        <SearchResultItem key={item.id} item={item} />
                        {itemsLen > 1 && <div className="divider"></div>}
                    </>
                ))}
            </div>
        );
    }
}

export default Search;
