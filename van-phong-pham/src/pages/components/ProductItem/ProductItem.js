import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faArrowTrendUp, faAngleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './ProductItem.module.scss';
import { default as StarRating } from '../StarRating';
import { default as CustomButton } from '../CustomButton';
import { formatMoney, addToRecentlyViewed } from '~/utils';
import useI18n from '~/hooks/useI18n';

const cx = classNames.bind(styles);

function ProductItem({ item, style, className }) {
    const { t, lower } = useI18n();

    return (
        <div
            className={`${className || 'grid-col-3'} grid-col-4-tab grid-col-6-mob p-4-mob`}
            style={{ padding: '10px', ...style }}
        >
            <div className={cx('product-item')}>
                <Link to={`/products/detail/${item.id}`} onClick={() => addToRecentlyViewed(item)}>
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
                                    {t('sold')} {item.soldQty}
                                </p>
                            )}
                        </div>
                        <div className={cx('name-container')}>
                            <p>{item.name}</p>
                        </div>
                        <div className={cx('rate-container')}>
                            <StarRating rate={item.avgRating} />
                            <p style={{ alignItems: 'center' }}>
                                (<span>{item.totalReview}</span>)
                            </p>
                        </div>
                        <div className={cx('price-container')}>
                            <p className={cx('current-price')}>{formatMoney(item.price)}</p>
                            <div className="d-flex" style={{ alignItems: 'center' }}>
                                <p className={cx('init-price')}>{formatMoney(item.initPrice)}</p>
                                <p className={cx('discount-label')}>
                                    -<span>{item.discount}</span>%
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="divider" style={{ margin: '0 10px' }}></div>
                    <div className={cx('btn-container')}>
                        <CustomButton title={t('quick-view')} defaultICon={faAngleRight} afterIcon={faArrowRight} pStyle={{ textTransform: 'uppercase' }} />
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default ProductItem;
