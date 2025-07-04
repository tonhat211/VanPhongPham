import React, {useState} from 'react';
import './ProductDetailsInfo.scss';
import productsData from '~/data/productData';
import ProductPromoPanel from '~/components/Layouts/components/ProductDetail/ProductPromoPanel';
import ProductInfoPanel from '~/components/Layouts/components/ProductDetail/ProductInfoPanel';
import useI18n from '~/hooks/useI18n';


function ProductsDetailsInfo({ product }) {
    const { t, lower } = useI18n();
    return (
        <div className="info_container">
            <div className="info_row">
                <ProductInfoPanel product={product} />
                <ProductPromoPanel />
            </div>

        </div>
    );
}

export default ProductsDetailsInfo;