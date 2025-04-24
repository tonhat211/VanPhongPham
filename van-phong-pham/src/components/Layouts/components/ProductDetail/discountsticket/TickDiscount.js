import React, { useState } from 'react';
import './TickDiscount.scss'
function TickDiscount() {
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
        <div className="right_2">
            <div className="right2_container">
                <div className="tickDiscount1">
                    <div className="tickDiscount_left">
                        <h4>Giảm 50.000đ</h4>
                        <p>Đơn hàng từ 300.000đ</p>
                        <p>Mã: <strong>0425SALE50</strong></p>
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
                        <h4>Giảm 100.000đ</h4>
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
                        <h4>Giảm 300.000đ</h4>
                        <p>Đơn hàng từ 1.300.000đ</p>
                        <p>Mã: <strong>0425SALE200</strong></p>
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
    );
}

export default TickDiscount;