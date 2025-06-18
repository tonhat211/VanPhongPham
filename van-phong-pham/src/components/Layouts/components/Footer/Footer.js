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
import useI18n from '~/hooks/useI18n';
function Footer() {
    const { t } = useI18n();
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
                        <p className="payment-title">{t('footer.subscribeTitle')}</p>
                        <div className="form-res">
                            <form acceptCharset="UTF-8" action="/account/contact" className="contact-form"
                                  method="post">
                                <div className="input-group">
                                    <input className="form-control" type="email" placeholder="Nhập địa chỉ email" />
                                    <button className="sub-action">{t('footer.subscribeButton')}</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="cert">
                        <p className="payment-title">{t('footer.certificate')}</p>
                        <a href="#">
                            <img src={images.footer_bct} />
                        </a>
                    </div>

                    <div className="payment-med">
                        <p className="payment-title">
                            {t('footer.paymentMethods')}
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
                                    <strong>{t('footer.companyInfoTitle')}</strong>
                                    <br />
                                    {t('footer.companyName')}<br />
                                    {t('footer.businessLicense')}
                                </p>
                            </div>

                            <div className="footer-col">
                                <h6 className="footer-title">{t('footer.addressTitle')}</h6>
                                <p>
                                    <strong>Head Office:</strong>  {t('footer.addressHeadOffice')}
                                </p>
                                <p>
                                    <strong>{t('footer.north')}:</strong> {t('footer.addressNorth')}
                                </p>
                            </div>

                            <div className="footer-col">
                                <h6 className="footer-title">{t('footer.supportTitle')}</h6>
                                <p><strong style={{ color: 'black' }}>{t('footer.hotline')}</strong></p>
                                <p><strong style={{ color: 'black' }}>{t('footer.workingTime')}</strong></p>
                                <p><strong style={{ color: 'black' }}>{t('footer.email')}</strong></p>
                                <p>{t('footer.guidePurchase')}</p>
                                <p>{t('footer.guidePayment')}</p>
                                <p>{t('footer.shippingPolicy')}</p>
                                <p>{t('footer.refundPolicy')}</p>
                            </div>

                            <div className="footer-col">
                                <h6 className="footer-title">{t('footer.aboutTitle')}</h6>
                                <p>{t('footer.aboutUs')}</p>
                                <p>{t('footer.printingService')}</p>
                                <p>{t('footer.privacyPolicy')}</p>
                                <p>{t('footer.personalDataPolicy')}</p>
                                <p>{t('footer.contactInfo')}</p>
                            </div>
                        </div>
                    </section>

                    <div className="footer-bottom">
                        {t('footer.copyright')}
                    </div>
                </footer>
            </div>
            {/* End sitemap-footer*/}
        </div>
    );
}

export default Footer;