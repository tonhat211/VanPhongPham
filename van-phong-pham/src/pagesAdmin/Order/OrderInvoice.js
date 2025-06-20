// OrderInvoice.jsx
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import { formatMoney } from '~/utils';
import formatDateTime from '~/utils/formatDateTime';
import useI18n from '~/hooks/useI18n';

const cx = classNames.bind(styles);

export default function OrderInvoice({ order }) {
    const printRef = useRef();
    const { t, lower } = useI18n();
    const handlePrint = () => {
        const printContent = printRef.current.innerHTML;
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
            <html>
                <head>
                    <title>In đơn hàng</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                        th { background: #f0f0f0; }
                    </style>
                </head>
                <body>
                    ${printContent}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div>
            <button onClick={handlePrint}>🖨 In đơn hàng</button>

            <div ref={printRef} style={{ display: 'none' }}>
                <h2>Đơn hàng #{order.id}</h2>
                <p>Thông tin nhận hàng: {order.receiverInfo}</p>
                <p>Ngày đặt: {order.createdAt}</p>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>ten</th>
                            <th>phan loai</th>
                            <th>so luong</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.orderItems.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <p>{t(item.productName)}</p>
                                </td>
                                <td>
                                    <p>{t(item.classificationName)}</p>
                                </td>
                                <td>
                                    <p>{t(item.qty)}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p>
                    <strong>Tổng tiền:</strong>
                    <span className={classNames(cx('price'))}>{formatMoney(order.payedMoney)}</span>
                </p>
            </div>
        </div>
    );
}
