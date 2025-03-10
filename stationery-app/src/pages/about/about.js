import {memo} from 'react';
import './aboutStyle.scss'
function AboutPage(){
    return (
        <div>
            <section className="section_all" id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section_title_all text-center">
                                <h3 className="font-weight-bold">Chào mừng tới <span
                                    className="text-custom">Thiên Long của chúng tôi</span></h3>
                                <p className="section_subtitle mx-auto">Thienlong.vn là website thương mại
                                    điện tử của Tập đoàn Thiên Long, chuyên cung cấp bút viết và văn phòng phẩm với hơn
                                    36 năm kinh nghiệm. <br/>Chúng tôi cung cấp sản phẩm cho nhiều đối tượng khách hàng,
                                    từ học sinh, sinh viên đến giới văn phòng.</p>
                                <div className="">
                                    <i className=""></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row vertical_content_manage mt-5">
                        <div className="col-lg-6">
                            <div className="about_header_main mt-3">
                                <div className="about_icon_box">
                                    <p className="text_custom font-weight-bold">Thienlong ra đời để mang lại sự tiện
                                        lợi, giúp khách hàng dễ dàng mua văn phòng phẩm, học cụ và sản phẩm mỹ
                                        thuật.</p>
                                </div>
                                <h4 className="about_heading text-capitalize font-weight-bold mt-4"> Chúng tôi có hệ
                                    thống phân phối hơn 65.000 điểm bán trên toàn quốc.</h4>
                                <p className=" mt-3">Hơn 160 Nhà Phân Phối, 2 tổng kho tại Miền Bắc và Miền
                                    Nam được vận hàng bởi 4 Công ty thương mại có trụ sở tại Hà Nội, Đà Nẵng, TP. Hồ Chí
                                    Minh, chúng tôi sở hữu một nền tảng vững chắc trong việc xây dựng và phát triển
                                    hoạt động thương mại điện tử. Bên cạnh đó, hệ thống quản lý phân phối DMS của chúng
                                    tôi đã được chính thức được vận hành, Thiên Long càng có nhiều lợi thể để nâng cao
                                    chất lượng bán hàng trực tuyến phục vụ nhu cầu của khách hàng trên khắp nước Việt
                                    Nam.</p>

                                <p className="mt-3"> Chúng tôi đặt mục tiêu trở thành sàn thương mại điện tử
                                    hàng đầu
                                    Việt Nam chuyên về sản phẩm văn phòng, học cụ, dụng cụ mỹ thuật và tất cả các sản
                                    phẩm liên quan đến giáo dục.</p>

                                <h4 className="about_heading text-capitalize font-weight-bold mt-4"> Giá trị chúng tôi
                                    mang đến cho khách hàng.</h4>

                                <p className="mt-3"> Thienlong xác định luôn trung thành với những giá trị
                                    cốt lõi của mình để luôn là sự lựa chọn hàng đầu của người tiêu dùng:</p>

                                <p className="mt-3"> - Hệ thống sản phẩm phong phú và đa dạng.</p>
                                <p className="mt-3"> - Thanh toán bảo mật, an toàn.</p>
                                <p className="mt-3"> - Giao hàng nhanh chóng trong 48 giờ.</p>
                                <p className="mt-3"> - Nền tảng công nghệ hiện đại, giao dịch thuận tiện
                                    nhanh chóng.</p>

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="img_about mt-3">
                                <img src="https://file.hstatic.net/1000230347/file/picture1.png" alt=""
                                     className="img-fluid mx-auto d-block"/>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-lg-4">
                            <div className="about_content_box_all mt-3">
                                <div className="about_detail text-center">
                                    <div className="about_icon">
                                        <i className="fas fa-pencil-alt"></i>
                                    </div>
                                    <h5 className="mt-3 font-weight-bold">Thiết Kế Sáng
                                        Tạo</h5>
                                    <p className="edu_desc mt-3 mb-0 ">Thiên Long cung cấp các sản phẩm văn
                                        phòng phẩm với thiết kế sáng tạo, đáp ứng nhu cầu đa dạng của khách hàng.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="about_content_box_all mt-3">
                                <div className="about_detail text-center">
                                    <div className="about_icon">
                                        <i className="fab fa-angellist"></i>
                                    </div>
                                    <h5 className="mt-3 font-weight-bold">Chất Lượng Tốt
                                        Nhất</h5>
                                    <p className="edu_desc mb-0 mt-3 ">Chúng tôi cam kết mang đến sản phẩm văn
                                        phòng phẩm chất lượng cao, giúp khách hàng đạt được kết quả tốt nhất.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="about_content_box_all mt-3">
                                <div className="about_detail text-center">
                                    <div className="about_icon">
                                        <i className="fas fa-paper-plane"></i>
                                    </div>
                                    <h5 className="mt-3 font-weight-bold">Nền Tảng Tốt
                                        Nhất</h5>
                                    <p className="edu_desc mb-0 mt-3 ">Thiên Long mang đến nền tảng mua sắm
                                        trực tuyến tiện lợi, giúp khách hàng dễ dàng chọn mua văn phòng phẩm chất
                                        lượng.</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>
        </div>
    );
}

export default memo(AboutPage);