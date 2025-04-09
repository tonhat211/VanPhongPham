import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

import styles from './Search.module.scss';
import images from '~/assets/images';
import { productApi } from '~/api';

const cx = classNames.bind(styles);

const moneyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
});

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
                                    <Link to="/about" className="btn">
                                        More Product
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <SearchResultList items={searchRestults} />
                                <div className="d-flex-center-cetner">
                                    <Link to="/about" className="btn">
                                        More Product
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                )}
            >
                <form ref={formRef} className={classNames(cx('search-form'), 'd-flex')}>
                    <input
                        placeholder={t('search product')}
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
}

function recentSearchItem() {
    
}

function SearchResultItem({ item }) {
    return (
        <div className={cx('search-result-item')}>
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
    return (
        <div>
            {items.map((item) => (
                <SearchResultItem key={item.id} item={item} />
            ))}
        </div>
    );
}

export default Search;
