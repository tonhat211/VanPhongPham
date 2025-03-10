import {memo} from 'react';
import "./categogyStyle.scss"
import Icon from '@mdi/react';
import { mdiFountainPen } from '@mdi/js';
import { blue } from '@mui/material/colors';
import { mdiChevronDoubleRight } from '@mdi/js';
import { mdiPackage } from '@mdi/js';
import { mdiPalette } from '@mdi/js';

import { mdiNoteEdit } from '@mdi/js';

import { mdiCrownCircleOutline } from '@mdi/js';
import { mdiTools } from '@mdi/js';
import { mdiBookOpenBlankVariant } from '@mdi/js';
import { mdiDeskLamp } from '@mdi/js';
import { mdiGift } from '@mdi/js';
import { Link } from 'react-router-dom';

function Categogy(){
    const list =  [
            {
                "icon":mdiFountainPen ,
                "label":"Bút viết",
            },
            {
                "icon":mdiPackage,
                "label":"Dụng Cụ Học Tập",
            },
            {
                "icon":mdiPalette,
                "label":"Mỹ Thuật",
            },
            {
                "icon":mdiNoteEdit,
                "label":"Giấy In",
            },
            {
                "icon":mdiCrownCircleOutline,
                "label":"Bút cao cấp",
            },
            {
                "icon":mdiTools,
                "label":"STEAM & DIY",
            },
            {
                "icon":mdiBookOpenBlankVariant,
                "label":"Sách",
            },
            {
                "icon":mdiDeskLamp,
                "label":"Sản phẩm Rạng Đông, Inochi",
            },
            {
                "icon":mdiGift,
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
                            <Link to={"/products"} className='item-link' title='Bút viết'>
                                <span>
                                    <Icon path={item.icon} className='left-icon' size={1} style={{ color: blue[800] }} />
                                    {item.label}
                                </span>
                                <Icon path={mdiChevronDoubleRight} className='right-icon' size={1} />
                            </Link>
                        )
                    })}
                    {/* <div className='beside-dropdown'>
                        <ul className='sub-list'>
                            <div className='row'>
                                <div className='col'>
                                    <li className='sub-list-item'>
                                        <a>
                                            <span>Bộ sưu tập bút xóa được</span>
                                        </a>
                                    </li>
                                </div>
                            </div>
                        </ul>
                    </div> */}
                </li>
            </ul>
        </div>

    );
}
export default memo(Categogy);