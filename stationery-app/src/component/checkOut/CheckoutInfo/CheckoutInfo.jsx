import React, {useEffect, useState} from "react";
import './CheckoutInfoStyles.scss'
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function CheckoutInfo() {
    const [formState, setFormState] = useState({
        name: '',
        phone: '',
        address: '',
        province: '',
        district: '',
        ward: ''
    });

    const [districtOptions, setDistrictOptions] = useState([]);
    const [wardOptions, setWardOptions] = useState([]);

    const districts = {
        'Province 1': ['Quận Hoàn Kiếm'],
        'Province 2': ['Quận Lê Chân'],
        'Province 3': ['Huyện Hoằng Hóa'],
        'Province 4': ['Huyện Quỳnh Lưu'],
        'Province 5': ['Huyện Nghi Xuân'],
        'Province 6': ['Quận Hải Châu'],
        'Province 7': ['Huyện Sơn Tịnh'],
        'Province 8': ['Thành phố Quy Nhơn'],
        'Province 9': ['Thành phố Nha Trang'],
        'Province 10': ['Thành phố Đà Lạt'],
        'Province 11': ['Quận 1'],
        'Province 12': ['Thành phố Cao Lãnh'],
        'Province 13': ['Thành phố Long Xuyên'],
        'Province 14': ['Thành phố Bến Tre'],
        'Province 15': ['Thành phố Sóc Trăng']
    };

    const wards = {
        'Quận Hoàn Kiếm': ['Phường Hàng Bạc'],
        'Quận Lê Chân': ['Phường Dư Hàng Kênh'],
        'Huyện Hoằng Hóa': ['Xã Hoằng Lộc'],
        'Huyện Quỳnh Lưu': ['Xã Quỳnh Bá'],
        'Huyện Nghi Xuân': ['Xã Xuân Thành'],
        'Quận Hải Châu': ['Phường Hải Châu 1'],
        'Huyện Sơn Tịnh': ['Xã Tịnh An'],
        'Thành phố Quy Nhơn': ['Phường Trần Phú'],
        'Thành phố Nha Trang': ['Phường Lộc Thọ'],
        'Thành phố Đà Lạt': ['Phường 1'],
        'Quận 1': ['Phường Bến Nghé'],
        'Thành phố Cao Lãnh': ['Phường 1'],
        'Thành phố Long Xuyên': ['Phường Mỹ Long'],
        'Thành phố Bến Tre': ['Phường 1'],
        'Thành phố Sóc Trăng': ['Phường 1']
    };

    useEffect(() => {
        setDistrictOptions(districts[formState.province] || []);
        setFormState(prevState => ({
            ...prevState,
            district: '',
            ward: ''
        }));
    }, [formState.province]);

    useEffect(() => {
        setWardOptions(wards[formState.district] || []);
        setFormState(prevState => ({
            ...prevState,
            ward: ''
        }));
    }, [formState.district]);
    // useEffect(() => {
    //     onUserInfoChange(formState);
    // }, [formState, onUserInfoChange]);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormState({...formState, [name]: value});
    };
    return (
        <div className="checkOutInfo_main">
            <div className="checkOutInfo_header">
                
                <ul className="sumary_header">
                    <li className="item"><a href=""> Giỏ hàng </a></li>
                    <li className="item"> Thông tin giao hàng</li>
                    <li className="lastitem"> Phương thức thanh toán</li>
                </ul>
            </div>

            <div className="checkOutInfo_form">

                <div className="checkOutForm_container">
                    <h2 className="form_title">Thông tin giao hàng</h2>
                 

                    <div className="form_info">
                        <div className="info_input">
                            <input
                                className="filled_input"
                                type="text"
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                placeholder=" "
                            />
                            <label className={`input_label ${formState.name ? 'shrink' : ''}`}>Họ và tên</label>
                        </div>
                        <div className="info_input">
                            <input
                                className="filled_input"
                                type="text"
                                name="phone"
                                value={formState.phone}
                                onChange={handleChange}
                                placeholder=" "
                            />
                            <label className={`input_label ${formState.phone ? 'shrink' : ''}`}>Số điện thoại</label>
                        </div>
                        <div className="info_input">
                            <input
                                className="filled_input"
                                type="text"
                                name="address"
                                value={formState.address}
                                onChange={handleChange}
                                placeholder=" "
                            />
                            <label className={`input_label ${formState.address ? 'shrink' : ''}`}>Địa chỉ</label>
                        </div>
                        <div className="info_area">
                            <div className="info_input">
                                <select
                                    className="filled_input"
                                    name="province"
                                    value={formState.province}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled hidden></option>
                                    <option value="Province 1">Hà Nội</option>
                                    <option value="Province 2">Hải Phòng</option>
                                    <option value="Province 3">Thanh Hóa</option>
                                    <option value="Province 4">Nghệ An</option>
                                    <option value="Province 5">Hà Tĩnh</option>
                                    <option value="Province 6">Đà Nẵng</option>
                                    <option value="Province 7">Quảng Ngãi</option>
                                    <option value="Province 8">Bình Định</option>
                                    <option value="Province 9">Khánh Hòa</option>
                                    <option value="Province 10">Lâm Đồng</option>
                                    <option value="Province 11">Tp Hồ Chí Minh</option>
                                    <option value="Province 12">Đồng Tháp</option>
                                    <option value="Province 13">An Giang</option>
                                    <option value="Province 14">Bến Tre</option>
                                    <option value="Province 15">Sóc Trăng</option>
                                </select>
                                <label className={`input_label ${formState.province ? 'shrink' : ''}`}>Tỉnh/Thành
                                    phố</label>
                            </div>
                            <div className="info_input">
                                <select
                                    className="filled_input"
                                    name="district"
                                    value={formState.district}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled hidden></option>
                                    {districtOptions.map((district, index) => (
                                        <option key={index} value={district}>{district}</option>
                                    ))}
                                </select>
                                <label
                                    className={`input_label ${formState.district ? 'shrink' : ''}`}>Quận/Huyện</label>
                            </div>
                            <div className="info_input">
                                <select
                                    className="filled_input"
                                    name="ward"
                                    value={formState.ward}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled hidden></option>
                                    {wardOptions.map((ward, index) => (
                                        <option key={index} value={ward}>{ward}</option>
                                    ))}
                                </select>
                                <label className={`input_label ${formState.ward ? 'shrink' : ''}`}>Xã/Phường</label>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default CheckoutInfo;