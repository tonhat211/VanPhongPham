import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './ProductImageGallery.scss';
import productsData from '~/data/productData';

// function ProductImageGallery({ productId }) {
function ProductImageGallery({ images }) {
    // const product = productsData.find(item => item.id === productId);
    // const images = product.images;

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="product-gallery">
            <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mainSwiper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image.url} alt={image.url} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="thumbSwiper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image.url} alt={image.url} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default ProductImageGallery;
