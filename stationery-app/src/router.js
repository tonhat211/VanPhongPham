import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PATH } from "./utils/path";
import MasterLayout from "./layout/masterLayout"
import HomePage from "./pages/homepage/homePage"
import ContactPage from "./pages/contact/contact"
import AboutPage from "./pages/about/about"
import PolicyPage from "./pages/policy/policy"
import ListPage from './pages/ListProducts/ListPage';
import DetailPage from './pages/ProductsDetail/DetailPage';

import CartPage from './pages/CartPage/CartPage'; // Import CartPage

import CheckoutPage from "./pages/checkout/CheckoutPage";


const renderRouter =() =>{
    const userRouters = [
        {
            path: "/",
            component: <HomePage/>
        },
        {
            path :PATH.USER.HOME,
            component: <HomePage/>
        },
        {
            path :PATH.USER.ABOUT,
            component: <AboutPage/>
        },
        {
            path :PATH.USER.POLICY,
            component: <PolicyPage/>
        },
        {
            path:PATH.USER.CONTACT,
            component:<ContactPage/>
        }
        ,
        {
            path:PATH.USER.LISTPRODUCT,
            component: <ListPage/>
        },
        {
            path : PATH.USER.PRODUCTDETAIL,
            component:<DetailPage/>
        },

        { path: PATH.USER.CART, component: <CartPage /> }, // Add CartPage route


        {
            path:PATH.USER.CHECKOUT,
            component: <CheckoutPage/>
        },

    ];

    return (
        <MasterLayout>
            <Routes>
            {userRouters.map((item, key) => (
                <Route key={key} path={item.path} element={item.component} />
            ))}
            </Routes>
        </MasterLayout>
    );
}
const RouterCustom  = () =>{
    return renderRouter();
}
export default RouterCustom;