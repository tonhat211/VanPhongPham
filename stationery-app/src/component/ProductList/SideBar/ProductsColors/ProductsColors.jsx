import React from "react";
import './ProductsColors.css'
import Input from "../input/Input";

function ProductsColors({handleChange}) {

    const colorOptions = [
        { classnames: "redcolors", value: "red", title: "Đỏ" },
        { classnames: "blackcolors", value: "black", title: "Đen" },
        { classnames: "yellowcolors", value: "yellow", title: "Vàng" },
        { classnames: "greencolors", value: "green", title: "Xanh lá" },
        { classnames: "pinkcolors", value: "pink", title: "Hồng" },
        { classnames: "bluecolors", value: "blue", title: "Xanh nước" },
    ];
    return (
        <div className="productsColors_container">
            <h2>MÀU SẮC</h2>

            <div className="colors_wrap">
                <label className="label_sidebar allcolors">
                    <input type="radio" className="allcolors" name="colorsType" value="all" onChange={handleChange} />
                    <span className="choose"> </span> Tất cả
                </label>

                {colorOptions.map((color) => (
                    <Input
                        key={color.value}
                        classnames={color.classnames}
                        name="colorsType"
                        value={color.value}
                        title={color.title}
                        handleChange={handleChange}
                    />
                ))}

            </div>

        </div>
    );
}

export default ProductsColors;