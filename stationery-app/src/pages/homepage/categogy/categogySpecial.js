import {memo} from 'react';
import "./categogyStyle.scss"
import Icon from '@mdi/react';

import { mdiChevronDoubleRight } from '@mdi/js';

import { Link } from 'react-router-dom';

import customer from "../../../resource/loyal_Customer.webp"
import noibo from "../../../resource/noibo.webp"
import paker_phanphoi from "../../../resource/paker.webp"
function CategogySpecial(){
    const list =  [
            {
                "icon": customer,
                "label":"Khách hàng thân thiết",
            },
            {
                "icon": customer,
                "label":"Khách hàng ưu tiên",
            },
            {
                "icon":noibo,
                "label":"Thiên Long Nội Bộ",
            },
            {
                "icon":paker_phanphoi,
                "label":"Điểm phân phối Parker",
            },
        ];
        const generateQueryParams = () => {
            const queryParams = new URLSearchParams();
            
            list.forEach(ct => {
                queryParams.append("categogy",ct);
            })
        
            return queryParams.toString();
          };

    return (
        <div className='cate-container'>
            <ul className='cate-list'>
                <li className='item'>
                    <li className='tilte'>Danh mục nổi bật</li>
                    {list.map(item => {
                        return (
                            <Link to={"/products"} className='item-link' title=''>
                                 <span>
                                    <img src={item.icon} className='left-icon' alt={item.label}
                                         style={{width: 24, height: 24}}/>
                                     {item.label}
                                </span>
                            </Link>
                        )
                    })}

                </li>
            </ul>
        </div>

    );
}
export default memo(CategogySpecial);