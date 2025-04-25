import CartItem from '~/models/CartItem';
import images from '~/assets/images';
import Order from '~/models/Order';

const cartitems = [
  new CartItem(1,1, "Bút gel Quick Dry Thiên Long GEL-066 - Premium Tip - Vật liệu tái chế",'20 cay',10, images.product1,100000,90000),
  new CartItem(2,2, "Combo 20 Bút Gel Thiên Long Doraemon GEL-012/DO Nature - Mực tím - Phiên bản 2025",'mix',1, images.product2,400000,39000),
  new CartItem(3,3, "Bút mực gel khô nhanh - nét viết êm mượt Flexgel Thiên Long GEL-042 - Dành cho Văn Phòng Sinh Viên Học sinh",'20 cay',4, images.product3,120000,10000),
  new CartItem(4,4, "Bút gel Quick Dry Thiên Long GEL-066 - Premium Tip - Vật liệu tái chế",'20 cay',10, images.product1,100000,12414)
];

const WAIT=0;
const CONFIRM=1;
const DELIVERY=2;
const COMPLETE=3;
const CONFIRM_COMPLETE=4;
const REVIEW=5;
const CANCEL=-1;
const BACK=-2;
const BACKING=-3;
const BACKED=-4;

const orders = [
   new Order(1,cartitems,"20/04/2025","23/04/2025",200000,180000,COMPLETE),
   new Order(2,cartitems,"20/04/2025",null,200000,180000,WAIT),
   new Order(3,cartitems,"20/04/2025",null,200000,180000,CONFIRM),
   new Order(4,cartitems,"20/04/2025","23/04/2025",200000,180000,CONFIRM_COMPLETE),
   new Order(5,cartitems,"20/04/2025","23/04/2025",200000,180000,REVIEW),
   new Order(6,cartitems,"20/04/2025",null,200000,180000,CANCEL)
];

export default orders;