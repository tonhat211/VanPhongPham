import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './ImageUpload.module.scss';

const cx = classNames.bind(styles);

const ImageUpload = ({ img, onImageChange, isDisabled }) => {
    const [preview, setPreview] = useState(img || null); // hiển thị mặc định = ảnh gốc
    const [blobUrl, setBlobUrl] = useState(null); // lưu blob để revoke
    const inputRef = useRef();
    /* chọn file mới */
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        /* thu hồi blob cũ (nếu có) */
        if (blobUrl) URL.revokeObjectURL(blobUrl);

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setBlobUrl(objectUrl);
        onImageChange?.(file); // báo ra ngoài
    };

    /* xoá ảnh mới, quay về ảnh gốc */
    const handleRemoveImg = () => {
        if (blobUrl) {
            URL.revokeObjectURL(blobUrl); // dọn bộ nhớ
            setBlobUrl(null);
        }
        setPreview(img); // trở lại ảnh ban đầu
        onImageChange?.(null); // thông báo: không còn file mới
        if (inputRef.current) {
            inputRef.current.value = ''; 
        }
    };

    /* nếu prop img thay đổi từ ngoài -> cập nhật preview */
    useEffect(() => {
        if (!blobUrl) setPreview(img || null);
    }, [img]);

    return (
        <div>
            <input ref={inputRef} type="file" accept="image/*" onChange={handleImageChange} disabled={isDisabled} />

            {preview && (
                <div className={cx('img-container', 'grid-col-3')}>
                    <img src={preview} alt="preview" />
                    {blobUrl /* chỉ hiển thị nút xoá khi đang xem blob mới */ && (
                        <i className={cx('remove-btn')} onClick={handleRemoveImg}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </i>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
