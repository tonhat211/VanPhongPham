import CartItem from '~/models/CartItem';
import images from '~/assets/images';

const cartitems = [
  new CartItem(1,1, "Bút gel Quick Dry Thiên Long GEL-066 - Premium Tip - Vật liệu tái chế",'20 cay',10, images.product1,100000,90000),
  new CartItem(2,2, "Combo 20 Bút Gel Thiên Long Doraemon GEL-012/DO Nature - Mực tím - Phiên bản 2025",'mix',1, images.product2,400000,39000),
  new CartItem(3,3, "Bút mực gel khô nhanh - nét viết êm mượt Flexgel Thiên Long GEL-042 - Dành cho Văn Phòng Sinh Viên Học sinh",'20 cay',4, images.product3,120000,10000),
  new CartItem(4,4, "Bút gel Quick Dry Thiên Long GEL-066 - Premium Tip - Vật liệu tái chế",'20 cay',10, images.product1,100000,12414)
];

export default cartitems;