import React, {useState} from 'react';
import productsData from "../../../data/Product/productData";

import './ProductsDetailsInfoStyles.scss';
import {formatPercentage, formatPrices} from "../../../utils";
import {Button} from "@mui/material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import { useDispatch } from "react-redux";
import {addToCart} from '../../../redux/CartSlice'
import { useNavigate } from 'react-router-dom';

function ProductsDetailsInfo({ productId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleCheckout = () => {
        navigate('/checkout'); // Chuyển hướng đến trang thanh toán
    };
    console.log("Tại component product detail Product ID:"+ productId);

    // Tìm sản phẩm trong danh sách dựa vào productId
    const product = productsData.find(item => item.id === productId);

    const title = product.title;
    const brand = product.brand;
    const status = product.status;
    const price = product.price;
    const salePrices = product.salePrice;
    const discount = product.discount;

    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
    };

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
        const codeElement = document.querySelector('.tickDiscount_left strong');
        const code = codeElement ? codeElement.innerText : '';

        if (isCopied) {
            alert('Mã đã được sao chép');
        } else {
            navigator.clipboard.writeText(code)
                .then(() => {
                    setIsCopied(true);
                })
                .catch(err => {
                    console.error('Lỗi copy: ', err);
                });
        }
    };
        // Tạo một ID duy nhất cho sản phẩm (có thể sử dụng uuid hoặc đơn giản là Date.now)
        const handleAddToCart = (prop,propid,quan) => {
            dispatch(addToCart({ ...prop,sid:propid, quantity: quan })); // Bạn có thể thay đổi quantity theo ý muốn
        };

    return (
        <div className="info_container">
            <h1 className="title_info">{title}</h1>
            <div className="info_row">

                <div className="info_left">

                    <div className="left_1">
                        <div className="left1_container">
                            <div className="infoBrand_status">
                            <span className="brand_product"> Thương hiệu:
                                <span className="product_data">  {brand} </span>
                            </span>
                                <span className="status_product"> Trạng thái:
                                  <span className="product_data"> {status[0].state}</span>
                            </span>
                            </div>
                            <div className="info_idP">
                            <span className="product_id">Mã sản phẩm:
                                <span className="product_data"> {productId} </span>
                            </span>

                            </div>
                        </div>
                    </div>

                    <div className="left_2">
                        <div className="price_container">
                        <span className="prices">
                                {formatPrices(price)}
                            </span>
                            {discount > 0 && (
                                <>
                                    <span className="sale_price"> {formatPrices(salePrices)} </span>

                                    <span className="discounts_price">
                                    -{formatPercentage(discount)}
                                        <LocalOfferIcon className="idiscount" />

                            </span>

                                </>
                            )}

                        </div>
                    </div>

                    <div className="left_3">

                        <div className="product_quatity">
                            <p className="label_quatity">Số lượng: </p>
                            <div className="p_quantity">
                                <button className="btn_decrement" onClick={handleDecrement}>-</button>
                                <span className="quantity_value">{quantity}</span>
                                <button className="btn_increment" onClick={handleIncrement}>+</button>
                            </div>
                        </div>
                    </div>

                    <div className="left_4">
                        <div className="add_Cart">
                            <Button className="btn_cart" onClick={() =>handleAddToCart(product,productId,quantity)}>
                                <ShoppingCartOutlinedIcon className="icart"/>
                                <span className="cart">Thêm vào giỏ hàng</span>
                            </Button>

                        </div>
                        <div className="buy_now">
                            <Button className="btn_buy" onClick={handleCheckout}>
                                <span>Mua ngay</span>
                            </Button>
                        </div>
                    </div>


                    {/*<div className="left_5">*/}

                    {/*</div>*/}

                    {/*<div className="left_6">*/}

                    {/*</div>*/}

                </div>
                <div className="info_right">
                    <div className="right_1">
                        <div className="right1_wrap">
                            <LocalShippingOutlinedIcon className="ishipping"/>
                            <span className="text_right1">Giao hàng toàn quốc</span>
                        </div>
                        <div className="right1_wrap">
                            <StarOutlineOutlinedIcon className="istar"/>
                            <span className="text_right1">Sản phẩm chính hãng</span>
                        </div>
                        <div className="right1_wrap">
                            <CardGiftcardOutlinedIcon className="igift"/>
                            <span className="text_right1">Tích điểm đổi quà</span>
                        </div>
                        <div className="right1_wrap">
                            <LocalActivityOutlinedIcon className="isale"/>
                            <span className="text_right1">Nhiều khuyến mãi, ưu đãi</span>
                        </div>
                    </div>
                    <div className="right_2">
                        <div className="right2_container">

                            <div className="tickDiscount1">

                                <div className="tickDiscount_left">
                                    <h4>Giảm 200.000đ</h4>
                                    <p>Đơn hàng từ 1.000.000đ</p>
                                    <p>
                                        Mã:   <strong>0724SALE50</strong>
                                    </p>
                                    <p>31/07/2024</p>
                                </div>
                                <div className="tickDiscount_right">
                                    <div className="tickDiscount_right1">
                                        Điều kiện
                                    </div>
                                    <div className="tickDiscount_right2"  onClick={handleCopyClick}>
                                        {isCopied ? 'Đã sao chép' : 'Sao chép mã'}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default ProductsDetailsInfo;