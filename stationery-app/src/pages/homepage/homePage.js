import {memo} from 'react';
import "./homePageStyle.scss"
import PaymentMethod from "./payment-method/payment.js"
import CustomeCarousel from './carousel/carousel.js';
import Categogy from './categogy/categogy.js';
import SliderPage from "../sliderBrands/SliderPage";
import productsData from '../../data/Product/productData.js';
import ProductsList from "../../component/ProductList/ProductsList/ProductsList.jsx";
import { Link } from 'react-router-dom';
import banner1 from "../../resource/1.webp"
import banner2 from "../../resource/2.webp"
function HomePage(){
    const productData = productsData;
    console.log(productData);
    let fistIndex=0;
    let lastIndex=12;
    const currentPosts = productData.slice(fistIndex, lastIndex);
    const nextPost = productData.slice(13,13+12)
    return (
        <div className='home-container'>
             <div className='flex-wrap'>
                <Categogy/>
                <CustomeCarousel/>       
             </div>
             <section className='section awe-section-4'>
                <div className='background-banner'>
                    <a >
                        <img src={banner1}/>
                    </a>
                    <div className='product-data'>
                        <ProductsList productData={currentPosts}/>
                    </div>
                    <div className='see-all'>
                        
                        <Link to="/products" className="see">
                            Xem tất cả
                            <i class="fas fa-chevron-right"></i>

                        </Link>
                    </div>
                </div>
             </section>
             <section className='section awe-section-4'>
                <div className='background-banner'>
                    <a >
                        <img src={banner2}/>
                    </a>
                    <div className='product-data'>
                        <ProductsList productData={nextPost}/>
                    </div>
                    <div className='see-all'>
                        
                        <Link to="/products" className="see">
                            Xem tất cả
                            <i class="fas fa-chevron-right"></i>

                        </Link>
                    </div>
                </div>
             </section>
             
            <SliderPage/>
             <PaymentMethod/>
        </div>
    );
}
export default memo(HomePage);