import React, {memo} from "react";
import './SliderPageStyles.scss'
import Slider from "../../component/SliderBrands/Slider";

function SliderPage() {

    return (
        <div className="sliderBrands_container">
        <Slider/>
        </div>
    );
}
export default memo(SliderPage);