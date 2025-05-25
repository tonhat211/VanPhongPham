import './OtpVerificationLayout.scss'
import Header from '~/components/Layouts/components/Header';
import Footer from '~/components/Layouts/components/Footer';
import OtpVerificationPage from '~/pages/VerifyOTP/OtpVerificationPage';
function OtpVerificationLayout () {
    return (
    <div>
        <Header />
        <div className='otpVerification-layout-container'>
            <OtpVerificationPage />
        </div>
        <Footer />
    </div>
    );
}

export default OtpVerificationLayout;