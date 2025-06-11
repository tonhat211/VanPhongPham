import Header from '../components/Header'
import Footer from '../components/Footer/Footer'
import './index.scss'
import Home from '~/pages/Home';
import Sidebar from '~/components/Layouts/components/Sidebar';
import { useSidebar } from '~/context/FEProvider';
function HomeLayout({children}) {
    return (
        <div>
            <Header />

            <div className='homepage-layout-container pt-160-tab'>
                 <Sidebar />
                <Home/>
            </div>
            <Footer />
        </div>
    );
}

export default HomeLayout;
