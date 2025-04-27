import './index.scss'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import bannerTopHomePage from '~/data/bannerTopHomePage';
import hotProductsHomePage from '~/data/hotProductsHomePage';
import ProductItemCategory from '~/components/Layouts/components/ProductItemCategory/ProductItemCategory';
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
function Home() {
    return (
        <div className="home-container">
            <div className="banner-top-container">
                <Swiper
                    modules={[Navigation, Autoplay, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={10}
                    slidesPerView={2}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    onSwiper={(swiper) => swiper.update()}
                    className="banner-top-swiper"
                >
                    {bannerTopHomePage.map((banner) => (
                        <SwiperSlide key={banner.id}>
                            <img className="banner-img" src={banner.images[0].url} alt={banner.images[0].alt} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="hotProducts-homePage-container">
                    {hotProductsHomePage.map((item) => (
                        <div key={item.id} className="hot-products">
                            <a href={item.href}>
                                <div className="hot-item-container">
                                    <img
                                        className="hot-item-img"
                                        src={item.images[0].url}
                                        alt={item.images[0].alt}
                                    />
                                </div>
                                <h6 className="hot-item-title">{item.title}</h6>
                            </a>
                        </div>
                    ))}
                </div>

            {/*items 1*/}
            <div className="section-product-itemsCategory">
                <div className="banner-item">
                    <img className="banner-item-img"
                         src="https://file.hstatic.net/1000230347/file/36-37_banner_1920x600.webp" alt="" />
                </div>
                <div className="product-itemsCategory">
                    <ProductItemCategory categoryID="1" />
                </div>
                <div className="btn_wrapper">
                    <Button className="toggle_btn">
                        Xem tất cả <KeyboardArrowRightIcon/>
                    </Button>
                </div>

            </div>

            {/*items 2*/}
            <div className="section-product-itemsCategory">
                <div className="banner-item">
                    <img className="banner-item-img"
                         src="https://file.hstatic.net/1000230347/file/17_banner_1920x600_96f19667be5e47ef896b34a5f59ece12.png"
                         alt="" />
                </div>
                <div className="product-itemsCategory">
                    <ProductItemCategory categoryID="2" />
                </div>
                <div className="btn_wrapper">
                    <Button className="toggle_btn">
                        Xem tất cả <KeyboardArrowRightIcon />
                    </Button>
                </div>
            </div>

            {/*items 3*/}
            <div className="section-product-itemsCategory">
                <div className="banner-item">
                    <img className="banner-item-img"
                         src="https://file.hstatic.net/1000230347/file/15-16_banner_1920x600.webp" alt="" />
                </div>

                <div className="title-product-container">
                    <h6 className="title-item">
                       <a href="#"> MỸ THUẬT </a>
                    </h6>
                    <div className="item-cate-list">
                        <div className="item-cate cate-1">Sản phẩm HOT</div>
                        <div className="item-cate">Bút lông màu</div>
                        <div className="item-cate">Sáp màu</div>
                        <div className="item-cate">Màu nước</div>
                        <div className="item-cate">Sáp nặn</div>
                    </div>
                </div>

                <div className="product-itemsCategory">
                    <ProductItemCategory categoryID="3" />
                </div>

                <div className="btn_wrapper">
                    <Button className="toggle_btn">
                        Xem tất cả <KeyboardArrowRightIcon />
                    </Button>
                </div>
            </div>

            {/*items 4*/}
            <div className="section-product-itemsCategory">
                <div className="banner-item">
                    <img className="banner-item-img"
                         src="https://file.hstatic.net/1000230347/file/27_banner_1920x600.png" alt="" />
                </div>

                <div className="title-product-container">
                    <h6 className="title-item">
                        <a href="#"> BÚT VIẾT CAO CẤP </a>
                    </h6>
                    <div className="item-cate-list">
                        <div className="item-cate cate-1">Parker</div>
                        <div className="item-cate">Bizner</div>
                    </div>
                </div>

                <div className="product-itemsCategory">
                    <ProductItemCategory categoryID="4" />
                </div>
                <div className="btn_wrapper">
                    <Button className="toggle_btn">
                        Xem tất cả <KeyboardArrowRightIcon />
                    </Button>
                </div>
            </div>

            {/*items 5*/}
            <div className="section-product-itemsCategory">
                <div className="banner-item">
                    <img className="banner-item-img"
                         src="https://file.hstatic.net/1000230347/file/37-40_banner_1920x600.webp" alt="" />
                </div>
                <div className="product-itemsCategory">
                    <ProductItemCategory categoryID="5" />
                </div>
                <div className="btn_wrapper">
                    <Button className="toggle_btn">
                        Xem tất cả <KeyboardArrowRightIcon />
                    </Button>
                </div>
            </div>

            {/*items 6*/}
            <div className="section-product-itemsCategory">
                <div className="banner-item">
                    <img className="banner-item-img"
                         src="https://file.hstatic.net/1000230347/file/2afbf3b5-ae3e-44f0-a060-f13045be3255.png"
                         alt="" />
                </div>

                <div className="title-product-container">
                    <h6 className="title-item">
                        <a href="#"> BÚT VIẾT </a>
                    </h6>
                    <div className="item-cate-list">
                        <div className="item-cate cate-1">Bút Bi</div>
                        <div className="item-cate">Bút Gel</div>
                        <div className="item-cate">Bút chì</div>
                        <div className="item-cate">Bút dạ quang</div>
                        <div className="item-cate">Bút xóa</div>
                    </div>
                </div>

                <div className="product-itemsCategory">
                    <ProductItemCategory categoryID="6" />
                </div>
                <div className="btn_wrapper">
                    <Button className="toggle_btn">
                        Xem tất cả <KeyboardArrowRightIcon />
                    </Button>
                </div>
            </div>

            {/*items 7*/}
            <div className="section-product-itemsCategory">
                <div className="banner-item">
                    <img className="banner-item-img"
                         src="https://file.hstatic.net/1000230347/file/33-34_banner_1920x600.webp" alt="" />
                </div>
                <div className="product-itemsCategory">
                    <ProductItemCategory categoryID="7" />
                </div>
                <div className="btn_wrapper">
                    <Button className="toggle_btn">
                        Xem tất cả <KeyboardArrowRightIcon />
                    </Button>
                </div>
            </div>

            {/*items 8*/}
            <div className="section-product-itemsCategory">
                <div className="banner-item">
                    <img className="banner-item-img"
                         src="https://file.hstatic.net/1000230347/file/36_banner_1920x600.webp" alt="" />
                </div>

                <div className="title-product-container">
                    <h6 className="title-item">
                        <a href="#"> KHO SÁCH - NÂNG TẦM TRI THỨC </a>
                    </h6>
                    <div className="item-cate-list">
                        <div className="item-cate cate-1">Sách học Anh văn</div>
                        <div className="item-cate">Sách kĩ năng</div>
                        <div className="item-cate">Sách TA Mai Lan Hương</div>
                        <div className="item-cate">Sách tiếng Anh</div>
                    </div>
                </div>

                <div className="product-itemsCategory">
                    <ProductItemCategory categoryID="7" />
                </div>
                <div className="btn_wrapper">
                    <Button className="toggle_btn">
                        Xem tất cả <KeyboardArrowRightIcon />
                    </Button>
                </div>
            </div>

        </div>
    );
}

export default Home;