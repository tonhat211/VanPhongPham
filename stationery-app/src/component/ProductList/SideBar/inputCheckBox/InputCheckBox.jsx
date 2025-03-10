import React from 'react';
import './InputCheckBox.scss'
function InputCheckBox({classnames, name, categogyID,value, handleChange, title}) {

    return (
        <label className={`label_sidebar`}>
            <input className={classnames} type="checkbox"  categogyID={categogyID} name={name}
                   value={value} onChange={handleChange} />
            <span className="choose"> </span>  {title}
        </label>
    );
}
export default InputCheckBox;