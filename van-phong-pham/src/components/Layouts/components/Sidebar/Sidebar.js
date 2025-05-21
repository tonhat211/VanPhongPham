import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';


import styles from './Sidebar.module.scss';
import featuredCategories from '~/data/featuredCategories';
import { useData } from '~/context/DataContext';
// import { menus, brands, priceRanges, colors } from '~/data';



const cx = classNames.bind(styles);

function Sidebar() {
    const { t, i18n } = useTranslation();
    const { menus, featureMenus } = useData();


    //thay doi ngon ngu
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className={classNames(cx('wrapper'), 'grid-col-2')}>
            <div className={classNames(cx('menu-container'))}>
                <MenuList items={menus} />
            </div>
            {/* <div className={classNames(cx('menu-container'))}>
                <p className={classNames(cx('title'))}>{t('featured-category')}</p>
                <MenuList items={featureMenus} />
            </div> */}
        </div>
    );

    function MenuItem({ item }) {
        const pageUrl = '/products';
        const fullUrl = `${pageUrl}/${item.link}`;

        return (
            <li className={cx('menu-item')}>
                <Link {...(item.link && { to: fullUrl })}>
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
