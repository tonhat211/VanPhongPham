import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
    faMinus,
    faPlus,
    faTicket,
    faMagnifyingGlass,
    faCircleXmark,
    faXmark,
    faAngleRight,
    faArrowTrendUp,
} from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import styles from './Product.module.scss';
import images from '~/assets/images';
import { CustomInput, Modal } from '~/pages/components';
import { formatMoney } from '~/utils';
import useI18n from '~/hooks/useI18n';
import { productApi } from '~/api';

const cx = classNames.bind(styles);
const searchValue = [
    {
      value: 'name',
      label: 'Tên',
    },
    {
      value: 'id',
      label: 'ID',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
function Product() {
    const { t, lower } = useI18n();
    const [searchInput, setSearchInput] = useState('');
    const formRef = useRef(null);
    const [formWidth, setFormWidth] = useState(0);
    const [isVisible, setVisible] = useState(false);
    const [searchRestults, setSearchRestults] = useState([]);

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

    return (
        <div className={cx('wrapper')}>
            <div className="d-flex-space-between" style={{ alignItems: 'center' }}>
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
                <Link>Thêm sản phẩm</Link>
            </div>
        </div>
    );
}

export default Product;
