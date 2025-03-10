import {memo} from 'react';
import "./policyStyle.scss"
function PolicyPage(){
    return (
       <div className='policy-container'>
             <div className='policy-wrap'>
             <div className='heading-bar'>
                <h1>
                    <a href='#'>Chính sách bảo mật thông tin</a>
                </h1>
             </div>
             <div className='policy-content'>
                <p className='text-align'>
                    <strong >1. Mục đích thu thập thông tin</strong>
                </p>
                <p>Việc thu thập dữ liệu chủ yếu trên Website thương mại điện tử thienlong.vn bao gồm: email, điện thoại, địa chỉ, tên đăng nhập, mật khẩu đăng nhập. Đây là các thông tin mà thienlong.vn cần khách hàng cung cấp bắt buộc khi đăng ký sử dụng dịch vụ và thienlong.vn sử dụng nhằm liên hệ xác nhận khi khách hàng đăng ký mua hàng trên website nhằm đảm bảo quyền lợi cho khách hàng.</p>
                <p>Khách hàng sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng dịch vụ dưới tên đăng ký, mật khẩu và hộp thư điện tử của mình. Ngoài ra, khách hàng có trách nhiệm thông báo kịp thời cho thienlong.vn về những hành vi sử dụng trái phép, lạm dụng, vi phạm bảo mật, lưu giữ tên đăng ký và mật khẩu của bên thứ ba để có biện pháp giải quyết phù hợp.</p>
                <p className='text-align'>2. Phạm vi sử dụng thông tin</p>
                <p>Website thương mại điện tử thienlong.vn sử dụng thông tin khách hàng cấp để:</p>
                <ul>
                    <li>Cung cấp các dịch vụ liên quan đến khách hàng.</li>
                    <li>Gửi các thông báo về các hoạt động trao đổi thông tin giữa khách hàng và thienlong.vn</li>
                    <li>Ngăn ngừa các hoạt động phá hoại tài khoản người dùng của khách hàng hoặc các hoạt động giả mạo khách hàng.</li>
                    <li>Liên lạc và giải quyết với khách hàng trong những trường hợp đặc biệt.</li>
                    <li>Không sử dụng thông tin cá nhân của khách hàng ngoài mục đích xác nhận và liên hệ có liên quan đến giao dịch tại thienlong.vn.</li>
                    <li>hienlong.vn có trách nhiệm hợp tác cung cấp thông tin cá nhân khách hàng khi có yêu cầu từ cơ quan nhà nước có thẩm quyền. Ngoài ra, không ai có quyền xâm phạm vào thông tin cá nhân của khách hàng.</li>
                </ul>
                <p className='text-align' >3. Về thời gian lưu trữ thông tin</p>
                <p> Dữ liệu cá nhân của khách hàng sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ từ khách hàng. Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ của thienlong.vn.</p>
                <p className='text-align'>4. Cam kết bảo mật thông tin khách hàng</p>
                <p>Thông tin cá nhân của khách hàng trên thienlong.vn được cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của thienlong.vn. Việc thu thập và sử dụng thông tin của mỗi khách hàng chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp luật có quy định khác, thienlong.vn cam kết:</p>
                <ul>
                    <li>Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân của khách hàng khi không có sự cho phép đồng ý từ khách hàng.</li>
                    <li>Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân của khách hàng, thienlong.vn sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho khách hàng được biết.</li>
                    <li>Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của khách hàng bao gồm thông tin hóa đơn chứng từ số hóa tại khu vực dữ liệu trung tâm an toàn của thienlong.vn</li>
                </ul>
             </div>
        </div>
       </div>
    );
}
export default memo(PolicyPage);