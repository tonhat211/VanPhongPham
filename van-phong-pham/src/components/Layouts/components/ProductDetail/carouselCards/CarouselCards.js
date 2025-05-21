import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Product as ProductModel } from '~/models';
import images from '~/assets/images';
import './CarouselCards.scss';
import { ProductItem } from '~/pages/components';
function CarouselCards() {
    // du lieu demo
    let recentlyViewedProducts = localStorage.getItem('recentlyViewedProducts') || [];
    if (recentlyViewedProducts) {
        recentlyViewedProducts = JSON.parse(recentlyViewedProducts);
    }
    return (
        <>
            {recentlyViewedProducts && (
                <div className="carousel-wrapper">
                    <h2 className="carousel-title">Đã xem gần đây</h2>
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation
                        // spaceBetween={10}
                        slidesPerView={5}
                        loop={true}
                        autoplay={false}
                        onSwiper={(swiper) => swiper.update()}
                    >
                        {recentlyViewedProducts.map((item, index) => (
                            <SwiperSlide key={index}>
                                <ProductItem item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </>
    );
}

export default CarouselCards;
