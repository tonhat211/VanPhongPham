import Header from '../components/Header'
import Footer from '../components/Footer/Footer'

function ProductDetailLayout({children}) {
    return (
        <div>
            <Header />
            <div className='container'>
                <div className='breadcrumb'>breadcrumb</div>
                <div className='content'>  
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductDetailLayout;