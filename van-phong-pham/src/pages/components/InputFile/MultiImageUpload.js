import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './ImageUpload.module.scss';

const cx = classNames.bind(styles);

const MultiImageUpload = ({ initialImages = [], onImagesChange, isDisabled = false }) => {
    const [currentImages, setCurrentImages] = useState([...initialImages]); // ảnh cũ + ảnh mới
    const inputRef = useRef();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));

        setCurrentImages((prev) => [...prev, ...newImages]);
    };

    const handleRemoveImage = (index) => {
        const updated = [...currentImages];

        // nếu là ảnh blob thì thu hồi bộ nhớ
        const img = updated[index];
        if (img?.file && img?.url?.startsWith('blob:')) {
            URL.revokeObjectURL(img.url);
        }

        updated.splice(index, 1);
        setCurrentImages(updated);
    };

    // Gửi sự thay đổi ra ngoài
    useEffect(() => {
        const added = currentImages.filter((img) => img.file); // ảnh mới
        const kept = currentImages.filter((img) => img.id); // ảnh cũ giữ lại
        const removed = initialImages.filter((init) => !currentImages.find((curr) => curr.id === init.id)); // ảnh cũ bị xoá

        onImagesChange?.({ added, kept, removed });
    }, [currentImages]);

    return (
        <div>
            <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                disabled={isDisabled}
            />

            <div className={cx('imgs-container')}>
                {currentImages ? (
                    currentImages.map((img, index) => (
                        <div key={index} className={classNames(cx('img-container'), 'grid-col-3')}>
                            <img src={img.url} alt={`preview-${index}`} />
                            <i className={cx('remove-btn')} onClick={() => handleRemoveImage(index)}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </i>
                        </div>
                    ))
                ) : (
                    <p className="note">Không có imgs</p>
                )}
            </div>
        </div>
    );
};

export default MultiImageUpload;
