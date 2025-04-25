import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import classNames from 'classnames/bind';

import styles from './CusomInput.module.scss';
const cx = classNames.bind(styles);

const CustomInput = ({ value, onChange, label, type = "text", required, className="",onClick}) => {
    const handleClear = () => {
        onChange({ target: { value: "" } });
    };
    return (
        <div className={classNames(cx('input-custom'),(className))}>
            <div className={cx('input-content',{ 'has-value': value })}>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    onClick={onClick}
                    required={required}
                />
                <label>{label}</label>
            </div>
            {value && (
                <i className="btn" onClick={handleClear}>
                <FontAwesomeIcon icon={faCircleXmark} />
            </i>
            )}
            
        </div>
    );
};

export default CustomInput;
