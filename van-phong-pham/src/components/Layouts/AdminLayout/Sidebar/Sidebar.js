import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './Sidebar.module.scss';
import MenuItem from '~/models/MenuItem';

const cx = classNames.bind(styles);

const menuData = [
    new MenuItem('Thống kê', '/admin/dashboard'),
    new MenuItem('Quản lý khách hàng', '/admin/customer'),
    new MenuItem('Quản lý nhân viên', '/admin/employee'),
    new MenuItem('Quản lý sản phẩm', '/admin/product'),
    new MenuItem('Quản lý đơn hàng', '/admin/order'),
    new MenuItem('Quản lý giao diện', '/admin/ui')
]

function Sidebar() {
    const { t, i18n } = useTranslation();
    //thay doi ngon ngu
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    // khi click vao menu item, thi truyen item duoc chon vao url de nhung trang khac (products) co the lay
    // const navigate = useNavigate();

    // const handleClick = (item) => {
    //     navigate(`/subsidebar?item=${encodeURIComponent(item.name)}`);
    // };
    ///////////////////////////////////////////////

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
