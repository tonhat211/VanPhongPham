import footerStyles from "./Footer.scss"
import brandsSliderImgs from "~/assets/images/imgBrands/BrandsSliderImgs";
import midFooterImgs from "~/assets/images/ImgsmidFooter/midFooterImgs";
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import images from '~/assets/images';
function Footer() {
    return  (
        <div className="container-footer">
            {/* Slider*/}
            <div className="brand-slider-wrapper">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={5}
                    navigation
                    loop={true}
                    autoplay={false}
                    className="brand-swiper"
                    breakpoints={{
                        320: { slidesPerView: 2 },
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                    }}
                >
                    {brandsSliderImgs.map((brand) => (
                        <SwiperSlide key={brand.id}>
                            <img
                                src={brand.images[0].url}
                                alt={brand.images[0].alt || `Brand ${brand.id}`}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* End Slider*/}
            {/* middle-footer*/}
            <div className="middle-footer-wrapper">
                <div className="payment-med-wrap">
                    <div className="mail-register">
                        <p className="payment-title">Đăng kí nhận bản tin</p>
                        <div className="form-res">
                            <form acceptCharset="UTF-8" action="/account/contact" className="contact-form"
                                  method="post">
                                <div className="input-group">
                                    <input className="form-control" type="email" placeholder="Nhập địa chỉ email" />
                                    <button className="sub-action">Đăng kí</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="cert">
                        <p className="payment-title">Chứng nhận</p>
                        <a href="#">
                            <img src={images.footer_bct} />
                        </a>
                    </div>

                    <div className="payment-med">
                        <p className="payment-title">
                            phương thức thanh toán
                        </p>
                        <div className="payment-med-pic">
                            {midFooterImgs.map((item) =>
                                item.images.map((img, idx) => (
                                    <a
                                        href={img.href || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        key={`${item.id}-${idx}`}
                                    >
                                        <img className="payment-icon" src={img.url} alt={img.alt || "payment-icon"} />
                                    </a>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* End middle-footer*/}
            {/* sitemap-footer*/}
            <div className="sitemap-footer">
                <footer className="custom-footer">
                    <section className="footer-section">
                        <div className="footer-container">
                            <div className="footer-col">
                                <div className="footer-logo">
                                    <img className="img-fluid" src={images.logo} alt="Thiên Long" />
                                </div>
                                <p className="company-info ">
                                    <strong>Thienlong.vn - Website thương mại điện tử thuộc Tập đoàn Thiên Long</strong>
                                    <br />
                                    Công ty Cổ Phần Tập Đoàn Thiên Long

                                    GPĐKKD số 0301464830 do Sở KHĐT TP. Hồ Chí Minh cấp ngày 14/03/2005.
                                </p>
                            </div>

                            <div className="footer-col">
                                <h6 className="footer-title">ĐỊA CHỈ CÔNG TY</h6>
                                <p>
                                    <strong>Head Office:</strong> Tầng 10, Sofic Tower, Số 10 Đường Mai Chí Thọ,
                                    Phường Thủ Thiêm, Thành Phố Thủ Đức, Thành Phố Hồ Chí Minh, Việt Nam
                                </p>
                                <p>
                                    <strong>Miền Bắc:</strong>  Số 38, đường Gamuda Gardens 2-5, Khu đô thị mới C2
                                    - Gamuda Gardens, Phường Trần Phú, Quận Hoàng Mai,
                                    Thành phố Hà Nội, Việt Nam.
                                </p>
                            </div>

                            <div className="footer-col">
                                <h6 className="footer-title">HỖ TRỢ KHÁCH HÀNG</h6>
                                <p><strong style={{ color: 'black' }}>Hotline: 1900 866 819</strong></p>
                                <p><strong style={{ color: 'black' }}>Thứ 2 - Thứ 6 (8h - 17h)</strong></p>
                                <p><strong style={{ color: 'black' }}>salesonline@thienlongvn.com</strong></p>
                                <p>Hướng dẫn mua hàng</p>
                                <p>Hướng dẫn thanh toán</p>
                                <p>Chính sách giao hàng</p>
                                <p>Chính sách đổi trả & hoàn tiền</p>
                            </div>

                            <div className="footer-col">
                                <h6 className="footer-title">VỀ THIENLONG.VN</h6>
                                <p>Giới thiệu</p>
                                <p>Dịch vụ in ấn quảng cáo</p>
                                <p>Chính sách bảo mật chung</p>
                                <p>Chính sách bảo mật thông tin cá nhân</p>
                                <p>Thông tin liên hệ</p>
                            </div>
                        </div>
                    </section>

                    <div className="footer-bottom">
                        © 2021 Copyright - Bản quyền thuộc Tập đoàn Thiên Long
                    </div>
                </footer>
            </div>
            {/* End sitemap-footer*/}
        </div>
    );
}

export default Footer;