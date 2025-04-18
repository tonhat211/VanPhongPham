import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Pagination({ totalPages, currentPage, onPageChange }) {
    const pages = [];

    // Nút "Previous"
    pages.push(
        <button key="prev" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            <i>
                <FontAwesomeIcon icon={faAngleLeft} />
            </i>
        </button>,
    );

    // Trang đầu
    pages.push(
        <button key={1} className={cx({ active: currentPage === 1 })} onClick={() => onPageChange(1)}>
            1
        </button>,
    );

    // Dấu "..."
    if (currentPage - 2 > 2) {
        pages.push(<span key="start-ellipsis">...</span>);
    }

    // Trang liền trước
    if (currentPage - 1 > 1) {
        pages.push(
            <button key={currentPage - 1} onClick={() => onPageChange(currentPage - 1)}>
                {currentPage - 1}
            </button>,
        );
    }

    // Trang hiện tại
    if (currentPage !== 1 && currentPage !== totalPages) {
        pages.push(
            <button key={currentPage} className={cx('active')}>
                {currentPage}
            </button>,
        );
    }

    // Trang liền sau
    if (currentPage + 1 < totalPages) {
        pages.push(
            <button key={currentPage + 1} onClick={() => onPageChange(currentPage + 1)}>
                {currentPage + 1}
            </button>,
        );
    }

    // Dấu "..."
    if (currentPage + 2 < totalPages - 1) {
        pages.push(<span key="end-ellipsis">...</span>);
    }

    // Trang cuối
    if (totalPages > 1) {
        pages.push(
            <button
                key={totalPages}
                className={cx({ active: currentPage === totalPages })}
                onClick={() => onPageChange(totalPages)}
            >
                {totalPages}
            </button>,
        );
    }

    // Nút "Next"
    pages.push(
        <button key="next" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            <i>
                <FontAwesomeIcon icon={faAngleRight} />
            </i>
        </button>,
    );

    return <div className={cx('pagination')}>{pages}</div>;
}
export default Pagination;
