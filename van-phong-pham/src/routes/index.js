import Home from '~/pages/Home'
import Category from '~/pages/Category';
import { CategoryLayout } from '~/components/Layouts';
import ProductDetailPage from '~/pages/ProductDetails/ProductDetailPage';
import ProductCardsPage from '~/pages/productCardsPage/productCardsPage'
import ProductCardsLayout from '~/components/Layouts/ProductCardsLayout';
import ProductDetailLayout from '~/components/Layouts/ProductDetailLayout';
// nhung route KHONG can dang nhap van xem duoc
const publicRoutes  = [
    { path: '/', component: Home},
    { path: '/category', component: Category, layout: CategoryLayout },
    { path: '/detail', component: ProductDetailPage, layout: ProductDetailLayout },
    { path: '/cart', component: ProductCardsPage, layout: ProductCardsLayout },
]

// nhung route PHAI DANG NHAP moi xem duoc
const privateRoutes = [

]

export {publicRoutes, privateRoutes}