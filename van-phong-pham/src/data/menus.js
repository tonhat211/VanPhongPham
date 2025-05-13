import MenuItem from '~/models/MenuItem';
import icons from '~/assets/icons';

const menus = [
  new MenuItem('Bút viết', 'but-viet', icons.icon_but_viet, [
    new MenuItem('BST bút Hoshi - Công nghệ Nhật Bản', 'products/bst-but-hoshi'),
    new MenuItem('Bộ sưu tập bút xóa được Mazzic', 'products/laptops'),
    new MenuItem('Bút lông kim', '/products/laptops',null,[
        new MenuItem('BST bút Hoshi - Công nghệ Nhật Bản', '/products/phones'),
        new MenuItem('Bộ sưu tập bút xóa được Mazzic', '/products/laptops'),
        new MenuItem('Bút Bi', '/products/laptops'),
        new MenuItem('Bút Gel', '/products/laptops')
    ]),
    new MenuItem('Bút Bi', '/products/laptops'),
    new MenuItem('Bút Gel', '/products/laptops'),
    new MenuItem('Bút Gel Xóa Được', '/products/laptops'),
    new MenuItem('Bút Máy xóa được', '/products/laptops'),
    new MenuItem('Bút Máy', '/products/laptops')
  ]),
  new MenuItem('Văn phòng phẩm', 'van-phong-pham', icons.icon_van_phong_pham),
  new MenuItem('Dụng cụ học tập', '/dung-cu-hoc-tap',  icons.icon_dung_cu_hoc_tap, [
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones')
  ]),
  new MenuItem('Mỹ thuật', '/my-thuat', icons.icon_my_thuat, [
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones')
  ]),
  new MenuItem('Giấy in', '/giay-in', icons.icon_giay_in, [
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones')
  ]),
  new MenuItem('Bút cao cấp', '/but-cao-cap', icons.icon_but_cao_cap, [
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones')
  ]),
  new MenuItem('STEAM & DIY', '/steam-diy', icons.icon_steam_diy, [
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones')
  ]),
  new MenuItem('Sách', '/sach', icons.icon_sach, [
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones')
  ]),
  new MenuItem('Quà tặng-Lifestyle', '/qua-tang-lifestyle', icons.icon_qua_tang, [
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones')
  ]),
];

export default menus;