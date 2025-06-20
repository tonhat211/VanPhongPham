import React from 'react';
import './ProductPromoPanel.scss';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import TickDiscount from '~/components/Layouts/components/ProductDetail/discountsticket/TickDiscount';
import useI18n from '~/hooks/useI18n';

function ProductPromoPanel() {
    const { t, lower } = useI18n();
    return (
        <div className="info_right">
            <div className="right_1">
                <div className="right1_wrap">
                    <LocalShippingOutlinedIcon className="icon ishipping" />
                    <span className="text_right1">{t('productPromo.nationwide-shipping')}</span>
                </div>
                <div className="right1_wrap">
                    <StarOutlineOutlinedIcon className="icon istar" />
                    <span className="text_right1">{t('productPromo.authentic-product')}</span>
                </div>
                <div className="right1_wrap">
                    <CardGiftcardOutlinedIcon className="icon igift" />
                    <span className="text_right1">{t('productPromo.point-reward')}</span>
                </div>
                <div className="right1_wrap">
                    <LocalActivityOutlinedIcon className="icon isale" />
                    <span className="text_right1">{t('productPromo.many-discounts')}</span>
                </div>
            </div>

              <TickDiscount/>

        </div>
    );
}

export default ProductPromoPanel;
