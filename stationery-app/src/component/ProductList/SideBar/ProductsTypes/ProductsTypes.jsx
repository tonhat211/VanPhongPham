import React from 'react';
import './ProductsTypes.scss'
import InputCheckBox from "../inputCheckBox/InputCheckBox";
import categogy from '../../../../pages/homepage/categogy/categogy';

function ProductsTypes({handleChange}) {

    const typesOptions = [
        {classnames: "pens", categogyID :"2",value: "pens", title: "Bút"},
        {classnames: "books",categogyId :"5", value: "books", title: "Sách"},
        {classnames: "notes",categogyID :"4", value: "notes", title: "Sổ"},
        {classnames: "papers",categogyID :"1", value: "papers", title: "Giấy"},
        {classnames: "others",categogyID :"3", value: "others", title: "Khác"},
    ];

    return (
      <div className="productsType_container">
          <h2> Danh mục</h2>
<div className="checkbox_wrap">

    <label className="label_sidebar">
        <input type="checkbox" className="allTypes" name="types" value="all" onChange={handleChange}/>
        <span className="choose"> </span> Tất cả
    </label>

    {typesOptions.map((type) => (
        <InputCheckBox
            key={type.value}
            classnames={type.classnames}
            categogyID={type.categogyID}
            name="types"
            value={type.value}
            title={type.title}
            handleChange={handleChange}
        />
    ))}
</div>

      </div>
    );
}

export default ProductsTypes;