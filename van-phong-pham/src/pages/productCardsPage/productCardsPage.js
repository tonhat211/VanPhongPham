import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cartItemsData from '~/data/cart';
import './productCardsPage.scss';
import { formatPrices, formatPercentage } from '~/utils/common';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import TickDiscount from '~/components/Layouts/components/ProductDetail/discountsticket/TickDiscount';
import CarouselCards from '~/components/Layouts/components/ProductDetail/carouselCards/CarouselCards';
function ProductCardsPage() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(cartItemsData);

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleRemove = (sid) => {
        setCartItems(prev => prev.filter(item => item.sid !== sid));
    };

    const handleQuantityChange = (sid, newQuantity) => {
        setCartItems(prev =>
            prev.map(item =>
                item.sid === sid ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleIncrement = (sid) => {
        const item = cartItems.find(item => item.sid === sid);
        if (item) {
            handleQuantityChange(sid, item.quantity + 1);
        }
    };

    const handleDecrement = (sid) => {
        const item = cartItems.find(item => item.sid === sid);
        if (item && item.quantity > 1) {
            handleQuantityChange(sid, item.quantity - 1);
        }
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <section className="cart-container">
            <div className="cart-info">
                <h3 className="cart-title">Giỏ hàng</h3>
                <div className="cart-wrapper">
                    <div className="cart-left">
                        <div className="cart-items">
                            {cartItems.length > 0 ? (
                                cartItems.map(item => (
                                    <div className="cart-item" key={item.sid}>
                                        <img className="item-image" src={item.images[0].url} alt={item.title} />
                                        <div className="item-details">
                                            <p className="item-title">{item.title}</p>
                                            <p className="item-brand">{item.brand}</p>
                                        </div>

                                        <div className="item-price">
                                            {formatPrices(item.price)}
                                            {item.originalPrice && (
                                                <>
                                                    <del>{formatPrices(item.originalPrice)}</del>
                                                    <span className="discount">
                -{formatPercentage(item.discountPercent)}
              </span>
                                                </>
                                            )}
                                        </div>

                                        <div className="item-quantity">
                                            <button onClick={() => handleDecrement(item.sid)}>-</button>
                                            <input type="number" value={item.quantity} min="1" readOnly />
                                            <button onClick={() => handleIncrement(item.sid)}>+</button>
                                        </div>

                                        <button className="item-remove" onClick={() => handleRemove(item.sid)}>×
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="cart-empty">
                                    <p>Bạn chưa có sản phẩm nào trong giỏ hàng - quay về <a href="#" title="Trang Chủ"
                                                                                            className="link-homepage"> Trang
                                        Chủ</a> để
                                        mua hàng</p>
                                </div>
                            )}
                        </div>

                        <div className="cart-note">
                            <p className="shipping-note">
                                <LocalShippingRoundedIcon className="icon-shipping"></LocalShippingRoundedIcon>
                                Miễn phí vận chuyển cho đơn hàng từ 100,000₫</p>
                            <label className="company-invoice">
                                <input type="checkbox" />
                                Xuất hoá đơn công ty
                            </label>
                            <textarea placeholder="Ghi chú đơn hàng"></textarea>
                        </div>

                    </div>

                    <div className="cart-right">
                        <div className="total-cart-container">
                            <p className="total-title">Tổng tiền</p>
                            <spanp className="total-price">{formatPrices(total)}</spanp>
                        </div>
                        <button className="checkout-button" onClick={handleCheckout}>
                            Tiến hành đặt hàng
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
