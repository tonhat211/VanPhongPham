import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';

function CategoryLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <Breadcrumb />
                <div className="main-container">
                    <Sidebar />
                    <div className="content">{children}</div>
                </div>
            
            </div>
            <Footer />
        </div>
    );
}

export default CategoryLayout;
