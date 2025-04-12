import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import styles from './Sidebar.module.scss';
import menus from '~/data/menu';
import featuredCategories from '~/data/featuredCategories';

const cx = classNames.bind(styles);

function Sidebar() {

    return (
        <div className={classNames(cx('wrapper'), 'grid-col-2')}>
            <div className={classNames(cx('menu-container'))}>
                <MenuList items={menus} />
            </div>
            <div className={classNames(cx('menu-container'))}>
                <p className={classNames(cx('title'))}>Danh mục nổi bật</p>
                <MenuList items={featuredCategories} />
            </div>

        </div>
    );

    function MenuItem({ item }) {
        return (
            <li className={cx('menu-item')}>
                <Link {...(item.link && { to: item.link })}>
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
        console.log('menu list', items.length);
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
