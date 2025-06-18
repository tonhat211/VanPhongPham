import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './productCardsPage.scss';
import { formatPrices, formatPercentage } from '~/utils/common';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import TickDiscount from '~/components/Layouts/components/ProductDetail/discountsticket/TickDiscount';
import CarouselCards from '~/components/Layouts/components/ProductDetail/carouselCards/CarouselCards';
import { getCart, updateCartItemQuantity, removeCartItem } from '~/api/cartApi.js';
import { toast } from 'react-toastify';
import { useStepContext } from '@mui/material';
import { SERVER_URL_BASE } from '~/api/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItem, removeCartItemById } from '~/pages/productCardsPage/cartSlice';
import useI18n from '~/hooks/useI18n';
function ProductCardsPage() {
    const { t, lower } = useI18n();
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchCart()).unwrap();
            } catch (error) {
                toast.error(t('cart.loadError'));
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);


    useEffect(() => {
        const selected = cartItems.filter(item => selectedItems.includes(item.id));
        const totalSelected = selected.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(totalSelected);
    }, [selectedItems, cartItems]);

    const handleSelectItem = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    )};



    const handleCheckout = () => {
        navigate('/checkout', { state: { selectedItems } });
    };

    const handleRemove = async (productDetailId) => {
        try {
            await dispatch(removeCartItemById(productDetailId)).unwrap();
            toast.success(t('cart.removeSuccess'));
            setSelectedItems((prev) => prev.filter((id) => id !== productDetailId));
        } catch (error) {
            toast.error(t('cart.removeError'));
        }
    };

    const handleQuantityChange = async (productDetailId, newQuantity) => {
        try {
            await dispatch(updateCartItem({ productDetailId, quantity: newQuantity })).unwrap();
        } catch (error) {
            toast.error(t('cart.updateError'));
        }
    };

    const handleIncrement = (productDetailId) => {
        const item = cartItems.find((item) => item.productDetailId === productDetailId);
        if (item) {
            handleQuantityChange(productDetailId, item.quantity + 1);
        }
    };

    const handleDecrement = (productDetailId) => {
        const item = cartItems.find((item) => item.productDetailId === productDetailId);
        if (item && item.quantity > 1) {
            handleQuantityChange(productDetailId, item.quantity - 1);
        }
    };

    return (
        <section className="cart-container">
            <div className="cart-info">
                <h3 className="cart-title">{t('cart.title')}</h3>
                <div className="cart-wrapper">
                    <div className="cart-left">
                        {loading ? (
                            <div className="cart-loading">
                                <p>{t('cart.loading')}</p>
                            </div>
                        ) : (
                            <>
                        <div className="cart-items">
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <div className="cart-item" key={item.id}>
                                        <div className="warp-item">
                                            <input
                                                type="checkbox" className="checkbox"
                                                checked={selectedItems.includes(item.id)}
                                                onChange={() => handleSelectItem(item.id)}
                                            />
                                            <img className="item-image" src={item.imageUrl} alt={item.productName} />
                                        </div>
                                        <div className="item-details">
                                            <p className="item-title">{item.productName}</p>
                                            <p className="item-brand">{item.brandName}</p>
                                        </div>

                                        <div className="item-price">
                                        {formatPrices(item.price)}
                                            {item.initPrice && (
                                                <>
                                                    <del>{formatPrices(item.initPrice)}</del>
                                                    {/*<span className="discount">*/}
                                                    {/*    -{item.discount}%*/}
                                                    {/*</span>*/}
                                                </>
                                            )}
                                        </div>

                                        <div className="item-quantity">
                                            <button onClick={() => handleDecrement(item.productDetailId)}>-</button>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                min="1"
                                                onChange={(e) => {
                                                    const newQuantity = parseInt(e.target.value);
                                                    if (!isNaN(newQuantity) && newQuantity >= 1) {
                                                        handleQuantityChange(item.productDetailId, newQuantity);
                                                    }
                                                }}
                                            />
                                            <button onClick={() => handleIncrement(item.productDetailId)}>+</button>
                                        </div>

                                        <button className="item-remove" onClick={() => handleRemove(item.productDetailId)}>
                                            ×
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="cart-empty">
                                <p>
                                    {t('cart.empty')}{' '}
                                        <a href="#" title="Trang Chủ" className="link-homepage">
                                            {' '}
                                            {t('cart.homepage')}
                                        </a>{' '}
                                    {t('cart.order')}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="cart-note">
                            <p className="shipping-note">
                                <LocalShippingRoundedIcon className="icon-shipping"></LocalShippingRoundedIcon>
                                {t('cart.freeShippingNote')}
                            </p>
                            <label className="company-invoice">
                                <input type="checkbox" />
                                {t('cart.invoice')}
                            </label>
                            <textarea placeholder={t('cart.notePlaceholder')}></textarea>
                        </div>
                        </>
                            )}
                    </div>

                    <div className="cart-right">
                        <div className="total-cart-container">
                            <p className="total-title"> {t('cart.totalTitle')} </p>
                            <span className="total-price">{formatPrices(total)}</span>
                        </div>
                        <button className="checkout-button" onClick={handleCheckout}>
                      {t('cart.checkout')}
                        </button>
                        <TickDiscount />
                    </div>
                </div>
            </div>

            <div className="carousel-section">
                <CarouselCards />
            </div>
        </section>
    );
}

export default ProductCardsPage;
