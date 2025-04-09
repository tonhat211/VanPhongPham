import Home from '~/pages/Home'
import Category from '~/pages/Category';
import { CategoryLayout } from '~/components/Layouts';
// nhung route KHONG can dang nhap van xem duoc
const publicRoutes  = [
    { path: '/', component: Home},
    { path: '/category', component: Category, layout: CategoryLayout },
]

// nhung route PHAI DANG NHAP moi xem duoc
const privateRoutes = [

]

export {publicRoutes, privateRoutes}