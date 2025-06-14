import Header from '~/components/Layouts/components/Header';
import Footer from '~/components/Layouts/components/Footer';
import ProductCardsPage from '~/pages/productCardsPage/productCardsPage';
import './index.scss';
import { useFEContext } from '~/context/FEProvider';
import Sidebar from '../components/Sidebar';
function ProductCardsLayout({children}) {
       const { isSidebarOpen } = useFEContext();
    return (
        <div>
            <Header />
            <div className='product-cart-layout-container'>
                 {isSidebarOpen && <Sidebar/>}
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