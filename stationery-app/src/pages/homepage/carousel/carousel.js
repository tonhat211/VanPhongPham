import {memo} from 'react';
import React from 'react';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./carouselStyle.scss";
import img1 from '../../../resource/baner1.webp';
import img2 from '../../../resource/baner2.webp';
import img3 from '../../../resource/baner3.webp';
import img4 from '../../../resource/baner4.webp';

// Import hình ảnh từ thư mục local


function CustomeCarousel(){
    
    return (
        <div className="top-carousel">
        <MDBCarousel showControls showIndicators>
          <MDBCarouselItem itemId={1}>
            <img src={img1} className="d-block w-100" alt="First slide" />
          </MDBCarouselItem>
          <MDBCarouselItem itemId={2}>
            <img src={img2} className="d-block w-100" alt="Second slide" />
          </MDBCarouselItem>
          <MDBCarouselItem itemId={3}>
            <img src={img3} className="d-block w-100" alt="Third slide" />
          </MDBCarouselItem>
          <MDBCarouselItem itemId={4}>
            <img src={img4} className="d-block w-100" alt="Third slide" />
          </MDBCarouselItem>
        </MDBCarousel>
      </div>
    );
}
export default memo(CustomeCarousel)