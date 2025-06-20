import React, { useEffect, useState } from 'react';
import './ProductInfoPanel.scss';
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { formatPrices, formatPercentage } from '~/utils/common';
import productsData from '~/data/productData';
import { addToCart } from '~/api/cartApi';
import { toast } from 'react-toastify';
import { formatMoney } from '~/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, fetchCart } from '~/pages/productCardsPage/cartSlice';
import useI18n from '~/hooks/useI18n';


function ProductInfoPanel({ product }) {
    const { t, lower } = useI18n();

    const statuses = [
        {
            state: t('detail.status-instock'),
            description: t('detail.status-instock-description'),
        },
        {
            state: t('detail.status-outstock'),
            description: t('detail.status-outstock-description'),
        },
    ];

    const [detail, setDetail] = useState(product.details ? product.details[0] : null);
    useEffect(() => {
     
    }, [detail]);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));
    const handleIncrement = () => setQuantity((prev) => prev + 1);

    const handleAddToCart = async () => {
        if (!detail) return;

        try {
            await dispatch(addCartItem({ productDetailId: detail.id, quantity }));
            dispatch(fetchCart());
            toast.success(t('detail.toast-add-success'));
        } catch (error) {
            console.error('Lỗi khi thêm giỏ hàng:', error);
            toast.error(t('detail.toast-add-failed'));
        }
    };


    return (
        <div className="info_left">
            {detail ? (
                <>
                    <div className="left_1">
                        <div className="left1_container">
                            <h1 className="title_info">{product.name}</h1>
                            <div className="infoBrand_status">
                                <span className="brand_product">
                                    {t('detail.brand')}: <span className="product_data">{product.brand}</span>
                                </span>
                                <span className="status_product">
                                    {t('detail.status')}:{' '}
                                    <span className="product_data">
                                        {detail.qty > 0 ? statuses[0].state : statuses[1].state}
                                    </span>
                                </span>
                            </div>
                            <div className="info_idP">
                                <span className="product_id">
                                    {t('detail.code')}: <span className="product_data">{product.id}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="left_2">
                        <div className="price_container">
                            <span className="prices">{formatMoney(detail.price)}</span>
                            {detail.discount > 0 && (
                                <>
                                    <span className="sale_price">{formatMoney(detail.initPrice)}</span>
                                    <span className="discounts_price">
                                           -{detail.discount}%
                                        <LocalOfferIcon className="idiscount" />
                                    </span>
                                </>
                            )}
                        </div>
                    </div>


                    {/* Phân loại (nếu có) */}
                    {product.details && product.details.length > 0 && (
                        <div className="product_categories">
                            <p className="label_option">  {t('detail.classification')}:</p>
                            <div className="categories_wrapper">
                                {product.details.map((item, index) => (
                                    <button key={index} className="category_box">
                                        {item.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="left_3">
                        <div className="product_quatity">
                            <p className="label_quatity">{t('detail.quantity')}: </p>
                            <div className="p_quantity">
                                <button className="btn_decrement" onClick={handleDecrement}>
                                    -
                                </button>
                                <span className="quantity_value">{quantity}</span>
                                <button className="btn_increment" onClick={handleIncrement}>
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="left_4">
                        <div className="add_Cart">
                            <Button className="btn_cart">
                                <ShoppingCartOutlinedIcon className="icart" />
                                <span className="cart"  onClick={handleAddToCart}>{t('detail.add-to-cart')}</span>
                            </Button>
                        </div>
                        <div className="buy_now">
                            <Button className="btn_buy">
                                <span>{t('detail.buy-now')}</span>
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <p>{t('detail.loading')}</p>
                </>
            )}
        </div>
    );
}

export default ProductInfoPanel;
