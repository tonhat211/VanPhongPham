import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';

import styles from './OrderInfo.module.scss';
import Area from '~/models/Area';
import cartitems from '~/data/cartItems';
import { formatMoney } from '~/utils';

const cx = classNames.bind(styles);

function OrderInfo() {
    const { t, i18n } = useTranslation();
    const [nameInput, setNameInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [addressDetailInput, setAddressDetailInput] = useState('');
    const [province, setProvince] = useState('');
    const [ward, setWard] = useState('');

    const handleProvinceChange = (e) => {
        setProvince(e.target.value);
    };
    const handleWardChange = (e) => {
        setWard(e.target.value);
    };

    const provinces = [
        new Area('HCM', 'hcm'),
        new Area('Hà Nội', 'ha-noi'),
        new Area('Đồng Nai', 'dong-nai'),
        new Area('Vũng Tàu', 'vung-tau'),
    ];

    const wards = [new Area('Quận 1', 'q1'), new Area('Quận 2', 'q2'), new Area('Bình Thạnh', 'binh-thanh')];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
            <CartList items={cartitems}/>
    
            </div>
        </div>
    );

    function CartList({items}) {
         return (
            <div className={cx('cart-list-container')}>
                {items.map((item) => (
                    <>
                      <CartItem key={item.id} item={item} />
                  
                    </>
                ))}
            </div>
        );
    }

    function CartItem({item}) {
        return (
            <div className={classNames(cx('cart-item'))}>
                <div className={classNames(cx('thumbnail-container'),'grid-col-2')}>
                    <img src={item.thumbnail} alt="But bi" />
                    <p
                        className={cx('qty')}
                
                    >
                        <span>{item.qty}</span>
                    </p>
                </div>
                <div className="grid-col-8" style={{padding:'5px 10px'}}>
                    <p
                        className={cx('name')}
                        style={{
                            marginTop: '10px',
                        }}
                    >
                        {item.name}
                    </p>
                    <p
                        className={cx('classification')}
                        style={{
                            marginTop: '10px',
                        }}
                    >
                        {item.classification}
                    </p>
                    
                </div>
                <div className="grid-col-2 d-flex-center-center"> <p className={cx('unit-price')}>{formatMoney(item.unitPrice)}</p></div>
            </div>
        );
    }
}

export default OrderInfo;
