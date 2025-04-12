import MenuItem from '~/models/MenuItem';
import icons from '~/assets/icons';

const menus = [
  new MenuItem('Bút viết', '/products', icons.icon_but_viet, [
    new MenuItem('BST bút Hoshi - Công nghệ Nhật Bản', '/products/phones'),
    new MenuItem('Bộ sưu tập bút xóa được Mazzic', '/products/laptops'),
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
  new MenuItem('Văn phòng phẩm', '/contact', icons.icon_van_phong_pham),
  new MenuItem('Dụng cụ học tập', '/products',  icons.icon_dung_cu_hoc_tap, [
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones')
  ]),
  new MenuItem('Mỹ thuật', '/products', icons.icon_my_thuat, [
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones')
  ]),
  new MenuItem('Giấy in', '/products', icons.icon_giay_in, [
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones')
  ]),
  new MenuItem('Bút cao cấp', '/products', icons.icon_but_cao_cap, [
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones')
  ]),
  new MenuItem('STEAM & DIY', '/products', icons.icon_steam_diy, [
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones')
  ]),
  new MenuItem('Sách', '/products', icons.icon_sach, [
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones')
  ]),
  new MenuItem('Quà tặng-Lifestyle', '/products', icons.icon_qua_tang, [
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones'),
    new MenuItem('lap', '/products/phones')
  ]),
];

export default menus;