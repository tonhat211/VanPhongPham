import React from 'react';
import './Input.scss'
function Input({classnames, name, value, handleChange, title}) {

    return (
        <label className={`label_sidebar ${classnames}`}>
            <input className={classnames} type="radio" name={name} value={value} onChange={handleChange} />
            <span className="choose"> </span>  {title}
        </label>
    );
}
export default Input;