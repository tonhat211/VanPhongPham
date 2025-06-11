import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import styles from './Sidebar.module.scss';
import featuredCategories from '~/data/featuredCategories';
import { useData } from '~/context/DataContext';
import { useSidebar } from '~/context/FEProvider';
import { logoutUser } from '~/api/logoutApi';
import { toast } from 'react-toastify';

// import { menus, brands, priceRanges, colors } from '~/data';

const cx = classNames.bind(styles);

function Sidebar({ className }) {
    const { t, i18n } = useTranslation();
    const { menus, featureMenus } = useData();

      const { closeSidebar } = useSidebar(); 
       const handleCloseSidebar = () => {
        closeSidebar(); // 🟢 Gọi đóng sidebar khi click
    };

    const { isSidebarOpen, toggleSidebar } = useSidebar();

    //thay doi ngon ngu
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
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
        handleCloseSidebar();
    };

    const account = user
        ? {
              icon: faUser,
              stTitle: userName,
              stLink: '/account',
              ndTitle: 'Đăng xuất',
              onLogout: true,
          }
        : {
              icon: faUser,
              stTitle: 'Đăng nhập',
              stLink: '/login',
              ndTitle: 'Đăng ký',
              ndLink: '/register',
          };

    return (
        <div
            className={classNames(cx('wrapper'), 'grid-col-2', {
                'hide-tab': !isSidebarOpen, // ẩn khi chưa mở
            })}
        >
            <div className={classNames(cx('overlay'), 'hide',{ 'show': isSidebarOpen })} onClick={toggleSidebar}></div>

            <div className={classNames(cx('menu-container'), 'w-30-tab')}>
                <div className={classNames('hide show-tab')}>
                    <HeaderMenuItem item={account} />
                </div>
                <MenuList items={menus} />
            </div>
        </div>
    );

    function HeaderMenuItem({ item }) {
        return (
            <div className={cx('header-menu-item')}>
                <div className="d-flex">
                    <Link className="link-icon" to={item.stLink} onClick={handleCloseSidebar}>
                        <i className={cx('user-icon')}>
                            {' '}
                            <FontAwesomeIcon icon={item.icon} />{' '}
                        </i>
                    </Link>

                    <div className="d-flex-space-between" style={{flex:1, alignItems:'center'}}>
                        {item.stLink ? (
                            <Link to={item.stLink} style={{ fontWeight: '600', fontSize: '1rem' }}
                             onClick={handleCloseSidebar}
                             >
                                {item.stTitle}
                            </Link>
                        ) : (
                            <p style={{ fontWeight: '600', fontSize: '1rem', marginLeft: '10px', marginBottom: '4px' }}>
                                {item.stTitle}
                            </p>
                        )}
                        {item.ndLink ? (
                            <Link to={item.ndLink} style={{ fontSize: '0.8rem' }}
                             onClick={handleCloseSidebar}>
                                {item.ndTitle}
                            </Link>
                        ) : (
                            <i className={cx('logout-icon')}>
                                {' '}
                                <FontAwesomeIcon icon={faRightFromBracket} 
                                onClick={item.onLogout ? handleLogout : undefined}/>
                          
                            </i>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    function MenuItem({ item }) {
        const pageUrl = '/products';
        const fullUrl = `${pageUrl}/${item.link}`;
    const { closeSidebar } = useSidebar(); 
       const handleClick = () => {
        closeSidebar(); // 🟢 Gọi đóng sidebar khi click
    };
        return (
            <li className={cx('menu-item')} >
                <Link {...(item.link && { to: fullUrl })} onClick={handleClick}>
                    {item.icon && (
                        <div className="grid-col-1_5">
                            <img src={item.icon} />
                        </div>
                    )}
                    <p>{item.title}</p>
                    {item.subs && (
                        <>
                            <i>
                                <FontAwesomeIcon icon={faAngleRight} style={{ marginLeft: '5px' }} />
                            </i>
                        </>
                    )}
                </Link>
                {item.subs && (
                    <>
                        <MenuList items={item.subs} className={cx('sub-menu')} />
                    </>
                )}
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
