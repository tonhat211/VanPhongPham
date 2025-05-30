import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './productCardsPage.scss';
import { formatPrices, formatPercentage } from '~/utils/common';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import TickDiscount from '~/components/Layouts/components/ProductDetail/discountsticket/TickDiscount';
import CarouselCards from '~/components/Layouts/components/ProductDetail/carouselCards/CarouselCards';
import { getCart, updateCartItemQuantity, removeCartItem } from '~/api/cartApi.js';
import { toast } from 'react-toastify';
function ProductCardsPage() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await getCart();
                setCartItems(response.items.map(item => ({
                    sid: item.productDetailId,
                    imageUrl: item.imageUrl,
                    productName: item.productName,
                    brandName: item.brandName,
                    initPrice: item.initPrice,
                    price: item.price,
                    quantity: item.quantity,
                })));
                setTotal(response.totalPrice);
                setLoading(false);
            } catch (error) {
                toast.error("Lỗi khi tải giỏ hàng.");
                console.error(error);
            }
        };

        fetchCart();
    }, []);

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleRemove = async (sid) => {
        try {
            const response = await removeCartItem(sid);
            setCartItems(response.items.map(item => ({
                sid: item.productDetailId,
                imageUrl: item.imageUrl,
                productName: item.productName,
                brandName: item.brandName,
                initPrice: item.initPrice,
                price: item.price,
                quantity: item.quantity,
            })));
            setTotal(response.totalPrice);
        } catch (error) {
            toast.error("Không thể xoá sản phẩm.");
        }
    };

    const handleQuantityChange = async (sid, newQuantity) => {
        try {
            const response = await updateCartItemQuantity(sid, newQuantity);
            setCartItems(response.items.map(item => ({
                sid: item.productDetailId,
                imageUrl: item.imageUrl,
                productName: item.productName,
                brandName: item.brandName,
                initPrice: item.initPrice,
                price: item.price,
                quantity: item.quantity,
            })));
            setTotal(response.totalPrice);
        } catch (error) {
            toast.error("Không thể cập nhật số lượng.");
        }
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

    return (
        <section className="cart-container">
            <div className="cart-info">
                <h3 className="cart-title">Giỏ hàng</h3>
                <div className="cart-wrapper">
                    <div className="cart-left">
                        {loading ? (
                            <div className="cart-loading">
                                <p>Đang tải giỏ hàng...</p>
                            </div>
                        ) : (
                            <>
                        <div className="cart-items">
                            {cartItems.length > 0 ? (
                                cartItems.map(item => (
                                    <div className="cart-item" key={item.sid}>
                                        <img className="item-image" src={item.imageUrl} alt={item.title} />
                                        <div className="item-details">
                                            <p className="item-title">{item.productName}</p>
                                            <p className="item-brand">{item.brandName}</p>
                                        </div>

                                        <div className="item-price">
                                            {formatPrices(item.price)}
                                            {item.initPrice && (
                                                <>
                                                    <del>{formatPrices(item.initPrice)}</del>
                                                    <span className="discount">
                -{formatPercentage(item.discountPercent)}
              </span>
                                                </>
                                            )}
                                        </div>

                                        <div className="item-quantity">
                                            <button onClick={() => handleDecrement(item.sid)}>-</button>
                                            <input type="number" value={item.quantity} min="1"  onChange={(e) => {
                                                const newQuantity = parseInt(e.target.value);
                                                if (!isNaN(newQuantity) && newQuantity >= 1) {
                                                    handleQuantityChange(item.sid, newQuantity);
                                                }
                                            }} />
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
                        </>
                            )}
                    </div>

                    <div className="cart-right">
                        <div className="total-cart-container">
                            <p className="total-title">Tổng tiền</p>
                            <span className="total-price">{formatPrices(total)}</span>
                        </div>
                        <button className="checkout-button" onClick={handleCheckout}>
                            Tiến hành đặt hàng
                        </button>
                        <TickDiscount />
                    </div>

                </div>
            </div>

            <div className="carousel-section">
                {/*<CarouselCards />*/}
            </div>
        </section>
    );
}

export default ProductCardsPage;
