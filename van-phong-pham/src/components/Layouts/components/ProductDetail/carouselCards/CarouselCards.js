import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Product as ProductModel } from '~/models';
import images from '~/assets/images';
import './CarouselCards.scss';
import { ProductItem } from '~/pages/components';
import useI18n from '~/hooks/useI18n';
function CarouselCards() {
    const { t, lower } = useI18n();
    // du lieu demo
    let recentlyViewedProducts = localStorage.getItem('recentlyViewedProducts') || [];
    if (recentlyViewedProducts) {
        recentlyViewedProducts = JSON.parse(recentlyViewedProducts);
    }
    return (
        <>
            {recentlyViewedProducts && (
                <div className="carousel-wrapper">
                    <h2 className="carousel-title">{t('carousel.recentlyViewed')}</h2>
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation
                        // spaceBetween={10}
                        slidesPerView={6}
                        loop={true}
                        autoplay={false}
                        spaceBetween={16}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            576: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            992: {
                                slidesPerView: 4,
                            },
                            1024: {
                                slidesPerView: 6,
                            },
                        }}

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
