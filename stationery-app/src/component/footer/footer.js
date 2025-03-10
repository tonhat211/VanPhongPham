import {memo} from "react"
import Icon from '@mdi/react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBInput, MDBIcon, MDBBtn }  from 'mdb-react-ui-kit';
function Footer(){
    return (
        
        <MDBFooter   className='text-center  text-lg-start text-muted'>
          <section className='' style={{ backgroundColor: "rgba(38, 89, 243, 1)" }}>
            <MDBContainer className='text-center text-md-start mt-5 p-2'>
              <MDBRow className='mt-3'>
                <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4 text-light'>
                  <h6 className='text-uppercase fw-bold mb-4'>
                    <MDBIcon color='secondary' icon='gem' className='me-3 text-light' />
                    Thienlong.vn
                  </h6>
                  <p >
                  Công ty Cổ Phần Tập Đoàn Thiên Long
                GPĐKKD số 0301464830 do Sở KHĐT TP. Hồ Chí Minh cấp ngày 14/03/2005
                  </p>
                </MDBCol>
    
                <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4 text-light'>
                  <h6 className='text-uppercase fw-bold mb-4'>ĐỊA CHỈ CÔNG TY</h6>
                  <p>
                    <a href='#!' className='text-reset'>
                    Head Office: Tầng 10, Sofic Tower, Số 10 Đường Mai Chí Thọ, Phường Thủ Thiêm, Thành Phố Thủ Đức, Thành Phố Hồ Chí Minh, Việt Nam
                    </a>
                  </p>
                </MDBCol>
    
                <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4 text-light'>
                  <h6 className='text-uppercase fw-bold mb-4'>HỖ TRỢ KHÁCH HÀNG
                    Hotline: 1900 866 819
                    </h6>
                  <p>
                    <a href='#!' className='text-reset'>
                    Hướng dẫn mua hàng
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                    Chính sách mua hàng
                    </a>
                  </p>
                  <p>
                    <a href='#!' className='text-reset'>
                      Sản phẩm giá tốt
                    </a>
                  </p>
                </MDBCol>
    
                <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4 text-light'>
                  <h6 className='text-uppercase fw-bold mb-4'>VỀ THIENLONG.VN</h6>
                  <p>
                    Giới thiệu
                  </p>
                  <p>
                    Chính sách bảo mật
                  </p>
                  <p>
                    Thông tin liên hệ
                  </p>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
    
          <div className='text-center p-2 text-light' style={{ backgroundColor: "rgba(0, 60, 209, 1)" }}>
            © 2021 Copyright:
            <a className='text-reset fw-bold' href='/home'>
              Công ty Thiên Long
            </a>
          </div>
        </MDBFooter>
      );
}
export default memo(Footer);