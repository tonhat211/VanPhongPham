import Header from '~/components/Layouts/components/Header';
import './RegisterLayout.scss';
import Footer from '~/components/Layouts/components/Footer';
import RegisterPages from '~/pages/registerPages';
import { useFEContext } from '~/context/FEProvider';
import Sidebar from '../components/Sidebar';

function RegisterLayout() {
    const { isSidebarOpen } = useFEContext();

    return (
        <div>
            <Header />
            <div className="register-layout-container">
                {isSidebarOpen && <Sidebar />}
                <RegisterPages />
            </div>
            <Footer />
        </div>
    );
}
export default RegisterLayout;
