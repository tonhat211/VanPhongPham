import React, { useState } from 'react';
import './ProductPromoPanel.scss';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';

function ProductPromoPanel() {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = () => {
        const codeElement = document.querySelector('.tickDiscount_left strong');
        const code = codeElement ? codeElement.innerText : '';

        if (isCopied) {
            alert('Mã đã được sao chép');
        } else {
            navigator.clipboard.writeText(code)
                .then(() => setIsCopied(true))
                .catch(err => console.error('Lỗi copy: ', err));
        }
    };

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

            <div className="right_2">
                <div className="right2_container">
                    <div className="tickDiscount1">
                        <div className="tickDiscount_left">
                            <h4>Giảm 200.000đ</h4>
                            <p>Đơn hàng từ 700.000đ</p>
                            <p>Mã: <strong>0724SALE50</strong></p>
                            <p>30/04/2025</p>
                        </div>
                        <div className="tickDiscount_right">
                            <div className="tickDiscount_right1">Điều kiện</div>
                            <div className="tickDiscount_right2" onClick={handleCopyClick}>
                                {isCopied ? 'Đã sao chép' : 'Sao chép mã'}
                            </div>
                        </div>
                    </div>

                    <div className="tickDiscount1">
                        <div className="tickDiscount_left">
                            <h4>Giảm 200.000đ</h4>
                            <p>Đơn hàng từ 700.000đ</p>
                            <p>Mã: <strong>0724SALE50</strong></p>
                            <p>30/04/2025</p>
                        </div>
                        <div className="tickDiscount_right">
                            <div className="tickDiscount_right1">Điều kiện</div>
                            <div className="tickDiscount_right2" onClick={handleCopyClick}>
                                {isCopied ? 'Đã sao chép' : 'Sao chép mã'}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductPromoPanel;
