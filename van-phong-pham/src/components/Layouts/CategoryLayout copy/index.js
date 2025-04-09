import Header from '../components/Header'
import Footer from '../components/Footer'

function CategoryLayout({children}) {
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

export default CategoryLayout;