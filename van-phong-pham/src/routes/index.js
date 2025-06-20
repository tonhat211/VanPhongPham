import Home from '~/pages/Home';
// import ProductDetail from '~/pages/ProductDetail';
import Category from '~/pages/Category';
import { CategoryLayout, ProductDetailLayout, ProductLayout, NoneLayout, AdminLayout } from '~/components/Layouts';
import { Product, Checkout, Account, SearchProduct } from '~/pages';
import { Employee, Product as AdminProduct, Dashboard, Permission, Order as AdminOrder } from '~/pagesAdmin';
import ProductDetailPage from '~/pages/ProductDetails/ProductDetailPage';

import ProductCardsPage from '~/pages/productCardsPage/productCardsPage';
import ProductCardsLayout from '~/components/Layouts/ProductCardsLayout';
import HomeLayout from '~/components/Layouts/HomeLayout';
import RegisterPages from '~/pages/registerPages';
import RegisterLayout from '~/components/Layouts/registerLayout/RegisterLayout';
import LoginPage from '~/pages/LoginPage/LoginPage';
import LoginLayout from '~/components/Layouts/loginLayout/LoginLayout';
import Customer from '~/pagesAdmin/Customer/Customer';
import OtpVerificationPage from '~/pages/VerifyOTP/OtpVerificationPage';
import OtpVerificationLayout from '~/components/Layouts/OtpVerificationLayout/OtpVerificationLayout';
import page403 from '~/components/Layouts/components/page403';

// nhung route KHONG can dang nhap van xem duoc
const publicRoutes = [
    { path: '/', component: Home, layout: HomeLayout },
    { path: '/403', component: page403, layout: NoneLayout },
    { path: '/Home', component: Home, layout: HomeLayout },
    { path: '/products', component: Product, layout: ProductLayout },
    { path: '/products/:category', component: Product, layout: ProductLayout },
    { path: '/products/search', component: SearchProduct, layout: ProductLayout },
    // { path: '/product-detail', component: ProductDetail, layout: ProductDetailLayout},

    // { path: '/products/:id', component: ProductDetailPage, layout: ProductDetailLayout },
    { path: '/products/detail/:id', component: ProductDetailPage, layout: ProductDetailLayout },

    // { path: '/checkout', component: Checkout},
    { path: '/register', component: RegisterPages, layout: RegisterLayout },
    { path: '/login', component: LoginPage, layout: LoginLayout },
    { path: '/verify-code', component: OtpVerificationPage, layout: OtpVerificationLayout },
];

// nhung route PHAI DANG NHAP moi xem duoc
const privateRoutes = [
    //chi can dang nhap
    { path: '/checkout', component: Checkout, layout: NoneLayout },
    { path: '/account', component: Account, layout: ProductLayout },
    { path: '/cart', component: ProductCardsPage, layout: ProductCardsLayout },


    // can role
    { path: '/admin/employee', component: Employee, layout: AdminLayout },
    { path: '/admin/products', component: AdminProduct, layout: AdminLayout, permissions: ['ADMIN_PRODUCT']},
    { path: '/admin/products/:category', component: AdminProduct, layout: AdminLayout, permissions: ['ADMIN_PRODUCT']},
    { path: '/admin/permissions', component: Permission, layout: AdminLayout, permissions: ['ADMIN'] },
    { path: '/admin/dashboard', component: Dashboard, layout: AdminLayout },
    // { path: '/', component: Dashboard, layout: AdminLayout },
    { path: '/admin/customer', component: Customer, layout: AdminLayout },
    { path: '/admin/orders', component: AdminOrder, layout: AdminLayout, permissions: ['ADMIN_ORDER'] },
];

export { publicRoutes, privateRoutes };
