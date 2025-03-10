import React from "react";
import './ProductPrices.scss';
import Input from "../input/Input";

function ProductPrices({handleChange}) {

    const pricesOptions = [
        {classnames: "under_100k", value: "under_100k", title: "Giá dưới 100.000đ"},
        {classnames: "100k_300k", value: "100k_300k", title: "100.000đ - 300.000đ"},
        {classnames: "300k_500k", value: "300k_500k", title: "300.000đ - 500.000đ"},
        {classnames: "over_500k", value: "over_500k", title: "Giá trên 500.000đ"},
    ];

    return (

        <div className="productsPrices_container">
            <h2> MỨC GIÁ</h2>

            <label className="label_sidebar">
                <input type="radio" className="allPrices" name="pricesType" value="all" onChange={handleChange}/>
                <span className="choose"> </span> Tất cả
            </label>

            {pricesOptions.map((prices) => (
                <Input
                    key={prices.value}
                    classnames={prices.classnames}
                    name="pricesType"
                    value={prices.value}
                    title={prices.title}
                    handleChange={handleChange}
                />
            ))}

            {/*<Input className="" name="pricesType" value="under_100k" title="Giá dưới 100.000đ" handleChange={handleChange}/>*/}
            {/*<Input className="" name="pricesType" value="100k_300k" title="100.000đ - 300.000đ" handleChange={handleChange}/>*/}
            {/*<Input className="" name="pricesType" value="300k_500k" title="300.000đ - 500.000đ" handleChange={handleChange}/>*/}
            {/*<Input className="" name="pricesType" value="over_500k" title="Giá trên 500.000đ" handleChange={handleChange}/>*/}


        </div>
    );
}

export default ProductPrices;