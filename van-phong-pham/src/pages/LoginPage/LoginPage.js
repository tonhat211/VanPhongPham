import { useState } from 'react';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import './LoginPage.scss'
function LoginPage() {
    const [mode, setMode] = useState('login');

    const renderLoginForm = () => (
        <>
            <h4>Đăng nhập</h4>
            <form className="login-form">
                <div className="form-group">
                    <label>Email <span> *</span></label>
                    <input type="email" placeholder="Nhập Email" />
                </div>
                <div className="form-group">
                    <label>Mật khẩu <span> *</span></label>
                    <input type="password" placeholder="Nhập Mật khẩu" />
                </div>
                <button type="submit" className="submit-btn">Đăng nhập</button>
            </form>

            <div className="account-login-container">
                <p className="account-title">
                    Quên mật khẩu? Nhấn vào
                    <a onClick={() => setMode('reset')}> đây </a>
                </p>
                <p className="account-title">Hoặc đăng nhập bằng</p>
                <div className="account-gg-fb">
                    <Button className="account-gg"> <GoogleIcon style={{ fontSize: 20 }} /> Google</Button>
                    <Button className="account-fb"> <FacebookRoundedIcon style={{ fontSize: 20 }} /> Facebook</Button>
                </div>
                <p className="account-title">
                    Bạn chưa có tài khoản?
                    <a> Đăng ký tại đây </a>
                </p>
            </div>
        </>
    );

    const renderResetForm = () => (
        <>
            <h4>ĐẶT LẠI MẬT KHẨU</h4>
            <p className="reset-text">Chúng tôi sẽ gửi cho bạn một email để kích hoạt việc đặt lại mật khẩu.</p>
            <form className="reset-form">
                <div className="form-group">
                    <label>Email <span> *</span> </label>
                    <input type="email" placeholder="Email" />
                </div>
                <button type="submit" className="submit-btn yellow-btn">Lấy lại mật khẩu</button>
            </form>

            <div className="account-login-container">
            <p className="back-link">
                <a onClick={() => setMode('login')}>Quay lại</a>
            </p>
            <p className="account-title">Hoặc đăng nhập bằng</p>
            <div className="account-gg-fb">
                <Button className="account-gg"> <GoogleIcon style={{ fontSize: 20 }} /> Google</Button>
                <Button className="account-fb"> <FacebookRoundedIcon style={{ fontSize: 20 }} /> Facebook</Button>
            </div>
            <p className="account-title">
                Bạn chưa có tài khoản?
                <a> Đăng ký tại đây </a>
            </p>
            </div>
        </>
    );

    return (
        <div className="login-container">
            <div className="login-section">
                {mode === 'login' ? renderLoginForm() : renderResetForm()}
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

export default LoginPage;