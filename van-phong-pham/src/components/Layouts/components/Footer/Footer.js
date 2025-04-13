import images from '~/assets/images';

function Footer() {
    return  (
        <footer className="text-center lg:text-left text-gray-500">
            {/* Phần nội dung chính */}
            <section className="bg-white">
                <div className="max-w-screen-xl mx-auto px-4 py-4">
                    <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-5">
                        {/* Cột 1: Logo & Giới thiệu */}
                        <div>
                            <h6 className="font-bold mb-3">
                                <img src={images.logo} alt="Thiên Long" className="max-w-[200px] mx-auto lg:mx-0" />
                            </h6>
                            <p className="text-xl text-[var(--text-third-color) leading-relaxed">
                                <strong className="text-2xl text-black font-bold">
                                    Công ty Cổ Phần Tập Đoàn Thiên Long
                                </strong>
                                <br />
                                GPĐKKD số 0301464830 do Sở KHĐT TP. Hồ Chí Minh cấp ngày 14/03/2005.
                            </p>
                        </div>
                        {/* Cột 2: Địa chỉ công ty */}
                        <div>
                            <h6 className="font-bold mb-3 text-[var(--header-color)] text-2xl">ĐỊA CHỈ CÔNG TY</h6>
                            <p className="text-xl text-[var(--text-third-color) leading-relaxed mb-2">
                                <strong className="text-[var(--header-color)] font-bold">Head Office:</strong> Tầng 10, Sofic Tower, Số 10 Đường Mai Chí Thọ, Phường Thủ Thiêm, TP Thủ Đức, TP Hồ Chí Minh, Việt Nam.
                            </p>
                            <p className="text-xl text-[var(--text-third-color) leading-relaxed">
                                <strong className="text-[var(--header-color)] font-bold">Miền Bắc:</strong> Số 38, đường Gamuda Gardens 2-5, KĐT C2 - Gamuda Gardens, Hoàng Mai, Hà Nội.
                            </p>
                        </div>
                        {/* Cột 3: Hỗ trợ khách hàng */}
                        <div>
                            <h6 className="font-bold mb-3 text-[var(--header-color)] text-2xl">HỖ TRỢ KHÁCH HÀNG</h6>
                            <p className="text-xl text-[var(--header-color)] font-bold mb-1">Hotline: 1900 866 819</p>
                            <p className="text-xl text-black font-bold mb-1">Thứ 2 - Thứ 6 (8h - 17h)</p>
                            <p className="text-xl text-black font-bold mb-1">salesonline@thienlongvn.com</p>
                            <p className="text-xl text-[var(--text-third-color)">Hướng dẫn mua hàng</p>
                            <p className="text-xl text-[var(--text-third-color)">Chính sách giao hàng</p>
                            <p className="text-xl text-[var(--text-third-color)">Chính sách đổi trả & hoàn tiền</p>
                        </div>
                        {/* Cột 4: Về thienlong.vn */}
                        <div>
                            <h6 className="font-bold mb-3 text-[var(--header-color)] text-2xl">VỀ THIENLONG.VN</h6>
                            <p className="text-xl text-[var(--text-third-color) mb-1">Giới thiệu</p>
                            <p className="text-xl text-[var(--text-third-color) mb-1">Dịch vụ in ấn quảng cáo</p>
                            <p className="text-xl text-[var(--text-third-color) mb-1">Chính sách bảo mật chung</p>
                            <p className="text-xl text-[var(--text-third-color) mb-1">Chính sách bảo mật thông tin cá nhân</p>
                            <p className="text-xl text-[var(--text-third-color)]">Thông tin liên hệ</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Phần dưới cùng */}
            <div className="text-center text-2xl p-2 bg-[#e8efff] text-[var(--header-color)]">
                © 2021 Copyright - Bản quyền thuộc Tập đoàn Thiên Long
            </div>
        </footer>
    );
}

export default Footer;