import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './Sidebar.module.scss';
import MenuItem from '~/models/MenuItem';

import useI18n from '~/hooks/useI18n';
const cx = classNames.bind(styles);


const menuData = [
    // new MenuItem('Thống kê/báo cáo', '/admin/dashboard'),
    new MenuItem('Quản lý khách hàng', '/admin/customer'),
    new MenuItem('Quản lý nhân viên', '/admin/employee'),
    new MenuItem('Quản lý sản phẩm', '/admin/products'),
    // new MenuItem('Quản lý kho hàng', '/admin/category'),
    new MenuItem('Quản lý đơn hàng', '/admin/orders'),
    // new MenuItem('Quản lý khuyến mãi ', '/admin/discount'),
    // new MenuItem('Quản lý logs ', '/admin/logs'),
    new MenuItem('Quản lý phân quyền ', '/admin/permissions')
]

function Sidebar() {
    const {t, lower} = useI18n();
    return (
        <div className={classNames(cx('wrapper'), 'grid-col-2')}>
            <div className={classNames(cx('menu-container'))}>
                <MenuList items={menuData} />
            </div>
        </div>
    );

    function MenuItem({ item }) {
   
        return (
            <li className={cx('menu-item')}>
                <Link {...(item.link && { to: item.link })}>
                    <p>{item.title}</p>
                </Link>
            </li>
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
}

export default Sidebar;
