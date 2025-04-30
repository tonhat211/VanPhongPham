import Header from '~/components/Layouts/components/Header';
import './LoginLayout.scss'
import Footer from '~/components/Layouts/components/Footer';
import LoginPage from '~/pages/LoginPage/LoginPage';

function LoginLayout() {
    return (
        <div>
            <Header />

            <div className='login-layout-container'>
                <LoginPage />
            </div>
            <Footer />
        </div>
    );
}
export default LoginLayout;