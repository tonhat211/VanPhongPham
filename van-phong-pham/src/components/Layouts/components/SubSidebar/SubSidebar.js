import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';

import { priceRanges, colors } from '~/data';
import styles from './SubSidebar.module.scss';
import { useData } from '~/context/DataContext';
import { useUpdateUrlParams } from '~/utils/url';

const cx = classNames.bind(styles);

function SubSidebar() {
    const { t, i18n } = useTranslation();
    const { menus, brands } = useData();
    const [searchParams, setSearchParams] = useSearchParams();
    const updateUrlParams = useUpdateUrlParams();

    const subParam = searchParams.get('sub');
    const [selectedSubs, setSelectedSubs] = useState(subParam ? subParam.split(',') : []);

    const brandsParam = searchParams.get('brands');
    const [selectedBrands, setSelectedBrands] = useState(brandsParam ? brandsParam.split(',') : []);

    const priceRangeParam = searchParams.get('priceRange');
    const [selectedPriceRange, setSelectedPriceRange] = useState(priceRangeParam ? priceRangeParam.split(',') : []);

    useEffect(() => {
        const subParam = searchParams.get('sub');
        setSelectedSubs(subParam ? subParam.split(',') : []);

        const brandsParam = searchParams.get('brands');
        setSelectedBrands(brandsParam ? brandsParam.split(',') : []);

        const priceRangeParam = searchParams.get('priceRange');
        setSelectedPriceRange(priceRangeParam ? priceRangeParam.split(',') : []);
    }, [searchParams, brandsParam, priceRangeParam]);

    const { category } = useParams();

    let parent = menus.find((m) => m.link === category);

    if (!parent) parent = null;

    const MenuList = React.memo(function MenuList({ items, title, filterType, selectedItems, onChange }) {
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
                        <MenuItem
                            key={index}
                            item={item}
                            filterType={filterType}
                            selectedItems={selectedItems}
                            onChange={onChange}
                        />
                    ))}
                    {filterType !== 'color' && (
                        <li className={classNames(cx('more-btn'), 'btn')} onClick={() => setExpanded(!expanded)}>
                            {expanded ? (
                                <>
                                    {t('less')}
                                    <i>
                                        <FontAwesomeIcon icon={faAngleUp} style={{ marginLeft: '5px' }} />
                                    </i>
                                </>
                            ) : (
                                <>
                                    {t('more')}
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
    });

    // function MenuItem({ item, filterType }) {
    const MenuItem = React.memo(function MenuItem({ item, filterType, selectedItems, onChange }) {
        const isChecked = selectedItems.includes(item.link);
        const handleChange = (e) => onChange(filterType, item.link, e.target.checked);

        let _title = item.title || item.name || '';
        return (
            <>
                {filterType === 'color' ? (
                    <li style={{ margin: '5px 5px' }}>
                        <label>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleChange}
                                data-filter={filterType}
                                style={{ display: 'none' }}
                            />
                            <span className={cx('color-box')} style={{ backgroundColor: item.value }}>
                                {isChecked && <FontAwesomeIcon icon={faCheck} className={cx('checkmark')} />}
                            </span>
                        </label>
                    </li>
                ) : (
                    <li>
                        <label>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleChange}
                                data-filter={filterType}
                            />
                            {_title}
                        </label>
                    </li>
                )}
            </>
        );
    });

    const onSubMenuCheckboxChange = (filterType, itemValue, checked) => {
        console.log('onSubMenuCheckboxChange: kind: ' + filterType + '  link:' + itemValue + ' checked: ' + checked);
        let newSelectedItems = [...selectedSubs];

        switch (filterType) {
            case 'sub':
                newSelectedItems = [...selectedSubs];
                break;
            case 'brand':
                newSelectedItems = [...selectedBrands];
                break;
            case 'priceRange':
                newSelectedItems = [...selectedPriceRange];
                break;
        }

        if (checked) {
            if (!newSelectedItems.includes(itemValue)) newSelectedItems.push(itemValue);
        } else {
            newSelectedItems = newSelectedItems.filter((item) => item !== itemValue);
        }

        switch (filterType) {
            case 'sub':
                setSelectedSubs(newSelectedItems);
                updateUrlParams({
                    sub: newSelectedItems.length > 0 ? newSelectedItems.join(',') : null,
                    page: 0,
                });
                break;
            case 'brand':
                setSelectedBrands(newSelectedItems);
                updateUrlParams({
                    brands: newSelectedItems.length > 0 ? newSelectedItems.join(',') : null,
                    page: 0,
                });
                break;
            case 'priceRange':
           
                    newSelectedItems = newSelectedItems.slice(-1);
                setSelectedPriceRange(newSelectedItems);
                updateUrlParams({
                    priceRange:  newSelectedItems.length > 0 ? newSelectedItems.join(',') : null,
                    page: 0,
                });
                break;
        }
    };

    return (
        <div className={classNames(cx('wrapper'))}>
            <MenuList
                items={parent?.subs || menus}
                title={t('product-type')}
                filterType="sub"
                selectedItems={selectedSubs}
                onChange={onSubMenuCheckboxChange}
            />
            <MenuList
                items={brands}
                title={t('brand')}
                filterType="brand"
                selectedItems={selectedBrands}
                onChange={onSubMenuCheckboxChange}
            />
            <MenuList
                items={priceRanges}
                title={t('price-range')}
                filterType="priceRange"
                selectedItems={selectedPriceRange}
                onChange={onSubMenuCheckboxChange}
            />
            <MenuList
                items={colors}
                title={t('color')}
                filterType="color"
                selectedItems={selectedSubs}
                onChange={onSubMenuCheckboxChange}
            />
        </div>
    );

    // const MenuList = React.memo(function MenuList({ items, title, filterType, selectedSubs, onChange }) {

    // function MenuList({ items, title, filterType }) {
}

export default SubSidebar;
