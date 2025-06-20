import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OtpVerificationPage.scss';
import { verifyCode } from '~/api/verifyCodeApi';
import { toast } from 'react-toastify';
import useI18n from '~/hooks/useI18n';
function OtpVerificationPage() {
    const { t, lower } = useI18n();
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";

    const handleVerify = async () => {
        if (!email) {
            toast.error(t('otp.noEmail'));
            return;
        }

        try {
            await verifyCode({ email, code: otp });
            toast.success(t('otp.success'));
            setTimeout(() => navigate("/login", { state: { email } }), 2000);
        } catch (err) {
            toast.error(t('otp.invalidCode'));
        }
    };

    return (
        <div className="otp-verification-container">
            <div className="otp-box">
                <h2 className="title">{t('otp.title')}</h2>
                <p className="description">{t('otp.desc')}</p>

                <input
                    type="text"
                    className="otp-input"
                    placeholder={t('otp.placeholder')}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />

                {error && <p className="error">{error}</p>}

                <button className="verify-button" onClick={handleVerify}>
                    {t('otp.verify')}
                </button>

                <p className="note"> {t('otp.note')}</p>
                <a href="/register">  {t('otp.back')} </a>
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
