import React from 'react';
import './ProductPromoPanel.scss';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import TickDiscount from '~/components/Layouts/components/ProductDetail/discountsticket/TickDiscount';

function ProductPromoPanel() {
    return (
        <div className="info_right">
            <div className="right_1">
                <div className="right1_wrap">
                    <LocalShippingOutlinedIcon className="icon ishipping" />
                    <span className="text_right1">Giao hàng toàn quốc</span>
                </div>
                <div className="right1_wrap">
                    <StarOutlineOutlinedIcon className="icon istar" />
                    <span className="text_right1">Sản phẩm chính hãng</span>
                </div>
                <div className="right1_wrap">
                    <CardGiftcardOutlinedIcon className="icon igift" />
                    <span className="text_right1">Tích điểm đổi quà</span>
                </div>
                <div className="right1_wrap">
                    <LocalActivityOutlinedIcon className="icon isale" />
                    <span className="text_right1">Nhiều khuyến mãi, ưu đãi</span>
                </div>
            </div>

              <TickDiscount/>

        </div>
    );
}

export default ProductPromoPanel;
