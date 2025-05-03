import classNames from 'classnames/bind';

import Header from './Header';

import Sidebar from './Sidebar';
import Breadcrumb from './Breadcrumb';

import styles from './AdminLayout.module.scss';
import Footer from '~/components/Layouts/components/Footer';
const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    return (
        <div >
            <Header />
            <div className={cx('wrapper')}>
                <Sidebar />
                <div className={cx('content-container')}>
                    <Breadcrumb />
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default AdminLayout;
