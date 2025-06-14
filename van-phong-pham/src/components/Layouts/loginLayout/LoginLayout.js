import Header from '~/components/Layouts/components/Header';
import './LoginLayout.scss';
import Footer from '~/components/Layouts/components/Footer';
import LoginPage from '~/pages/LoginPage/LoginPage';
import { useFEContext } from '~/context/FEProvider';
import Sidebar from '../components/Sidebar';

function LoginLayout() {
    const { isSidebarOpen } = useFEContext();

    return (
        <div>
            <Header />

            <div className="login-layout-container">
                {isSidebarOpen && <Sidebar />}

                <LoginPage />
            </div>
            <Footer />
        </div>
    );
}
export default LoginLayout;
