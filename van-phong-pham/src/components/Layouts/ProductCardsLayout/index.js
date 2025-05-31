import Header from '~/components/Layouts/components/Header';
import Footer from '~/components/Layouts/components/Footer';
import ProductCardsPage from '~/pages/productCardsPage/productCardsPage';
import './index.scss';
function ProductCardsLayout({children}) {
    return (
        <div>
            <Header />
            <div className='product-cart-layout-container'>
                {/*<div className='breadcrumb'>breadcrumb</div>*/}
                {/*<div className='content'>  */}
                {/*    {children}*/}
                {/*</div>*/}
                <ProductCardsPage/>
            </div>
            <Footer />
        </div>
    )
}

export default ProductCardsLayout;