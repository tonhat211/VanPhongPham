import Home from '~/pages/Home'
import ProductDetail from '~/pages/ProductDetail'
import Category from '~/pages/Category';
// <<<<<<< HEAD
import { CategoryLayout, ProductDetailLayout, ProductLayout, NoneLayout } from '~/components/Layouts';
import {Product, Checkout} from '~/pages';

// =======
import { CategoryLayout } from '~/components/Layouts';
import ProductDetailPage from '~/pages/ProductDetails/ProductDetailPage';
import ProductDetailLayout from '~/components/Layouts/ProductDetailLayout';
// >>>>>>> main
// nhung route KHONG can dang nhap van xem duoc
const publicRoutes  = [
    // { path: '/', component: Home},
    { path: '/Home', component: Home},
    // { path: '/', component: Product, layout: ProductLayout},
    { path: '/products', component: Product, layout: ProductLayout},
    { path: '/products/:category', component: Product, layout: ProductLayout},
    { path: '/product-detail', component: ProductDetail, layout: ProductDetailLayout},
    { path: '/category', component: Category, layout: CategoryLayout },
<<<<<<< HEAD
    { path: '/', component: Checkout, layout: NoneLayout},
=======
    { path: '/detail', component: ProductDetailPage, layout: ProductDetailLayout },
>>>>>>> main
]

// nhung route PHAI DANG NHAP moi xem duoc
const privateRoutes = [

]

export {publicRoutes, privateRoutes}