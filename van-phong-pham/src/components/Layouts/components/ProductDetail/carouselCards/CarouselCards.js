import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Product as ProductModel } from '~/models';
import images from '~/assets/images';
import './CarouselCards.scss'
import { ProductItem } from '~/pages/components';
function CarouselCards() {
    // du lieu demo
    const products = [
        new ProductModel(
            1,
            'Bút gel Quick Dry Thiên Long GEL-066 - Premium Tip - Vật liệu tái chế',
            15300,
            17000,
            10,
            images.product1,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            2,
            'Combo 20 Bút Gel Thiên Long Doraemon GEL-012/DO Nature - Mực tím - Phiên bản 2025',
            190300,
            220000,
            10,
            images.product2,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            3,
            'Bút mực gel khô nhanh - nét viết êm mượt Flexgel Thiên Long GEL-042 - Dành cho Văn Phòng Sinh Viên Học sinh',
            45300,
            67000,
            30,
            images.product3,
            864,
            4.6,
            600,
        ),

        new ProductModel(
            4,
            'Bút gel Quick Dry Thiên Long GEL-066 - Premium Tip - Vật liệu tái chế',
            15300,
            17000,
            10,
            images.product1,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            5,
            'Combo 20 Bút Gel Thiên Long Doraemon GEL-012/DO Nature - Mực tím - Phiên bản 2025',
            190300,
            220000,
            10,
            images.product2,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            6,
            'Bút mực gel khô nhanh - nét viết êm mượt Flexgel Thiên Long GEL-042 - Dành cho Văn Phòng Sinh Viên Học sinh',
            45300,
            67000,
            30,
            images.product3,
            864,
            4.6,
            600,
        ),
        new ProductModel(
            1,
            'Bút gel Quick Dry Thiên Long GEL-066 - Premium Tip - Vật liệu tái chế',
            15300,
            17000,
            10,
            images.product1,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            2,
            'Combo 20 Bút Gel Thiên Long Doraemon GEL-012/DO Nature - Mực tím - Phiên bản 2025',
            190300,
            220000,
            10,
            images.product2,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            3,
            'Bút mực gel khô nhanh - nét viết êm mượt Flexgel Thiên Long GEL-042 - Dành cho Văn Phòng Sinh Viên Học sinh',
            45300,
            67000,
            30,
            images.product3,
            864,
            4.6,
            600,
        ),

        new ProductModel(
            4,
            'Bút gel Quick Dry Thiên Long GEL-066 - Premium Tip - Vật liệu tái chế',
            15300,
            17000,
            10,
            images.product1,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            5,
            'Combo 20 Bút Gel Thiên Long Doraemon GEL-012/DO Nature - Mực tím - Phiên bản 2025',
            190300,
            220000,
            10,
            images.product2,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            6,
            'Bút mực gel khô nhanh - nét viết êm mượt Flexgel Thiên Long GEL-042 - Dành cho Văn Phòng Sinh Viên Học sinh',
            45300,
            67000,
            30,
            images.product3,
            864,
            4.6,
            600,
        ),
        new ProductModel(
            1,
            'Bút gel Quick Dry Thiên Long GEL-066 - Premium Tip - Vật liệu tái chế',
            15300,
            17000,
            10,
            images.product1,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            2,
            'Combo 20 Bút Gel Thiên Long Doraemon GEL-012/DO Nature - Mực tím - Phiên bản 2025',
            190300,
            220000,
            10,
            images.product2,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            3,
            'Bút mực gel khô nhanh - nét viết êm mượt Flexgel Thiên Long GEL-042 - Dành cho Văn Phòng Sinh Viên Học sinh',
            45300,
            67000,
            30,
            images.product3,
            864,
            4.6,
            600,
        ),

        new ProductModel(
            4,
            'Bút gel Quick Dry Thiên Long GEL-066 - Premium Tip - Vật liệu tái chế',
            15300,
            17000,
            10,
            images.product1,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            5,
            'Combo 20 Bút Gel Thiên Long Doraemon GEL-012/DO Nature - Mực tím - Phiên bản 2025',
            190300,
            220000,
            10,
            images.product2,
            864,
            4.6,
            600,
            'new',
        ),
        new ProductModel(
            6,
            'Bút mực gel khô nhanh - nét viết êm mượt Flexgel Thiên Long GEL-042 - Dành cho Văn Phòng Sinh Viên Học sinh',
            45300,
            67000,
            30,
            images.product3,
            864,
            4.6,
            600,
        ),
        new ProductModel(
            6,
            'Bút mực gel khô nhanh - nét viết êm mượt Flexgel Thiên Long GEL-042 - Dành cho Văn Phòng Sinh Viên Học sinh',
            45300,
            67000,
            30,
            images.product3,
            864,
            4.6,
            600,
        ),
        new ProductModel(
            6,
            'Bút mực gel khô nhanh - nét viết êm mượt Flexgel Thiên Long GEL-042 - Dành cho Văn Phòng Sinh Viên Học sinh',
            45300,
            67000,
            30,
            images.product3,
            864,
            4.6,
            600,
        ),
    ];
    return (
        <div className="carousel-wrapper">
            <h2 className="carousel-title">Sản phẩm nổi bật</h2>
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                // spaceBetween={10}
                slidesPerView={5}
                loop={true}
                autoplay={false}
                onSwiper={(swiper) => swiper.update()}
            >
                {products.map((item, index) => (
                    <SwiperSlide key={index}>
                            <ProductItem item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default CarouselCards;