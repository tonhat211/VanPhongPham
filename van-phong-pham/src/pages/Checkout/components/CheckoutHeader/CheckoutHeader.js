import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import styles from './CheckoutHeader.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function CheckoutHeader() {

    return (
        <div className={cx('wrapper')}>
            <div className='grid-col-1'>
                <Link to="/" className={classNames(cx('logo-container'))}>
                    <img src={images.logo} alt="Thien Long" className={classNames(cx('logo'))} />
                </Link>
            </div>
        
        </div>
    );
}

export default CheckoutHeader;
