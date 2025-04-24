import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import { menus, brands, priceRanges, colors } from '~/data';
import styles from './SubSidebar.module.scss';

const cx = classNames.bind(styles);

function SubSidebar() {
    const { t, i18n } = useTranslation();

    //thay doi ngon ngu
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };
    //code chinh thuc
    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const category = queryParams.get('category');

    // test
    const category = '/but-viet';

    let parent = menus.find((m) => m.link === category);
    if (!parent) parent = null;

    return (
        <div className={classNames(cx('wrapper'))}>
            <MenuList items={parent?.submenu || menus} title={t('product-type')} filterType="menu" />
            <MenuList items={brands} title={t('brand')} filterType="brand" />
            <MenuList items={priceRanges} title={t('price-range')} filterType="price" />
            <MenuList items={colors} title={t('color')} filterType="color" />
        </div>
    );

    function MenuList({ items, title, filterType }) {
        const [expanded, setExpanded] = useState(false);
        let visibleItems = expanded ? items : items.slice(0, 5);
        if (filterType === 'color') visibleItems = items;
        return (
            <div className={classNames(cx('menu-list-container'))}>
                <p className={classNames(cx('title'), 'uppercase-text')}>{title}</p>

                <ul
                    className={classNames(cx('menu-list'), {
                        'd-flex grid-row': filterType === 'color',
                    })}
                >
                    {visibleItems.map((item, index) => (
                        <MenuItem key={index} item={item} filterType={filterType} />
                    ))}
                    {filterType !== 'color' && (
                        <li className={classNames(cx('more-btn'), 'btn')} onClick={() => setExpanded(!expanded)}>
                            {expanded ? (
                                <>
                                    Thu gọn{' '}
                                    <i>
                                        <FontAwesomeIcon icon={faAngleUp} style={{ marginLeft: '5px' }} />
                                    </i>
                                </>
                            ) : (
                                <>
                                    Xem thêm{' '}
                                    <i>
                                        <FontAwesomeIcon icon={faAngleDown} style={{ marginLeft: '5px' }} />
                                    </i>
                                </>
                            )}
                        </li>
                    )}

                    {filterType !== 'color' && <div className="divider"></div>}
                </ul>
            </div>
        );
    }

    function MenuItem({ item, filterType }) {
        const [checked, setChecked] = useState(false);

        const handleChange = (e) => {
            setChecked(e.target.checked);
        };
        let _title = item.title || item.name || '';
        return (
            <>
                {filterType === 'color' ? (
                    <li style={{ margin: '5px 5px' }}>
                        <label>
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={handleChange}
                                data-filter={filterType}
                                style={{ display: 'none' }}
                            />
                            <span className={cx('color-box')} style={{ backgroundColor: item.value }}>
                                {checked && <FontAwesomeIcon icon={faCheck} className={cx('checkmark')} />}
                            </span>
                        </label>
                    </li>
                ) : (
                    <li>
                        <label>
                            <input type="checkbox" checked={checked} onChange={handleChange} data-filter={filterType} />
                            {_title}
                        </label>
                    </li>
                )}
            </>
        );
    }
}

export default SubSidebar;
