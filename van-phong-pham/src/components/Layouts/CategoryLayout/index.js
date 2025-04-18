import Header from '../components/Header';
// <<<<<<< HEAD
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';
// =======
// import Footer from '../components/Footer/Footer';
// import Sidebar from '~/components/Layouts/components/Sidebar';
// >>>>>>> main

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
