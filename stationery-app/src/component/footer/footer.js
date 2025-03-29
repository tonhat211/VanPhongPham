import {memo} from "react"
import Icon from '@mdi/react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBInput, MDBIcon, MDBBtn }  from 'mdb-react-ui-kit';
import logo from '../../resource/logo.webp';
function Footer(){
    return (

        <MDBFooter   className='text-center  text-lg-start text-muted'>
          <section className='' style={{ backgroundColor: "#ffffff" }}>
            <MDBContainer className='text-center text-md-start mt-5 p-2'>
              <MDBRow className='mt-3'>
                <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                  <h6 className='fw-bold mb-3'>
                    <img className="img-fluid" src={logo} alt="Thiên Long"/>
                  </h6>
                  <p style={{fontSize: '14px', color: '#666', lineHeight: '1.6'}}>
                    <strong style={{fontSize: '14px', color: '#000', fontWeight: 'bold'}}>
                      Công ty Cổ Phần Tập Đoàn Thiên Long
                    </strong>
                    <br/>
                    GPĐKKD số 0301464830 do Sở KHĐT TP. Hồ Chí Minh cấp ngày 14/03/2005.
                  </p>

                </MDBCol>

                <MDBCol md='3' lg='3' xl='3' className='mx-auto mb-4'>
                  <h6 className='fw-bold mb-3' style={{color: '#17479d'}}>ĐỊA CHỈ CÔNG TY</h6>
                  <p style={{fontSize: '14px', color: '#666', lineHeight: '1.6'}}>
                    <strong style={{ fontSize: '14px', color: '#000', fontWeight: 'bold' }} >Head Office:</strong> Tầng 10, Sofic Tower, Số 10 Đường Mai Chí Thọ, Phường Thủ Thiêm, TP Thủ Đức, TP Hồ Chí Minh, Việt Nam.
                  </p>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                    <strong style={{ fontSize: '14px', color: '#000', fontWeight: 'bold' }}>Miền Bắc:</strong> Số 38, đường Gamuda Gardens 2-5, KĐT C2 - Gamuda Gardens, Hoàng Mai, Hà Nội.
                  </p>
                </MDBCol>

                <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
                  <h6 className='fw-bold mb-3' style={{ color: '#17479d' }}>HỖ TRỢ KHÁCH HÀNG</h6>
                  <p style={{ fontSize: '14px', color: '#000', fontWeight: 'bold' }}>Hotline: 1900 866 819</p>
                  <p style={{ fontSize: '14px', color: '#000', fontWeight: 'bold'}}>Thứ 2 - Thứ 6 (8h - 17h)</p>
                  <p style={{ fontSize: '14px', color: '#000', fontWeight: 'bold' }}>salesonline@thienlongvn.com</p>
                  <p style={{ fontSize: '14px', color: '#666' }}>Hướng dẫn mua hàng</p>
                  <p style={{ fontSize: '14px', color: '#666' }}>Chính sách giao hàng</p>
                  <p style={{ fontSize: '14px', color: '#666' }}>Chính sách đổi trả & hoàn tiền</p>
                </MDBCol>

                <MDBCol md='3' lg='3' xl='3' className='mx-auto mb-4'>
                  <h6 className='fw-bold mb-3' style={{ color: '#17479d' }}>VỀ THIENLONG.VN</h6>
                  <p style={{ fontSize: '14px', color: '#666' }}>Giới thiệu</p>
                  <p style={{ fontSize: '14px', color: '#666' }}>Dịch vụ in ấn quảng cáo</p>
                  <p style={{ fontSize: '14px', color: '#666' }}>Chính sách bảo mật chung</p>
                  <p style={{ fontSize: '14px', color: '#666' }}>Chính sách bảo mật thông tin cá nhân</p>
                  <p style={{ fontSize: '14px', color: '#666' }}>Thông tin liên hệ</p>
                </MDBCol>

              </MDBRow>
            </MDBContainer>
          </section>

          <div className='text-center p-2' style={{ backgroundColor: "#e8efff", color: '#3b71ca' }}>
            © 2021 Copyright - Bản quyền thuộc Tập đoàn Thiên Long

          </div>
        </MDBFooter>
      );
}
export default memo(Footer);