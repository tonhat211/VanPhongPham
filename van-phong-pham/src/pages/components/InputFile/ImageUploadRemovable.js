import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './ImageUpload.module.scss';
import useI18n from '~/hooks/useI18n';

const cx = classNames.bind(styles);

const ImageUploadRemovable = ({ img, onInsert, isDisabled, onDelete, isMultiple = false }) => {
    const { t, lower } = useI18n();
    const [preview, setPreview] = useState(img?.url); // hiển thị mặc định = ảnh gốc
    const [blobUrl, setBlobUrl] = useState(null); // lưu blob để revoke
    const [showConfirm, setShowConfirm] = useState(false); // lưu blob để revoke
    const inputRef = useRef();
    const [currentImages, setCurrentImages] = useState([]); // ảnh cũ + ảnh mới

    const handleImageChange = async (e) => {
        let isAdded;
        if (isMultiple) {
            const files = Array.from(e.target.files);
            const newImages = files.map((file) => ({
                file,
                url: URL.createObjectURL(file),
            }));
            isAdded = await onInsert?.(newImages);
        } else {
            const file = e.target.files[0];
            const newImage = {
                file,
                url: URL.createObjectURL(file),
            };
            isAdded = await onInsert?.(newImage);
        }
        if (isAdded) {
            setPreview(null);
            setCurrentImages([]);
            if (inputRef.current) {
                inputRef.current.value = null;
            }
        }
    };

    const handleRemoveImg = async () => {
        const isSuccess = await onDelete?.(img);
        if (preview && !isMultiple && isSuccess) {
            // tat xac nhan xoa anh sau neu la 1 anh don
            handleCancelRemoveImg();
        }
    };

    const handleConfirmRemoveImg = () => {
        setShowConfirm(true);
    };

    const handleCancelRemoveImg = () => {
        setShowConfirm(false);
    };

    /* nếu prop img thay đổi từ ngoài -> cập nhật preview */
    useEffect(() => {
        if (!blobUrl) setPreview(img?.url || null);
    }, [img, blobUrl]);

    return (
        <>
            {!preview && (
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isDisabled}
                    multiple={isMultiple}
                />
            )}

            {preview && !isMultiple && (
                <div className={cx('img-container', 'grid-col-3')}>
                    <img src={preview} alt="preview" />

                    <i className={cx('remove-btn')} onClick={handleConfirmRemoveImg}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </i>
                    <div className={cx('confirm-delete', { active: showConfirm })}>
                        <p className={cx('heading')}>Xác nhân xóa ảnh</p>
                        <div className="d-flex-space-around" style={{ marginTop: '20px' }}>
                            <button className="btn cancel-btn" onClick={handleCancelRemoveImg}>
                                {t('cancel')}
                            </button>
                            <button className="btn confirm-btn" onClick={handleRemoveImg}>
                                {t('confirm')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className={cx('imgs-container')}>
                {currentImages ? (
                    currentImages.map((img, index) => (
                        <div key={index} className={classNames(cx('img-container'), 'grid-col-3')}>
                            <img src={img.url} alt={`preview-${index}`} />
                            <i className={cx('remove-btn')}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </i>
                        </div>
                    ))
                ) : (
                    <p className="note">Không có imgs</p>
                )}
            </div>
        </>
    );
};

export default ImageUploadRemovable;
