import {memo} from "react";
import Icon from '@mdi/react';
import { mdiMagnify, mdiWeight } from '@mdi/js';
import { mdiPhone } from '@mdi/js';
import { mdiBell } from '@mdi/js';
import { blue } from '@mui/material/colors';
import { yellow } from '@mui/material/colors';
import { mdiShoppingOutline } from '@mdi/js';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import logo from '../../resource/logo.webp';
import './headerStyle.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateQuantity } from "../../redux/CartSlice";
import productsData from "../../data/Product/productData";
import { useEffect } from "react";
function Header (){
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items );
    const firstItem = cartItems && cartItems.length > 0 ? cartItems[0] : null;
    const noti = localStorage.getItem('cart');

    const notidat = noti ? JSON.parse(noti) : [];

    const [editItemId, setEditItemId] = useState(firstItem);
    const [quantity, setQuantity] = useState(1);
    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity > 0) {
          dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
      };
      const pitem = productsData.slice(0,40)
    

      const [searchTerm, setSearchTerm] = useState('');
      const [suggestions, setSuggestions] = useState([]);
  
      // Update suggestions based on searchTerm
    //   useEffect(() => {
    //       if (searchTerm.length > 0) {
    //           const filteredSuggestions = pitem.filter(item =>
    //               item.name.toLowerCase().includes(searchTerm.toLowerCase())
    //           ).slice(0, 5); // Limit to top 5 suggestions
    //           setSuggestions(filteredSuggestions);
    //       } else {
    //           setSuggestions([]);
    //       }
    //   }, [searchTerm, pitem]);
  
      // Handle input change
      const handleChange = (e) => {
          setSearchTerm(e.target.value);
      };
  
      // Handle form submission
      const handleSubmit = (e) => {
          e.preventDefault();
          if (searchTerm.trim()) {
              window.location.href = `/search?query=${encodeURIComponent(searchTerm)}`;
          }
      };
    
    return (
        <header className="header">
            <div className="mid-header">
                <div className="header-container">
                    <div className="wrapper">
                        <div className="header-right">
                            <a href="home" className="logo-wrapper">
                                <img className="img-fluid" src={logo} alt="logo" />
                            </a>
                        </div>
                        <div className="header-center">
                            {/* //search form */}
                            <form  onSubmit={handleSubmit }  method="get" className=" input-group search-bar" role="search">
                                <input  type="search"  value={searchTerm} name="search-product" placeholder="Tìm kiếm sản phẩm..." className="input-search"/>
                                <span className="search-action">
                                    <button type="submit" className="search-button">
                                        <Icon path={mdiMagnify} size={1} style={{ color: blue[800] }}/>
                                    </button>
                                </span>
                            </form>
                            {/*// suggest sp khi search */}
                            {searchTerm && (
                                <div className="search-suggest" >
                                    <ul>
                                        {suggestions.length > 0 ? (
                                            suggestions.map((item, index) => (
                                                <li key={index}>
                                                    <a href={`/product/${item.id}`}>{item.name}</a>
                                                </li>
                                            ))
                                        ) : (
                                            <li>Không có gợi ý nào</li>
                                        )}
                                    </ul>
                                </div>
                            )}

                        </div>
                        <div className="header-left">
                            <ul>
                                <li className="hot-line">
                                    <div className="icon">
                                        <Icon path={mdiPhone} size={1} style={{ color: blue[800] }} />
                                    </div>
                                    <div className="detail">
                                        <span>Hỗ trợ khách hàng</span>
                                        <a className="phone-num">1900 100 615</a>
                                    </div>
                                </li>
                                <li className="user-prof">
                                    <div className="icon">
                                        <PersonOutlineOutlinedIcon style={{ color: blue[800]}} />
                                    </div>
                                    <div className="detail">
                                        <a className="userName">User 1</a>
                                        <small>Đăng xuất</small>
                                    </div>
                                </li>
                                <li className="cart-group">
                                    <div className="mini-cart">
                                        <a className="hover-cart" href="/cart">
                                            <Icon path={mdiShoppingOutline} size={1} />
                                            <span className="cart-text">Giỏ hàng</span>
                                            <span className="item-num">{cartItems.length}</span>
                                        </a>
                                        {/* cart hover xem các sản phẩm */}
                                        <div className="top-cart-content card">
                                            {/* <form className="cart-header-form">
                                                <ul id="cart-sidebar" className="mini-product-list">
                                                    <div className="no-item">
                                                        <p>Không có sản phẩm nào</p>
                                                    </div>
                                                </ul>
                                            </form> */}
                                            {/* <div class="cart-item">
                                                <img src="pen1.jpg" alt="Bút Bi Thiên Long TL-061"/>
                                                <div class="item-details">
                                                    <p>Bút Bi Thiên Long TL-061</p>
                                                    <p>Xanh</p>
                                                    <p>4,000₫ x 1</p>
                                                </div>
                                                <button class="remove-item">×</button>
                                            </div>
                                            <div class="cart-item">
                                                <img src="pen2.jpg" alt="Bút Bi Thiên Long TL-089"/>
                                                <div class="item-details">
                                                    <p>Bút Bi Thiên Long TL-089</p>
                                                    <p>Xanh</p>
                                                    <p>4,050₫ x 1</p>
                                                </div>
                                                <button class="remove-item">×</button>
                                            </div>
                                            <div class="cart-total">
                                                <p>Tổng tiền tạm tính: <strong>40,450₫</strong></p>
                                            </div>
                                            <button class="checkout-button">Tiến hành đặt hàng</button> */}

                                        </div>
                                    </div>
                                </li>
                                <li className="noti-head">
                                    <div className="noti-wrapper">
                                        <div className="noti-head-count">{notidat.length == 0?0:notidat.length}</div>
                                        <Icon path={mdiBell} size={1.3} style={{color: yellow[500]}} />

                                    </div>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default memo(Header);
