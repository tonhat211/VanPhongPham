import Header from '../components/Header'
import Footer from '../components/Footer/Footer'
import ProductDetailPage from '~/pages/ProductDetails/ProductDetailPage';
import './index.scss'
function ProductDetailLayout({children}) {
    return (
        <div>
            <Header />
            <div className='product-detail-layout-container'>
                {/*<div className='breadcrumb'>breadcrumb</div>*/}
                {/*<div className='content'>  */}
                {/*    {children}*/}
                {/*</div>*/}
                <ProductDetailPage/>
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetailLayout;
