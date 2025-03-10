import React from "react";

import './detailsPageStyle.scss';
import {useParams} from "react-router-dom";
import ProductsDetailsImgs from "../../component/ProductsDetail/productDetailsImgs/ProductsDetailsImgs";
import ProductsDetailsInfo from "../../component/ProductsDetail/ProductDetailInfo/ProductsDetailsInfo";
import SliderCards from "../../component/ProductsDetail/SliderCards/SliderCards";
import ProductDiscription from "../../component/ProductsDetail/ProductDetailsDescription/ProductDiscription";
import ReviewAndRating from "../../component/ProductsDetail/ReviewAndRating/ReviewAndRating";
import SliderPage from "../sliderBrands/SliderPage";


function DetailPage() {
    const { productId} = useParams();
    console.log("Tại trang product detail Product ID:"+ productId);
    return (
        <div className="pdetails_main">
            <div className="pdetails_container">

                <div className="card1_container">

                    <div className="rows">
                        <div className="pdetails_imgs">
                            <ProductsDetailsImgs productId={productId} />
                        </div>

                        <div className="pdetails_info">
                            <ProductsDetailsInfo productId={productId} />
                        </div>
                    </div>

                </div>

                <div className="card2_container">
                    <h2 className="Label_sameTypes"> Có thể bạn sẽ thích </h2>
                    <SliderCards/>
                </div>

                <div className="card3_container">
                    <ProductDiscription productId={productId}/>
                </div>

                <div className="card4_container">
                    <ReviewAndRating productId={productId}/>
                </div>

            </div>
            <SliderPage/>
        </div>
    );

}

export default DetailPage;