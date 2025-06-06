import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faArrowTrendUp, faAngleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

import styles from './ProductItem.module.scss';
import images from '~/assets/images';
import { default as StarRating } from '../StarRating';
import { default as CustomButton } from '../CustomButton';
import { formatMoney, addToRecentlyViewed } from '~/utils';

const cx = classNames.bind(styles);

function ProductItem({ item,style }) {
    return (
        <div className="grid-col-3" style={{ padding: '10px',...style }}>
            <div className={cx('product-item')}>
                <Link to={`/products/detail/${item.id}`}
                  onClick={() => addToRecentlyViewed(item)}
>
                    <div className={cx('img-container')}>
                        <img src={item.thumbnail} alt="" />
                    </div>
                    <div className={cx('info-container')}>
                        <div className={cx('label-container')}>
                            {item.label && (
                                <p className={cx('label', 'like-label')}>
                                    <i>
                                        <FontAwesomeIcon icon={faThumbsUp} />
                                    </i>
                                    {item.label}
                                </p>
                            )}
                            {item.soldQty && (
                                <p className={cx('label', 'sold-label')}>
                                    <i>
                                        <FontAwesomeIcon icon={faArrowTrendUp} />
                                    </i>
                                    Đã bán {item.soldQty}
                                </p>
                            )}
                        </div>
                        <div className={cx('name-container')}>
                            <p>{item.name}</p>
                        </div>
                        <div className={cx('rate-container')}>
                            <StarRating rate={item.avgRating} />
                            <p style={{alignItems:'center'}}> 
                                (<span>{item.totalReview}</span>)
                            </p>
                        </div>
                        <div className={cx('price-container')}>
                            <p className={cx('current-price')}>{formatMoney(item.price)}</p>
                            <div className="d-flex" style={{ alignItems: 'center' }}>
                                <p className={cx('init-price')}>{formatMoney(item.initPrice)}</p>
                                <p className={cx('discount-label')}>
                                    - <span>{item.discount}</span>%
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="divider" style={{ margin: '0 10px' }}></div>
                    <div className={cx('btn-container')}>
                        <CustomButton title='XEM NHANH' defaultICon={faAngleRight} afterIcon={faArrowRight}/>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default ProductItem;
