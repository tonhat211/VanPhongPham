import classNames from 'classnames/bind';
import { Link, useLocation  } from 'react-router-dom';

import styles from './Breadcrumb.module.scss';
const cx = classNames.bind(styles);


function Breadcrumb() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    return (
       <div className={cx('wrapper')}>
            <ul>
                <li>
                    <Link to="/">Trang chủ</Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    return (
                        <li key={to} className={cx({ active: isLast })}>
                            {isLast ? (
                                <span>{decodeURIComponent(value)}</span>
                            ) : (
                                <Link to={to}>{decodeURIComponent(value)}</Link>
                            )}
                        </li>
                    );
                })}
            </ul>
       </div>
    );


}

export default Breadcrumb;
