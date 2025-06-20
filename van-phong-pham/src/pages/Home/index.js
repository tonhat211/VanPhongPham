import './index.scss'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import bannerTopHomePage from '~/assets/images/bannerTopHomeImgs/bannerTopHomePage';
import hotProductsHomePageRaw from '~/assets/images/imgsHotProductsHome/hotProductsHomePage';
import ProductItemCategory from '~/components/Layouts/components/ProductItemCategory/ProductItemCategory';
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import images from '~/assets/images';
import useI18n from '~/hooks/useI18n';
function Home() {
    const { t, lower } = useI18n();
    const hotProductsHomePage = hotProductsHomePageRaw.map((item, index) => ({
        ...item,
        title: t(`hot-sections.${index}`),
    }));
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
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        992: {
                            slidesPerView: 1,
                        },
                        1200: {
                            slidesPerView: 2,
                        },
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
                         src={images.banneri1} alt="" />
                </div>
                <div className="product-itemsCategory">
                    <ProductItemCategory categoryID="1" />
                </div>
                <div className="btn_wrapper">
                    <Button className="toggle_btn">
                        {t('all-view')} <KeyboardArrowRightIcon/>
                    </Button>
                </div>

            </div>

            {/*items 2*/}
            <div className="section-product-itemsCategory">
                <div className="banner-item">
                    <img className="banner-item-img"
                         src={images.banneri2} alt="" />
                </div>
                <div className="product-itemsCategory">
                    <ProductItemCategory categoryID="2" />
                </div>
                <div className="btn_wrapper">
                    <Button className="toggle_btn">
                        {t('all-view')} <KeyboardArrowRightIcon />
                    </Button>
                </div>
            </div>

            {/*items 3*/}
            <div className="section-product-itemsCategory">
                <div className="banner-item">
                    <img className="banner-item-img"
                         src={images.banneri3} alt="" />
                </div>

                <div className="title-product-container">
                    <h6 className="title-item">
                       <a href="#"> {t('categories.3')} </a>
                    </h6>
                    <div className="item-cate-list">
                        <div className="item-cate cate-1">{t('category-3.hot')}</div>
                        <div className="item-cate">{t('category-3.pen-color')}</div>
                        <div className="item-cate">{t('category-3.crayon')}</div>
                        <div className="item-cate">{t('category-3.water-color')}</div>
                        <div className="item-cate">{t('category-3.clay')}</div>
                    </div>
                </div>

                <div className="product-itemsCategory">
                    <ProductItemCategory categoryID="3" />
                </div>

                <div className="btn_wrapper">
                    <Button className="toggle_btn">
                        {t('all-view')} <KeyboardArrowRightIcon />
                    </Button>
                </div>
            </div>

            {/*items 4*/}
            <div className="section-product-itemsCategory">
                <div className="banner-item">
                    <img className="banner-item-img"
                         src={images.banneri4} alt="" />
                </div>

                <div className="title-product-container">
                    <h6 className="title-item">
                        <a href="#"> {t('categories.4')} </a>
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
                        {t('all-view')} <KeyboardArrowRightIcon />
                    </Button>
                </div>
            </div>

            {/*items 5*/}
            <div className="section-product-itemsCategory">
                <div className="banner-item">
                    <img className="banner-item-img"
                         src={images.banneri5} alt="" />
                </div>
                <div className="product-itemsCategory">
                    <ProductItemCategory categoryID="5" />
                </div>
                <div className="btn_wrapper">
                    <Button className="toggle_btn">
                        {t('all-view')} <KeyboardArrowRightIcon />
                    </Button>
                </div>
            </div>

            {/*items 6*/}
            <div className="section-product-itemsCategory">
                <div className="banner-item">
                    <img className="banner-item-img"
                         src={images.banneri6} alt="" />
                </div>

                <div className="title-product-container">
                    <h6 className="title-item">
                        <a href="#"> {t('categories.6')}  </a>
                    </h6>
                    <div className="item-cate-list">
                        <div className="item-cate cate-1">{t('category-6.pen-ball')}</div>
                        <div className="item-cate">{t('category-6.pen-gel')}</div>
                        <div className="item-cate">{t('category-6.pencil')}</div>
                        <div className="item-cate">{t('category-6.highlighter')}</div>
                        <div className="item-cate">{t('category-6.pen-correction')}</div>
                    </div>
                </div>

                <div className="product-itemsCategory">
                    <ProductItemCategory categoryID="6" />
                </div>
                <div className="btn_wrapper">
                    <Button className="toggle_btn">
                        {t('all-view')} <KeyboardArrowRightIcon />
                    </Button>
                </div>
            </div>

            {/*items 7*/}
            <div className="section-product-itemsCategory">
                <div className="banner-item">
                    <img className="banner-item-img"
                         src={images.banneri7} alt="" />
                </div>
                <div className="product-itemsCategory">
                    <ProductItemCategory categoryID="7" />
                </div>
                <div className="btn_wrapper">
                    <Button className="toggle_btn">
                        {t('all-view')} <KeyboardArrowRightIcon />
                    </Button>
                </div>
            </div>

            {/*items 8*/}
            <div className="section-product-itemsCategory">
                <div className="banner-item">
                    <img className="banner-item-img"
                         src={images.banneri8} alt="" />
                </div>

                <div className="title-product-container">
                    <h6 className="title-item">
                        <a href="#"> {t('categories.8')} </a>
                    </h6>
                    <div className="item-cate-list">
                        <div className="item-cate cate-1"> {t('category-8.english-study')}</div>
                        <div className="item-cate">{t('category-8.skills')}</div>
                        <div className="item-cate">{t('category-8.mai-lan-huong')}</div>
                        <div className="item-cate">{t('category-8.english-book')}</div>
                    </div>
                </div>

                <div className="product-itemsCategory">
                    <ProductItemCategory categoryID="7" />
                </div>
                <div className="btn_wrapper">
                    <Button className="toggle_btn">
                        {t('all-view')} <KeyboardArrowRightIcon />
                    </Button>
                </div>
            </div>

        </div>
    );
}

export default Home;