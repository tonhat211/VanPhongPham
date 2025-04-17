import React, { useState } from 'react';
import './ProductInfoPanel.scss'
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { formatPrices, formatPercentage } from '~/utils/common';
import productsData from '~/data/productData';

function ProductInfoPanel({productId}) {

    const product = productsData.find(item => item.id === productId);
    const title = product.title;
    const brand = product.brand;
    const status = product.status;
    const price = product.price;
    const salePrices = product.salePrice;
    const discount = product.discount;

    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => setQuantity(prev => Math.max(prev - 1, 1));
    const handleIncrement = () => setQuantity(prev => prev + 1);

    return (
        <div className="info_left">
            <div className="left_1">
                <div className="left1_container">
                    <h1 className="title_info">{product.title}</h1>
                    <div className="infoBrand_status">
                        <span className="brand_product">
                            Thương hiệu: <span className="product_data">{product.brand}</span>
                        </span>
                        <span className="status_product">
                            Trạng thái: <span className="product_data">{product.status[0].state}</span>
                        </span>
                    </div>
                    <div className="info_idP">
                        <span className="product_id">
                            Mã sản phẩm: <span className="product_data">{productId}</span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="left_2">
                <div className="price_container">
                    <span className="prices">{formatPrices(product.price)}</span>
                    {product.discount > 0 && (
                        <>
                            <span className="sale_price">{formatPrices(product.salePrice)}</span>
                            <span className="discounts_price">
                                -{formatPercentage(product.discount)}
                                <LocalOfferIcon className="idiscount" />
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* Màu sắc (nếu có) */}
            {product.colors && product.colors.length > 0 && (
                <div className="product_colors">
                    <p className="label_option">Màu sắc:</p>
                    <div className="colors_wrapper">
                        {product.colors.map((color, index) => (
                            <button
                                key={index}
                                className="color_box"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Phân loại (nếu có) */}
            {product.categories && product.categories.length > 0 && (
                <div className="product_categories">
                    <p className="label_option">Phân loại:</p>
                    <div className="categories_wrapper">
                        {product.categories.map((cat, index) => (
                            <button key={index} className="category_box">
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            )}

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
                    <Button className="btn_cart" >
                        <ShoppingCartOutlinedIcon className="icart" />
                        <span className="cart">Thêm vào giỏ hàng</span>
                    </Button>
                </div>
                <div className="buy_now">
                    <Button className="btn_buy" >
                        <span>Mua ngay</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProductInfoPanel;
