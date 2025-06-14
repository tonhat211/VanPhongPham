import classNames from 'classnames/bind';
import { Link, useLocation  } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './Breadcrumb.module.scss';
import { getLabelKeyFromSlug } from './labelMap';

const cx = classNames.bind(styles);


function Breadcrumb() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const { t } = useTranslation();
    return (
       <div className={cx('wrapper')}>
            <ul>
                <li>
                    <Link to="/">{t('home-page')}</Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    return (
                        <li key={to} className={cx({ active: isLast })}>
                            {isLast ? (
                                <span>{t(getLabelKeyFromSlug(value))}</span>
                            ) : (
                                <Link to={to}>{t(getLabelKeyFromSlug(value))}</Link>
                            )}
                        </li>
                    );
                })}
            </ul>
       </div>
    );


}

export default Breadcrumb;
