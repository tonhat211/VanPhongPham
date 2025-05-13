import axios from 'axios';
import BrandModel from '~/models/BrandModel';
import MenuItemModel from '~/models/MenuItemModel';
import SubMenuModel from '~/models/SubMenuModel';

const API_BASE = 'http://localhost:8080/api/v1';
const SERVER_URL_BASE = 'http://localhost:8080';


export async function getPrimaryCategories(level=1) {
    console.log('getPrimaryCategories');
    const url = new URL(`${API_BASE}/menu/data`);
   const params = { level };

    Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key]);
        }
    });
    // console.log(JSON.stringify(url, null, 2))

    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // nếu dùng HttpOnly cookie
    });

    if (!response.ok) {
        throw new Error('Không thể menu');
    }
    console.log('getPrimaryCategory: ok');
    const data = await response.json();

    // console.log('data: ', JSON.stringify(data, null, 2));

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

        // console.log('MenuItemModels : ', JSON.stringify(menus, null, 2));


    return menus;
}


export async function getBrands() {
    console.log('getBrands');
    const url = new URL(`${API_BASE}/menu/brands`);
 
    // console.log(JSON.stringify(url, null, 2))

    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // nếu dùng HttpOnly cookie
    });

    if (!response.ok) {
        throw new Error('Không thể menu');
    }
    console.log('getBrands: ok');
    const data = await response.json();

    // console.log('data: ', JSON.stringify(data, null, 2));

    const datas = data.map(
        (item) =>
            new BrandModel(
                item.id,
                item.name,
                item.code,
            ),
    );



    return datas;
}






