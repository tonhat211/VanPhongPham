import {memo} from "react";
import CheckoutInfo from "../../component/checkOut/CheckoutInfo/CheckoutInfo";
import './CheckoutPageStyles.scss'
import CheckoutRight from "../../component/checkOut/CheckoutRight/CheckoutRight";
function CheckoutPage() {
    return (

        <div className="checkOut_container">
            <div className="checkOut_left">
<CheckoutInfo/>
            </div>

            <div className="checkOut_right">
<CheckoutRight/>
            </div>

        </div>
    );
}

export default memo(CheckoutPage);