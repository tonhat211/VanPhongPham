import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb';
import { useSidebar } from '~/context/FEProvider';
import Sidebar from '../components/Sidebar';

function ProductLayout({children}) {
        const { isSidebarOpen, toggleSidebar } = useSidebar();
    
    return (
        <div>
            <Header />
            <div className="container pt-137-tab">
                <Breadcrumb />
                {isSidebarOpen && <Sidebar />}
                <div className="main-container ">
                    <div className="content">{children}</div>
                </div>
            
            </div>
            <Footer />
        </div>
    );
}

export default ProductLayout;