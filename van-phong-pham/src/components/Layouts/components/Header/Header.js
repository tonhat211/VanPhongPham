import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import images from '~/assets/images';
import Search from '../Search';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faCartShopping, faUser, faBars } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    // handle shadow scroll
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={cx('header', { scrolled })}>
            <div className={cx('mid-header')}>
                <div className={cx('header-container')}>
                    <div className={cx('wrapper')}>
                        <div className={cx('header-right')}>
                            <a href="home" className={cx('logo-wrapper')}>
                                <img className={cx('img-fluid')} src={images.logo} alt="logo" />
                            </a>
                        </div>
                        <div className={cx('header-center')}>
                            <Search />
                        </div>

                        <div className={cx('wrapper-burger')}>

                            <div className={cx('burger')} onClick={toggleMenu}>
                                <FontAwesomeIcon icon={faBars} />
                            </div>
                            <div className="spacer"></div>
                            <div className={cx('cart-group')}>
                                <div className={cx('mini-cart')}>
                                    <a className={cx('hover-cart')} href="/cart">
                                        <FontAwesomeIcon icon={faCartShopping} className={cx('blue-icon')} />
                                        {/*<span className={cx('item-num')}>{cartItems.length}</span>*/}
                                    </a>
                                    <div className={cx('top-cart-content', 'card')}>
                                        {/* Nội dung xem nhanh giỏ hàng */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('header-left')}>

                            <ul>
                                <li className={cx('hot-line')}>
                                    <div className={cx('icon')}>
                                        <FontAwesomeIcon icon={faPhone} className={cx('white-icon')} />
                                    </div>
                                    <div className={cx('detail')}>
                                        <a className={cx('phone-num')}>1900 100 615</a>
                                        <span>Hỗ trợ khách hàng</span>
                                    </div>
                                </li>
                                <li className={cx('user-prof')}>
                                <div className={cx('icon')}>
                                        <FontAwesomeIcon icon={faUser} className={cx('white-icon')} />
                                    </div>
                                    <div className={cx('detail')}>
                                        <a className={cx('sign-in')}>Đăng nhập</a>
                                        <a className={cx('sign-up')}>Đăng ký</a>
                                    </div>
                                </li>
                                <li className={cx('cart-group')}>
                                    <div className={cx('mini-cart')}>
                                        <a className={cx('hover-cart')} href="/cart">
                                            <FontAwesomeIcon icon={faCartShopping} className={cx('blue-icon')} />
                                            {/*<span className={cx('item-num')}>{cartItems.length}</span>*/}
                                        </a>
                                        <div className={cx('top-cart-content', 'card')}>
                                            {/* Nội dung xem nhanh giỏ hàng */}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Mobile menu */}
                    <div className={cx('mobile-menu', { open: menuOpen })}>
                        <div className={cx('hot-line')}>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faPhone} className={cx('white-icon')} />
                            </div>
                            <div className={cx('detail')}>
                                <a className={cx('phone-num')}>1900 100 615</a>
                                <span>Hỗ trợ khách hàng</span>
                            </div>
                        </div>
                        <div className={cx('user-prof')}>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faUser} className={cx('white-icon')} />
                            </div>
                            <div className={cx('detail')}>
                                <a className={cx('sign-in')}>Đăng nhập</a>
                                <a className={cx('sign-up')}>Đăng ký</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;