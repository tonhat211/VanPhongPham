import classNames from 'classnames/bind';

import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={classNames(cx('wrapper'))}>
            <div className={classNames(cx('container'))}>
                <p className={classNames(cx('loading-item'))}>T</p>
                <p className={classNames(cx('loading-item'))}>h</p>
                <p className={classNames(cx('loading-item'))}>i</p>
                <p className={classNames(cx('loading-item'))}>e</p>
                <p className={classNames(cx('loading-item'))}>n</p>
                <p className={classNames(cx('loading-item'))}>L</p>
                <p className={classNames(cx('loading-item'))}>o</p>
                <p className={classNames(cx('loading-item'))}>n</p>
                <p className={classNames(cx('loading-item'))}>g</p>
                <p className={classNames(cx('loading-item'))}>.</p>
                <p className={classNames(cx('loading-item'))}>.</p>
                <p className={classNames(cx('loading-item'))}>.</p>
            </div>
        </div>
    );
}

export default Loading;