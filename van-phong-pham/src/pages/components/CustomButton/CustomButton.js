import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './CustomButton.module.scss'; 
const cx = classNames.bind(styles);
function CustomButton({title, defaultICon, afterIcon}) {
  return (
    <button className={cx('fancy-button')}>
      <span className={cx('icon-circle')}>
        <FontAwesomeIcon icon={defaultICon} className={cx('default-icon')}/>
        <FontAwesomeIcon icon={afterIcon} className={cx('after-icon')}/>
      </span>
      <span className={cx('label')}>{title}</span>
    </button>
  );
}

export default CustomButton;
