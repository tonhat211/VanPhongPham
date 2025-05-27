import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OtpVerificationPage.scss';
import { verifyCode } from '~/api/verifyCodeApi';
import { toast } from 'react-toastify';
function OtpVerificationPage() {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";

    const handleVerify = async () => {
        if (!email) {
            toast.error("Không có email xác định.");
            return;
        }

        try {
            await verifyCode({ email, code: otp });
            toast.success("Xác minh Email thành công");
            setTimeout(() => navigate("/login", { state: { email } }), 2000);
        } catch (err) {
            toast.error("Mã OTP không hợp lệ hoặc đã hết hạn");
        }
    };

    return (
        <div className="otp-verification-container">
            <div className="otp-box">
                <h2 className="title">Xác minh Email</h2>
                <p className="description">Nhập mã OTP đã được gửi đến email của bạn.</p>

                <input
                    type="text"
                    className="otp-input"
                    placeholder="Nhập mã OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />

                {error && <p className="error">{error}</p>}

                <button className="verify-button" onClick={handleVerify}>
                    Xác minh
                </button>

                <p className="note">Mã OTP sẽ hết hạn sau 30 phút.</p>
                <a href="/register"> Quay lại </a>
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

export default OtpVerificationPage;
