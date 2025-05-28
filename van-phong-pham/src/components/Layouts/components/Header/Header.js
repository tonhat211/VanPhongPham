import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Search from '../Search';
const cx = classNames.bind(styles);

// du lieu header menu list
const headerMenuList = [
    {
        icon: faPhone,
        stTitle: '1900 866 819',
        stLink: null,
        ndTitle: 'Hỗ trợ khách hàng',
        ndLink: null,
    },
    user
        ? {
            icon: faUser,
            stTitle: user.fullName || user.email || 'Tài khoản',
            ndTitle: 'Đăng xuất',
            onLogout: true,
        }
        :
    {
        icon: faUser,
        stTitle: 'Đăng nhập',
        stLink: null,
        ndTitle: 'Đăng ký',
        ndLink: null,
    },
];

function Header() {
    return (
        <header className={classNames(cx('wrapper'), 'grid')}>
            <div className={classNames('grid-row')} style={{ alignItems: 'center' }}>
                <div className="grid-col-2">
                    <img src={images.logo} alt="Thien Long" className={classNames(cx('logo'))} />
                </div>
                <Search />
                <div className='d-flex-al-center' style={{marginLeft:'auto'}}>
                    <HeaderMenuList items={headerMenuList}/>
                    <Cart />
                </div>
                
            </div>
        </header>
    );

    function Cart() {
        return (
            <Link className={cx('cart-item')} to="/cart">
                <div className={cx('cart-item-icon')}>
                    <FontAwesomeIcon icon={faCartShopping} />
                    <div className={cx('cart-amount-item')}>
                        <span className={cx('cart-amount')}>11</span>
                    </div>
                </div>
            </Link>
        );
    }

    function HeaderMenuItem({ item }) {
        return (
            <div className={cx('header-menu-item')}>
                <div className="d-flex">
                    <i>
                        <FontAwesomeIcon icon={item.icon} />
                    </i>
                    <div>
                        <Link
                            {...(item.stLink && { to: item.stLink })}
                            style={{ fontWeight: '600', fontSize: '1rem' }}
                        >
                            {item.stTitle}
                        </Link>
                        <Link {...(item.ndLink && { to: item.ndLink })} style={{ fontSize: '0.8rem' }}>
                            {item.ndTitle}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    function HeaderMenuList({ items }) {
        return (
            <>
                {items.map((item, index) => (
                    <HeaderMenuItem key={index} item={item} />
                ))}
            </>
        );
    }
}

export default Header;
