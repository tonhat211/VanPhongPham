import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './Sidebar.module.scss';
import menus from '~/data/menus';
import featuredCategories from '~/data/featuredCategories';

const cx = classNames.bind(styles);

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
                <MenuList items={menus} />
            </div>
            <div className={classNames(cx('menu-container'))}>
                <p className={classNames(cx('title'))}>{t('featured-category')}</p>
                <MenuList items={featuredCategories} />
            </div>

        </div>
    );

    function MenuItem({ item }) {
        const pageUrl = '/products';
        return (
            <li className={cx('menu-item')}>
                <Link {...(item.link && { to: pageUrl+item.link })}>
                    {item.icon && (
                        <div className="grid-col-1_5">
                            <img src={item.icon} />
                        </div>
                    )}
                    <p>{item.title}</p>
                    {item.submenu && (
                        <>
                            <i>
                                <FontAwesomeIcon icon={faAngleRight} style={{ marginLeft: '5px' }} />
                            </i>
                        </>
                    )}
                </Link>
                {item.submenu && (
                    <>
                        <MenuList items={item.submenu} className={cx('sub-menu')} />
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
