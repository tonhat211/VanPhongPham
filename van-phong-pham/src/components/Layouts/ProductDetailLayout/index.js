import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

function ProductDetailLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <Breadcrumb />
                <div className="content">{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetailLayout;
