import React, {useState} from "react";
import './CheckoutRightStyles.scss'
import {Button} from "@mui/material";
import { useSelector } from "react-redux";
import {formatPrices} from "../../../utils";
import { useDispatch } from "react-redux";
import { clearCart, removefromCart } from "../../../redux/CartSlice";
import { addToCart } from "../../../redux/CartSlice";
import { updateQuantity } from "../../../redux/CartSlice";
import { json, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";
import axios from 'axios'; // Sử dụng axios để lưu file JSON
function CheckoutRight() {
    const [isLoading, setIsLoading] = useState(false);

    function formatPrices(price) {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(price);
    }
    const naviage = useNavigate();
   
    function formatPercentage(decimalValue) {
        // Chuyển đổi số thập phân thành phần trăm và định dạng với 2 chữ số thập phân
        return (decimalValue * 100) + '%';
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cart.items || []);

    const handleRemove = (sid) => {
    dispatch(removefromCart(sid));
    };
    const handleClearCart = () => {
        dispatch(clearCart());
    };
    const handleIncrement = (id) => {
        const item = cartItems.find(item => item.sid === id);
        if (item) {
        handleQuantityChange(id, item.quantity + 1);
        }
    };
    const [userInfo, setUserInfo] = useState({
        name: '',
        phone:'',
        email: '',
        address: ''
    });
    const handleDecrement = (id) => {
        const item = cartItems.find(item => item.sid === id);
        if (item && item.quantity > 1) {
        handleQuantityChange(id, item.quantity - 1);
        }
    };

    const handleQuantityChange = (id, newQuantity) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
    };

  
    const calculateTotal = () => {
        return cartItems.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0) + 19000;
    };
    // orderDetails = orderID,productId,productname,quantity,price,total
    const handleCheckout =async () => {
        setIsLoading(true);
        const cartId = uuidv4()
        const orderData = {
            cartID:cartId,
            userInfor:"hehe",

            items: cartItems.map(item => ({
                productId: item.sid,
                productName: item.title,
                quantity: item.quantity,
                price: item.price,
                total: item.price * item.quantity
            })),
            shippingFee: 19000,
            total: calculateTotal(),
        };
        
        try {
            await axios.post('http://localhost:3000/api/saveOrder', orderData); // Endpoint giả sử bạn có backend xử lý
            toast.success("Thanh toán thành công!");
            handleClearCart();
            navigate('/success');
            localStorage.setItem('orderData', JSON.stringify(orderData));
            addNotification("Thanh toán thành công!", "success");
        } catch (error) {
            toast.error("Có lỗi xảy ra khi thanh toán!");
            localStorage.setItem('orderData', JSON.stringify("Thanh toán thất bại "+Date.now().toString()));
            addNotification("Thanh toán thất bại !"+ Date.now.toString, "Failed");
        }finally{
            setIsLoading(false)
        }
    };
    function addNotification(mes,status){
        const existingItemsString = localStorage.getItem('notification');
        const existingItems = existingItemsString ? JSON.parse(existingItemsString) : [];
        const notifiction = {
            id: uuidv4(),
            message :mes,
            status:status
        }
       existingItems.push(notifiction);
       const updatedItemsString = JSON.stringify(existingItems);
       localStorage.setItem('notification', updatedItemsString);


    }
    
    return (
        <div>
            <div className="order_sumary">
                <section className="checkout-details">
                    <div className="checkout-details-inner">
                        <div className="checkout-lists">
                            {cartItems.map((item, index) => (
                                <div className="card" key={index}>
                                    <div className="card-image">
                                        <img src={item.images[0].url} alt={item.title}/>
                                    </div>
                                    <div className="card-details">
                                        <div className="card-name">{item.title}</div>
                                        <div className="card-price">
                                            {formatPrices(item.price)}
                                        </div>
                                        <div className="p_quantity">
                                            <button className="btn_decrement" onClick={() => handleDecrement(item.sid)}>-</button>
                                            <span className="quantity_value">{item.quantity}</span>
                                            <button className="btn_increment" onClick={() => handleIncrement(item.sid)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="checkout-shipping ">
                            <h6>Phí vận chuyển</h6>
                            <h6>19,000₫</h6>
                        </div>
                        <div className="checkout-total">
                            <h6>Tổng cộng</h6>
                            <h6>{formatPrices(calculateTotal())}</h6>
                        </div>
                        <div className="checkout-btn">
                            <Button className="btn_payment" onClick={handleCheckout}> <span>Thanh toán </span></Button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default CheckoutRight;