import Header from '../components/Header'
import Footer from '../components/Footer/Footer'
import './index.scss'
import Home from '~/pages/Home';
import Sidebar from '~/components/Layouts/components/Sidebar';
function HomeLayout({children}) {
    return (
        <div>
            <Header />

            <div className='homepage-layout-container'>
                <Sidebar className='sidebar-layout'/>
                {/*<div className='breadcrumb'>breadcrumb</div>*/}
                {/*<div className='content'>  */}
                {/*    {children}*/}
                {/*</div>*/}
                <Home />
            </div>
            <Footer />
        </div>
    );
}

export default HomeLayout;
