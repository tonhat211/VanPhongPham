import React from "react";
import './ProductsBrands.scss'
import InputCheckBox from "../inputCheckBox/InputCheckBox";
function ProductsBrands({handleChange}) {
    const brandsOptions = [
        {classnames: "bizner", value: "bizner", title: "Bizner"},
        {classnames: "thienLong", value: "thienLong", title: "Thiên Long"},
        {classnames: "colokit", value: "colokit", title: "Colokit"},
        {classnames: "ikCopy", value: "ikCopy", title: "IK Copy"},
        {classnames: "others", value: "others", title: "Khác"},
    ];

    return (
        <div className="productsBrands_container">
            <h2> THƯƠNG HIỆU</h2>
            <div className="checkbox_wrap">

                <label className="label_sidebar">
                    <input type="checkbox" className="allBrands" name="brands" value="all" onChange={handleChange}/>
                    <span className="choose"> </span> Tất cả
                </label>

                {brandsOptions.map((brands) => (
                    <InputCheckBox
                        key={brands.value}
                        classnames={brands.classnames}
                        name="brands"
                        value={brands.value}
                        title={brands.title}
                        handleChange={handleChange}
                    />
                ))}
            </div>

        </div>
    );
}
export default ProductsBrands;