import Header from '~/components/Layouts/components/Header';
import Footer from '~/components/Layouts/components/Footer';
import ProductCardsPage from '~/pages/productCardsPage/productCardsPage';

function ProductCardsLayout({children}) {
    return (
        <div>
            <Header />
            <div className='product-detail-layout-container'>
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