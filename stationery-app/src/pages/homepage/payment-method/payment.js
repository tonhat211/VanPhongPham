// hiển thị phần nội dung về các phương thức thanh toán
import {memo} from "react"
import "./paymentStyle.scss"
import cert from "../../../resource/footer_bct.webp"
import momo from "../../../resource/payment-momo.webp"
import atm from "../../../resource/payment-atm.webp"
import cash from "../../../resource/payment-cash.webp"
import jcb from "../../../resource/payment-jcb.webp"
import shoppe from "../../../resource/payment-shoppepay.webp"
import visa from "../../../resource/payment-visa.webp"
import vnpay from "../../../resource/payment-vnpay.webp"
import zalo from "../../../resource/payment-zalo.webp"
import mastercard from "../../../resource/payment-mastercard.webp"

function PaymentMethod(){
    return (
        <div>
          <div className="payment-med-wrap">
            <div className="mail-register">
              <p className="payment-title">Đăng kí nhận bản tin</p>
              <div className="form-res">
                <form acceptCharset="UTF-8" action="/account/contact" className="contact-form" method="post">
                    <div className="input-group">
                      <input className="form-control" type="email" placeholder="Nhập địa chỉ email"/>
                      <button className="sub-action">Đăng kí</button>
                    </div>
                </form>
              </div>
            </div>
            <div className="cert">
              <p className="payment-title">Chứng nhận</p>
              <a href="#">
                  <img src={cert}/>
              </a>
            </div>
            <div className="payment-med">
              <p className="payment-title">
                danh sách thanh toán
              </p>
              <div className="payment-med-pic">
              <a href="#">
                  <img src={atm}/>
              </a>
              <a href="#">
                  <img src={cash}/>
              </a>
              <a href="#">
                  <img src={jcb}/>
              </a>
              <a href="#">
                  <img src={mastercard}/>
              </a>
              <a href="#">
                  <img src={momo}/>
              </a>
              <a href="#">
                  <img src={shoppe}/>
              </a>
              <a href="#">
                  <img src={visa}/>
              </a>
              <a href="#">
                  <img src={vnpay}/>
              </a>
              <a href="#">
                  <img src={zalo}/>
              </a>
              </div>
            </div>
          </div>
        </div>
    );
}
export default memo(PaymentMethod);