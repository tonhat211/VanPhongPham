import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import styles from './Header.module.scss';
import images from '~/assets/images';
const cx = classNames.bind(styles);

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const user = {
        name: 'to nhat',
    };

    return (
        <header className={classNames(cx('wrapper'), 'grid')}>
            <div className={classNames('grid-row')} style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="grid-col-2">
                    <img src={images.logo} alt="Thien Long" className={classNames(cx('logo'))} />
                </div>
                <div className={cx('menu')}>
                    <p
                        className={classNames(cx('menu-btn'))}
                        tabIndex={0} // cần thiết để `onBlur` hoạt động
                        onFocus={() => setIsOpen(true)}
                        onBlur={() => setIsOpen(false)}
                    >
                        {user.name}{' '}
                        <i>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </i>
                    </p>
                    {isOpen && (
                        <ul className={cx('submenu')}>
                            <li><Link>Cập nhật thông tin</Link></li>
                            <div className="divider"></div>
                            <li><Link>Đăng xuất</Link></li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
   
}

export default Header;
