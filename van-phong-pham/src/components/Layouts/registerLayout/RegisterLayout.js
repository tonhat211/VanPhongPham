import Header from '~/components/Layouts/components/Header';
import './RegisterLayout.scss'
import Footer from '~/components/Layouts/components/Footer';
import RegisterPages from '~/pages/registerPages';

function RegisterLayout() {
    return (
        <div>
            <Header />

            <div className='register-layout-container'>
                <RegisterPages />
            </div>
            <Footer />
        </div>
    );
}
export default RegisterLayout;