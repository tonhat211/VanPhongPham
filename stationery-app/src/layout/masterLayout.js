import { memo } from "react";
import TopNavigation from "../component/top-navigation/navigation"
import Footer from "../component/footer/footer";
import Header from "../component/header/header";
import "./masterLayoutStyle.scss"
// layout gốc cho tất cả các trang 
const MasterLayout =({ children, ...props}) =>{
    return (
        <div {...props}>
            <TopNavigation/>
            <Header/>
            <div className="content">{children}</div>
            <Footer/>
        </div>
    );
};
export default memo(MasterLayout);