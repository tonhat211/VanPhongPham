import React, {memo} from 'react';
import './SliderStyles.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderImgs from "../../data/sliderBrandsImgs/sliderImgs";
function ImageSlider() {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        // autoplay: true,
        speed: 2000,
        // autoplaySpeed: 3000,
    };
    return (
        <div className="slider_brands">
        <div className="slider-container">
            <Slider {...settings}>
                {sliderImgs.map((imgSet) => (
                    <div className="imgs_wrap" key={imgSet.id}>
                        {imgSet.images.map((img, index) => (
                            <img className="img_other" key={index} src={img.url} alt={img.alt}/>
                        ))}
                    </div>
                ))}
            </Slider>
        </div>
        </div>
    );
}

export default memo(ImageSlider);