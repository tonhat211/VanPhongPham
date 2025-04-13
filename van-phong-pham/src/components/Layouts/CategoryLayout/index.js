import Header from '../components/Header';
import Footer from '../components/Footer/Footer';
import Sidebar from '~/components/Layouts/components/Sidebar';

function CategoryLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="breadcrumb">breadcrumb</div>
            <div className="container">
                <Sidebar />
                <div className="content">{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default CategoryLayout;
