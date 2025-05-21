import React, { useEffect, useState } from 'react';
import './ProductInfoPanel.scss';
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { formatPrices, formatPercentage } from '~/utils/common';
import productsData from '~/data/productData';

const statuses = [
    {
        state: 'còn hàng',
        description: 'Sản phẩm hiện có sẵn trong kho.',
    },
    {
        state: 'hết hàng',
        description: 'Sản phẩm đã hết hàng.',
    },
];

// function ProductInfoPanel({productId}) {
function ProductInfoPanel({ product }) {
    // const product = productsData.find(item => item.id === productId);
    // const title = product.title;
    // const brand = product.brand;
    // const status = product.status;
    // const price = product.price;
    // const salePrices = product.salePrice;
    // const discount = product.discount;
    const [detail, setDetail] = useState(product.details ? product.details[0] : null);
    useEffect(() => {
     
    }, [detail]);
    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));
    const handleIncrement = () => setQuantity((prev) => prev + 1);

    return (
        <div className="info_left">
            {detail ? (
                <>
                    <div className="left_1">
                        <div className="left1_container">
                            <h1 className="title_info">{product.name}</h1>
                            <div className="infoBrand_status">
                                <span className="brand_product">
                                    Thương hiệu: <span className="product_data">{product.brand}</span>
                                </span>
                                <span className="status_product">
                                    Trạng thái:{' '}
                                    <span className="product_data">
                                        {detail.qty > 0 ? statuses[0].state : statuses[1].state}
                                    </span>
                                </span>
                            </div>
                            <div className="info_idP">
                                <span className="product_id">
                                    Mã sản phẩm: <span className="product_data">{product.id}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="left_2">
                        <div className="price_container">
                            <span className="prices">{formatPrices(detail.price)}</span>
                            {detail.discount > 0 && (
                                <>
                                    <span className="sale_price">{formatPrices(detail.initPrice)}</span>
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
                            <p className="label_option">Phân loại:</p>
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
                            <p className="label_quatity">Số lượng: </p>
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
                                <span className="cart">Thêm vào giỏ hàng</span>
                            </Button>
                        </div>
                        <div className="buy_now">
                            <Button className="btn_buy">
                                <span>Mua ngay</span>
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <p>Dang tai</p>
                </>
            )}
        </div>
    );
}

export default ProductInfoPanel;
