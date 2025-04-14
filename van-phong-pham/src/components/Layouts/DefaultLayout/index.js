import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="main-container">
                    <Sidebar />
                    <div className="content">{children}</div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
