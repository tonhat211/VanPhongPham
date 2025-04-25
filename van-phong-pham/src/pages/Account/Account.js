import classNames from 'classnames/bind';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCube,
    faUser,
    faPlus,
    faTicket,
    faMagnifyingGlass,
    faCircleXmark,
    faXmark,
    faAngleRight,
    faArrowTrendUp,
} from '@fortawesome/free-solid-svg-icons';
import SVGIcons from '~/assets/icons/svg';

import styles from './Account.module.scss';
import images from '~/assets/images';
import { CustomInput, Modal } from '../components';
import icons from '~/assets/icons';
import cartitems from '~/data/cartItems';
import { formatMoney } from '~/utils';

import { default as MenuItemModel } from '~/models/MenuItem';
import { Info, Order, Address } from './components';

const cx = classNames.bind(styles);

function Account() {
    const { t, i18n } = useTranslation();

    const menus = [
        new MenuItemModel(
            t('account-general'),
            '?view=general',
            <SVGIcons.TongQuanTaiKhoan style={{ marginRight: '4px' }} />,
        ),
        new MenuItemModel(t('account-info'), '?view=info', <SVGIcons.Account style={{ marginRight: '4px' }} />),
        new MenuItemModel(
            t('member-program'),
            '/contact',
            <SVGIcons.ChuongTrinhThanhVien style={{ marginRight: '4px' }} />,
        ),
        new MenuItemModel(
            t('order-list'),
            '?view=orders',
            <SVGIcons.DanhSachDonHang style={{ marginRight: '4px' }} />,
        ),
        new MenuItemModel(t('address-notebook'), '?view=addresses', <SVGIcons.SoDiaChi style={{ marginRight: '4px' }} />),
        new MenuItemModel(t('logout'), '/contact', <SVGIcons.DangXuat style={{ marginRight: '4px' }} />),
    ];

    const [searchParams] = useSearchParams();
    const view = searchParams.get('view');

    return (
        <div className={cx('wrapper')}>
            <div className={classNames(cx('sidebar-container'), 'grid-col-3')}>
                <AccountSidebar />
            </div>
            <div style={{ flex: '1' }}>
                {view === 'info' && <Info />}
                {view === 'orders' && <Order />}
                {view === 'addresses' && <Address />}
                </div>
        </div>
    );

    function AccountSidebar() {
        return (
            <div className={cx('sidebar')}>
                <div className="d-flex-center">
                    <div className={cx('avatar')}>
                        <p>NT</p>
                    </div>
                </div>
                <div className="d-flex-center">
                    <p style={{ fontSize: '1.4rem' }}>
                        {t('hello')}, <span className={cx('name')}>Tô Minh Nhật</span>
                    </p>
                </div>
                <div className={cx('menu-container')}>
                    <MenuList items={menus} />
                </div>
            </div>
        );
    }

    function MenuList({ items, className }) {
        return (
            <ul className={cx('menu-list', className)}>
                {items.map((item, index) => (
                    <MenuItem key={index} item={item} />
                ))}
            </ul>
        );
    }

    function MenuItem({ item }) {
        return (
            <li className={cx('menu-item')}>
                <Link to={item.link}>
                    {/* <img src={item.icon} alt="" /> */}
                    {item.icon}
                    {item.title}
                </Link>
            </li>
        );
    }
}

export default Account;
