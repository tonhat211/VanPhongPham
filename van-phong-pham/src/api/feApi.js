import axiosInstance, {SERVER_URL_BASE} from './axiosInstance';
import BrandModel from '~/models/BrandModel';
import MenuItemModel from '~/models/MenuItemModel';
import SubMenuModel from '~/models/SubMenuModel';


export async function getPrimaryCategories(level=1) {
    console.log('getPrimaryCategories');
    const url = '/menu/data';
   const params = { level };

  
    const response = await axiosInstance.post(url, params);

    console.log('getPrimaryCategory: ok');
    const data = response.data;

    const menus = data.map(
        (item) =>
            new MenuItemModel(
                item.id,
                item.title,
                item.link,
                `${SERVER_URL_BASE}/${item.icon}`,
                item.subs?.map(
                (sub) => new SubMenuModel(sub.id, sub.title, sub.code)
            ) || []
            ),
    );
    // console.log(JSON.stringify(menus,null,2));

    return menus;
}


export async function getBrands() {
    console.log('getBrands');
    const url = '/menu/brands';

    const response = await axiosInstance.post(url);

   
    const data = response.data;


    const datas = data.map(
        (item) =>
            new BrandModel(
                item.id,
                item.name,
                item.code,
            ),
    );

    // console.log(JSON.stringify(datas,null,2));

    return datas;
}






