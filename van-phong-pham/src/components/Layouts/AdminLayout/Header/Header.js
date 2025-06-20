import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './Header.module.scss';
import images from '~/assets/images';
import { logoutUser } from '~/api/logoutApi';
import { useAuth } from '~/context/AuthContext';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Header() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

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
                // console.error('Lỗi khi parse user từ localStorage:', error);
                setUser(null);
            }
        };

        loadUserFromStorage();
        const handleStorageChange = () => loadUserFromStorage();
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
    // Xử lý đăng xuất
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token không tồn tại');
            await logoutUser(token);

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            logout();
            toast.success('Đăng xuất thành công!');
            navigate('/login');
        } catch (error) {
            // console.error('Lỗi khi đăng xuất:', error);
        }
    };

    return (
        <header className={classNames(cx('wrapper'), 'grid')}>
            <div className={classNames('grid-row')} style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="grid-col-2">
                    <Link to="/" ><img src={images.logo} alt="Thien Long" className={classNames(cx('logo'))} /></Link>
                </div>
                <div className={cx('menu')}>
                    <p
                        className={classNames(cx('menu-btn'))}
                        tabIndex={0} // cần thiết để `onBlur` hoạt động
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => setIsOpen(false)}
                    >
                        {user?.name}{' '}
                        <i>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </i>
                    </p>
                    {isOpen && (
                        <ul className={cx('submenu')}>
                            <li>
                                <Link>Cập nhật thông tin</Link>
                            </li>
                            <div className="divider"></div>
                            <li>
                                <Link onClick={handleLogout}>Đăng xuất</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
