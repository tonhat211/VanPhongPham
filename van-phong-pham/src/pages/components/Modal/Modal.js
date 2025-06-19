import React from 'react';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    return (
        <div className={cx('modal-overlay')} onClick={onClose}>
            <div className={classNames(cx('modal-content'), 'max-w-60 max-w-80-tab max-w-80-mob')} onClick={(e) => e.stopPropagation()}>
                <button className={cx('close-btn')} onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
