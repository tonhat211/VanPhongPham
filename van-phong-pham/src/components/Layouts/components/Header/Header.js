import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Search from '../Search';
import { getCart } from '~/api/cartApi';
import { useEffect, useState } from 'react';
import { registerUser } from '~/api/registerApi';
import { logoutUser } from '~/api/logoutApi';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const userName = user?.name || 'Guest';

    // Tải user từ localStorage và theo dõi thay đổi
    useEffect(() => {
        const loadUserFromStorage = () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser && storedUser !== 'undefined') {
                    setUser(JSON.parse(storedUser));
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Lỗi khi parse user từ localStorage:', error);
                setUser(null);
            }
        };

        loadUserFromStorage();
        const handleStorageChange = () => loadUserFromStorage();
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Xử lý đăng xuất
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token không tồn tại');
            await logoutUser(token);

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            toast.success('Đăng xuất thành công!');
            navigate('/login');
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        }
    };

    // Lấy số lượng giỏ hàng khi có user
    useEffect(() => {
        const fetchCartCount = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await getCart();
                setCartCount(response.items?.length || 0);
            } catch (error) {
                console.error('Lỗi khi lấy giỏ hàng:', error);
            }
        };

        fetchCartCount();
    }, [user]);


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
                stTitle: userName,
                stLink: null,
                ndTitle: 'Đăng xuất',
                onLogout: true,
            }
            :
            {
                icon: faUser,
                stTitle: 'Đăng nhập',
                stLink: '/login',
                ndTitle: 'Đăng ký',
                ndLink: '/register',
            },
    ];

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
                        <span className={cx('cart-amount')}>{cartCount}</span>
                    </div>
                </div>
            </Link>
        );
    }

    function HeaderMenuItem({ item }) {
        return (
            <div className={cx('header-menu-item')}>
                <div className="d-flex">

                        <Link className="link-icon" to={item.stLink}>
                            <i> <FontAwesomeIcon icon={item.icon} /> </i>
                </Link>

                <div>
                        {item.stLink ? (
                            <Link to={item.stLink} style={{ fontWeight: '600', fontSize: '1rem' }}>
                                {item.stTitle}
                            </Link>
                        ) : (
                            <p style={{ fontWeight: '600', fontSize: '1rem',
                                marginLeft: '10px', marginBottom: '4px' }}>{item.stTitle}</p>
                        )}
                        {item.ndLink ? (
                            <Link to={item.ndLink} style={{ fontSize: '0.8rem' }}>{item.ndTitle}</Link>
                        ) : (
                            <p
                                style={{
                                    fontSize: '0.8rem',
                                    cursor: item.onLogout ? 'pointer' : 'default',
                                    marginLeft: '10px', marginBottom: '4px'
                                }}
                                onClick={item.onLogout ? handleLogout : undefined}
                            >
                                {item.ndTitle}
                            </p>
                        )}
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
