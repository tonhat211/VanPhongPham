import Home from '~/pages/Home'
import ProductDetail from '~/pages/ProductDetail'
import Category from '~/pages/Category';
import { CategoryLayout, ProductDetailLayout, ProductLayout } from '~/components/Layouts';
import Product from '~/pages/Product';
// nhung route KHONG can dang nhap van xem duoc
const publicRoutes  = [
    // { path: '/', component: Home},
    { path: '/Home', component: Home},
    { path: '/', component: Product, layout: ProductLayout},
    { path: '/products', component: Product, layout: ProductLayout},
    { path: '/product-detail', component: ProductDetail, layout: ProductDetailLayout},
    { path: '/category', component: Category, layout: CategoryLayout },
]

// nhung route PHAI DANG NHAP moi xem duoc
const privateRoutes = [

]

export {publicRoutes, privateRoutes}