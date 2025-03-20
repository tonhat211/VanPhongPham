import {memo} from 'react';
import "./categogyStyle.scss"
import Icon from '@mdi/react';

import { mdiChevronRight } from '@mdi/js';

import { Link } from 'react-router-dom';

import pen from "../../../resource/pen.webp"
import vpp from "../../../resource/vpp.webp"
import dcht from "../../../resource/dcht.webp"
import art from "../../../resource/art.webp"
import paper from "../../../resource/paper.webp"
import vippen from "../../../resource/vippen.webp"
import steamdiy from "../../../resource/steamdiy.webp"
import book from "../../../resource/book.webp"
import gift from "../../../resource/gift.webp"

function Categogy(){
    const list =  [
             {
                 "icon": pen,
                 "label":"Bút viết",
             },
         {
             "icon":vpp,
             "label":"Văn phòng phẩm",
         },
             {
                 "icon":dcht,
                 "label":"Dụng Cụ Học Tập",
             },
             {
                 "icon": art,
                 "label":"Mỹ Thuật",
             },
             {
                 "icon": paper,
                 "label":"Giấy In",
             },
             {
                 "icon": vippen,
                 "label":"Bút cao cấp",
             },
            {
                "icon": steamdiy,
                "label":"STEAM & DIY",
            },
             {
                 "icon": book,
                 "label":"Sách",
             },
             {
                 "icon": gift,
                 "label":"Quà tặng - Lifestyle"
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
                    {list.map(item =>{
                        return(
                            <Link to={"/products"} className='item-link' title=''>
                                <span>
                                    <img src={item.icon} className='left-icon' alt={item.label} style={{ width: 24, height: 24 }} />
                                    {item.label}
                                </span>
                                <Icon path={mdiChevronRight} className='right-icon' size={1} />
                            </Link>
                        )
                    })}

                </li>
            </ul>
        </div>

    );
}
export default memo(Categogy);