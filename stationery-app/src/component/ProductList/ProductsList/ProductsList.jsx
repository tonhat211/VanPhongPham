import React from 'react';
import './ProductsList.scss'
import ProductItem from "../ProductItem/ProductItem";

function ProductsList({ productData }) {
    return (
        <div className="listItem_container">
            {productData.map((product, index) => (
                <ProductItem
                    key={product.id}
                    productid={product.id}
                />
            ))}
        </div>
    );
}

export default ProductsList;