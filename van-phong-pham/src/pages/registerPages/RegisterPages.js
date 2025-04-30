import './RegisterPages.scss'
import { useState } from 'react';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
function RegisterPages({children}) {
    const [customerType, setCustomerType] = useState('personal');
    return (
        <div className="register-page-container">
            <div className="register-section">
                <h4>Đăng ký</h4>
                <p>Bạn là khách hàng:</p>
                <div className="register-tabs">
                    <button
                        className={customerType === 'personal' ? 'active' : ''}
                        onClick={() => setCustomerType('personal')}
                    >
                        Khách hàng Cá nhân và Nội bộ Thiên Long
                    </button>
                    <button
                        className={customerType === 'business' ? 'active' : ''}
                        onClick={() => setCustomerType('business')}
                    >
                        Khách hàng Ưu tiên (Xuất hóa đơn)
                    </button>
                </div>

                <form className="register">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Họ <span>(*)</span></label>
                            <input placeholder="Họ" />
                        </div>
                        <div className="form-group">
                            <label>Tên <span>(*)</span></label>
                            <input placeholder="Tên" />
                        </div>
                    </div>

                    {customerType === 'business' && (
                        <>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Tên công ty <span>(*)</span></label>
                                    <input placeholder="Tên công ty" />
                                </div>
                                <div className="form-group">
                                    <label>Mã số thuế <span>(*)</span></label>
                                    <input placeholder="Mã số thuế" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Địa chỉ công ty <span>(*)</span></label>
                                    <input placeholder="Địa chỉ công ty" />
                                </div>
                                <div className="form-group">
                                    <label>Email công ty <span>(*)</span></label>
                                    <input placeholder="Email công ty" />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="form-row">
                        <div className="form-group">
                            <label>Email cá nhân <span>(*)</span></label>
                            <input placeholder="Email cá nhân" />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại <span>(*)</span></label>
                            <input placeholder="Số điện thoại" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>Mật khẩu <span>(*)</span></label>
                            <input type="password" placeholder="Mật khẩu" />
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">Đăng ký</button>
                </form>

                <div className="account-login-container">
                    <p className="account-title">Bạn đã có tài khoản
                       <a> Đăng nhập tại đây </a>
                    </p>
                    <div className="account-gg-fb">
                        <Button className="account-gg"> <GoogleIcon style={{ fontSize: 20 }}/> Google</Button>
                        <Button className="account-fb"> <FacebookRoundedIcon style={{ fontSize: 20 }} /> Facebook</Button>
                    </div>
                </div>

            </div>

            <ul className="bg-bubbles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>

        </div>
    );
}

export default RegisterPages;