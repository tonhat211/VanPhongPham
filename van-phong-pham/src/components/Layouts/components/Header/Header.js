import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import images from '~/assets/images';
import Search from '../Search';
const cx = classNames.bind(styles);
function Header() {
    return (
        <header className={classNames(cx('wrapper'), 'grid')}>
            <div className={classNames('grid-row')}>
                <div className='grid-col-2'>
                    <img src={images.logo} alt='Thien Long' className={classNames(cx('logo'))}/>
                </div>
                <Search />

            </div>
           
        </header>
    )
}

export default Header;