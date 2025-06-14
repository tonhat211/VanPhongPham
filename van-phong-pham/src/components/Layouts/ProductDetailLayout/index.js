import Header from '../components/Header';
import Footer from '../components/Footer/Footer';
import ProductDetailPage from '~/pages/ProductDetails/ProductDetailPage';
import './index.scss';
import Sidebar from '../components/Sidebar';
import { useFEContext } from '~/context/FEProvider';
function ProductDetailLayout({ children }) {
    const { isSidebarOpen } = useFEContext();
    return (
        <div>
            <Header />
            <div className="product-detail-layout-container">
                {isSidebarOpen && <Sidebar />}

                {/*<div className='breadcrumb'>breadcrumb</div>*/}
                {/*<div className='content'>  */}
                {/*    {children}*/}
                {/*</div>*/}

                <ProductDetailPage />
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetailLayout;
