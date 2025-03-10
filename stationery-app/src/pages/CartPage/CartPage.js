import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
  MDBListGroup,
MDBListGroupItem
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { updateQuantity } from "../../redux/CartSlice";
import { removefromCart } from "../../redux/CartSlice";
import { useNavigate } from 'react-router-dom';

export default function ProductCards() {
    function formatPrices(price) {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(price);
    }
    
    function formatPercentage(decimalValue) {
        // Chuyển đổi số thập phân thành phần trăm và định dạng với 2 chữ số thập phân
        return (decimalValue * 100) + '%';
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cart.items || []);
    const handleCheckout = () => {
        navigate('/checkout'); // Chuyển hướng đến trang thanh toán
    };

    const handleRemove = (sid) => {
      dispatch(removefromCart(sid));
    };
    const handleIncrement = (id) => {
        const item = cartItems.find(item => item.sid === id);
        if (item) {
          handleQuantityChange(id, item.quantity + 1);
        }
      };
    
      const handleDecrement = (id) => {
        const item = cartItems.find(item => item.sid === id);
        if (item && item.quantity > 1) {
          handleQuantityChange(id, item.quantity - 1);
        }
      };
  
    const handleQuantityChange = (id, newQuantity) => {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    };
return (
<section className="h-100" style={{ backgroundColor: "#eee" }}>
  <MDBContainer className="py-5 h-100">
    <MDBRow className="justify-content-center align-items-center h-100">
      <MDBCol md="10">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
            Shopping Cart
          </MDBTypography>
          <div>
            <p className="mb-0">
              <span className="text-muted">Sort by:</span>
              <a href="#!" className="text-body">
                price <i className="fas fa-angle-down mt-1"></i>
              </a>
            </p>
          </div>
        </div>
        {/* items */}
        {cartItems.length > 0 ? (
            <div>
            {cartItems.map( item => (
                <MDBCard className=" w-100 rounded-3 mb-4" key={item.sid}>
                <MDBCardBody className="w-100 p-4">
                  <MDBRow className="justify-content-between align-items-center">
                    <MDBCol md="2" lg="2" xl="2">
                      <MDBCardImage className="rounded-3" fluid
                        src= {item.images[0].url}
                        alt="Cotton T-shirt" />
                    </MDBCol>
                    <MDBCol md="3" lg="3" xl="3">
                      <p className="lead fw-normal mb-2">{item.title}</p>
                      <p>
                        <span className="text-muted">Thương hiệu: {item.brand} </span>
                      </p>
                    </MDBCol>
                    <MDBCol md="3" lg="3" xl="2"
                      className="d-flex align-items-center justify-content-around">
                      <MDBBtn color="link" className="px-2" onClick={() => handleDecrement(item.sid)}>
                        <MDBIcon fas icon="minus" />
                      </MDBBtn>
      
                      <MDBInput min={0} value={item.quantity} type="number" size="sm" />
      
                      <MDBBtn color="link" className="px-2" onClick={() => handleIncrement(item.sid)}>
                        <MDBIcon fas icon="plus" />
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                      <MDBTypography tag="h5" className="mb-0">
                        {formatPrices(item.price)}
                      </MDBTypography>
                    </MDBCol>
                    <MDBCol md="1" lg="1" xl="1" className="text-end">
                      <a href="#!" className="text-danger" onClick={() => handleRemove(item.sid)} >
                        <MDBIcon fas icon="trash text-danger" size="lg" />
                      </a>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
           ))}
        <MDBCard className="w-100">
          <MDBCardBody>
            <MDBBtn className="ms-3" color="warning" block size="lg" onClick={handleCheckout}>
              Đặt hàng
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
           </div>
           
        ):( 
        <MDBCard className="w-100">
            <MDBCardBody>
            <MDBBtn className="ms-3" color="warning" block size="lg">
              Giỏ hàng của bạn đang trống
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
        )
    };
       
        
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</section>
);
}