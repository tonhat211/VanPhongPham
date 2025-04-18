import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb';

function ProductLayout({children}) {
    return (
        <div>
            <Header />
            <div className="container">
                <Breadcrumb />
                <div className="main-container">
                    <div className="content">{children}</div>
                </div>
            
            </div>
            <Footer />
        </div>
    );
}

export default ProductLayout;