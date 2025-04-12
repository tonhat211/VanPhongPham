import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleXmark, faXmark, faAngleRight, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

import styles from './Search.module.scss';
import images from '~/assets/images';
import { productApi } from '~/api';
import { getRecentSearches, addRecentSearch, removeRecentSearch } from '~/utils/recentSearch';

const cx = classNames.bind(styles);

const moneyFormatter = new Intl.NumberFormat('vi-VN', {
    // nen tach thanh 1 file bo vao utils
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
});

// du lieu de demo
const recentSearchList = ['but bi', 'thuoc ke', 'tay'];
const trendSearchList = ['Bút bi', 'Giấy A3', 'Tảy','Vở 200 trang',
    'Bút bi', 'Giấy A3', 'Tảy','Vở 200 trang',
    'Bút bi', 'Giấy A3', 'Tảy','Vở 200 trang',
    'Bút bi', 'Giấy A3', 'Tảy','Vở 200 trang'
];

function Search() {
    const [isVisible, setVisible] = useState(false);
    const [searchRestults, setSearchRestults] = useState([]);
    const { t, i18n } = useTranslation();
    const [searchInput, setSearchInput] = useState('');

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
    }, [isVisible]);

    const handleSearchSubmit = (e) => {
        //cal API
        console.log('search btn');
        e.preventDefault();
        if (searchInput !== '') {
            setSearchInput(searchInput);
            addRecentSearch('bút bi');
        }
        // chuyen den trang hien thi nhung san pham tim kiem
    };

    const handleClearSearch = () => {
        setSearchInput('');
    };

    const handleTrendSearch = (item) => {
        setSearchInput(item);
        addRecentSearch('bút bi');
        // chuyen den trang hien thi nhung san pham tim kiem

    } 

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
                        {searchRestults ? (
                            <>
                                <SearchResultList items={searchRestults} />
                                <div className="d-flex-center-cetner">
                                    <Link to="/about" className={classNames(cx('title'),'btn')}>
                                        {t('more-product')} 
                                
                                        <FontAwesomeIcon icon={faAngleRight} style={{marginLeft:'5px'}}/>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <RecentSearchList items={recentSearchList} />
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
            <div className={cx('trend-search-item')}
                onClick={() => handleTrendSearch(item)}
            >
                <FontAwesomeIcon icon={faArrowTrendUp} style={{marginRight: '5px'}}/>
                <p>{item}</p>
            </div>
        );
    }

    function TrendSearchList({ items }) {
        return (
            <>
                <p className={cx('title')}>{t('trend-search')}</p>
                <div className='grid-row'>
                    {items.map((item,index) => (
                        <TrendSearchItem key={index} item={item} />
                    ))}
                </div>
            </>
        );
    }

    function RecentSearchItem({ item }) {
        return (
            <div className={cx('recent-search-item')}>
                <p>{item}</p>
                <i>
                    <FontAwesomeIcon icon={faXmark} />
                </i>
            </div>
        );
    }

    function RecentSearchList({ items }) {
        return (
            <>
                <p className={cx('title')}>{t('recent-search')}</p>
                <div>
                    {items.map((item,index) => (
                        <RecentSearchItem key={index} item={item} />
                    ))}
                </div>
            </>
        );
    }

    function SearchResultItem({ item }) {
        return (
            <div className={classNames(cx('search-result-item'))}>
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
                        <p className={cx('current-price')}>{moneyFormatter.format(item.currentPrice)}</p>
                        <p className={cx('init-price')}>{moneyFormatter.format(item.initPrice)}</p>
                    </div>
                </div>
            </div>
        );
    }

    function SearchResultList({ items }) {
        const itemsLen = items.length;
        return (
            <div>
                {items.map((item) => (
                    <>
                      <SearchResultItem key={item.id} item={item} />
                      {itemsLen>1 && <div className='divider'></div>}
                    </>
                ))}
            </div>
        );
    }
}

export default Search;
