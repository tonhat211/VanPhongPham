import React, {useState} from 'react';
import './ProductDetailsInfo.scss';
import productsData from '~/data/productData';
import ProductPromoPanel from '~/components/Layouts/components/ProductDetail/ProductPromoPanel';
import ProductInfoPanel from '~/components/Layouts/components/ProductDetail/ProductInfoPanel';


function ProductsDetailsInfo({ productId }) {
    return (
        <div className="info_container">
            <div className="info_row">
                <ProductInfoPanel productId={productId} />
                <ProductPromoPanel />
            </div>

        </div>
    );
}

export default ProductsDetailsInfo;