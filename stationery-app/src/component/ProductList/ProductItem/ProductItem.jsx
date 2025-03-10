import React from "react";
import './ProductItemStyles.scss'
import {formatPercentage, formatPrices} from "../../../utils";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import {Button} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import productsData from "../../../data/Product/productData";
import { Link } from 'react-router-dom';
import { PATH } from "../../../utils/path";
import { useDispatch } from "react-redux";
import {addToCart} from '../../../redux/CartSlice'
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function ProductItem({ productid }) {
    const product = productsData.find(item => item.id === productid);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Tạo một ID duy nhất cho sản phẩm (có thể sử dụng uuid hoặc đơn giản là Date.now)
    // Tạo một ID duy nhất cho sản phẩm (có thể sử dụng uuid hoặc đơn giản là Date.now)
    const handleAddToCart = (prop,propid,quan) => {
        dispatch(addToCart({ ...prop,sid:propid, quantity: quan })); // Bạn có thể thay đổi quantity theo ý muốn
    };
    const handleProductClick = () => {
        navigate(`/products/${product.id}`);
    };
    return (
        
        <div className="card" key={product.id} onClick={handleProductClick}>
           <Link to={`/products/${product.id}`}>
            <div className="card_top">
                    <div className="wrapImgs">
                        <img className="img_other" src={product.images[0].url} alt={product.images[0].alt}/>
                    </div>
                </div>
            <div className="card_bottom">
                <h3 className="titleProduct">
                    <Link to={PATH.USER.PRODUCTDETAIL.replace(':productId',product.id)}>{product.title}</Link>
                </h3>

            <div className="price_container">
                <span className="prices">
                    {formatPrices(product.price)}
                </span>
                {product.discount > 0 && (
                <span className="sale_price">{formatPrices(product.salePrice)}</span>
        )}
</div>
<div className="others">
    <div className="others_discounts">
        {product.discount > 0 && (
            <span className="discounts_price">
                    -{formatPercentage(product.discount)}
                {/* <LocalOfferIcon className="idiscount"/> */}

            </span>
        )}
    </div>
    <div className="others_btns">
        <Button className="ivisible"><VisibilityIcon/></Button>
        <Button className="iaddCart"  onClick={() => handleAddToCart(product,productid,)} ><AddShoppingCartIcon/></Button>
    </div>
</div>
            </div>
           </Link>
        </div>
    );
}

export default ProductItem;