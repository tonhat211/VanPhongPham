import './ReviewAndRating.scss';
import { useState } from 'react';
import reviews from '~/data/Review';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import productsData from '~/data/productData';

function ReviewAndRating({ product }) {
    const [selectedRating, setSelectedRating] = useState(null);
    const [hoverRating, setHoverRating] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('newest'); // newest | oldest
    const reviewsPerPage = 3;

    const productReviews = product.reviews;

    let filteredReviews = selectedRating
        ? productReviews.filter((r) => r.rating === selectedRating)
        : productReviews;

    filteredReviews = [...filteredReviews].sort((a, b) => {
        if (sortOrder === 'newest') return b.id - a.id;
        return a.id - b.id;
    });

    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
    const paginatedReviews = filteredReviews.slice(
        (currentPage - 1) * reviewsPerPage,
        currentPage * reviewsPerPage
    );

    const handleRatingClick = (rating) => {
        setSelectedRating(rating === selectedRating ? null : rating);
        setCurrentPage(1);
    };

    return (
        <div className="review-rating-container">
            <h3>Đánh giá sản phẩm: {product?.name}</h3>
            <div className="rating-summary">
                {/*<div className="rating-total-star">*/}

                {/*</div>*/}
                <div className="star-warpper-container">
                    <h3>Đánh giá sản phẩm</h3>
                    <div className="star-hover-wrapper">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star-icon ${
                                    (hoverRating || selectedRating) >= star ? 'active' : ''
                                }`}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(null)}
                                onClick={() => setShowPopup(true)}
                            >
                            {(hoverRating || selectedRating) >= star ? (
                                <StarIcon />
                            ) : (
                                <StarBorderIcon />
                            )}
                        </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Popup đánh giá */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h4>ĐÁNH GIÁ SẢN PHẨM</h4>
                        <div className="popup-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`popup-star ${selectedRating >= star ? "active" : ""}`}
                                    onClick={() => setSelectedRating(star)}
                                >
                                    {selectedRating >= star ? <StarIcon /> : <StarBorderIcon />}
                                </span>
                            ))}
                        </div>
                        <textarea
                            placeholder="Hãy chia sẻ đánh giá của bạn về sản phẩm"
                            maxLength={500}
                        ></textarea>
                        <div className="image-upload">
                            <label>Hình ảnh đánh giá</label>
                            <div className="upload-box">+</div>
                        </div>
                        <div className="popup-buttons">
                            <button onClick={() => setShowPopup(false)}>Hủy</button>
                            <button>Gửi đánh giá</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Bộ lọc đánh giá */}
            <div className="filter-bar">
                <span>Lọc đánh giá:</span>
                {[5, 4, 3, 2, 1].map((star) => (
                    <button
                        key={star}
                        className={selectedRating === star ? "active" : ""}
                        onClick={() => handleRatingClick(star)}
                    >
                        {star} sao
                    </button>
                ))}

                <select
                    className="sort-select"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="newest">Từ mới đến cũ</option>
                    <option value="oldest">Từ cũ đến mới</option>
                </select>
            </div>

            {/* Danh sách đánh giá */}
            <div className="review-list">
                {paginatedReviews.map((item) => (
                    <div key={item.id} className="review-item">
                        <div className="review-stars">
                            {[...Array(item.rating)].map((_, i) => (
                                <StarIcon key={i} className="review-star filled" />
                            ))}
                        </div>
                        <p>{item.content}</p>
                        <span className="review-email">{item.userName}</span>
                    </div>
                ))}
            </div>

            {/* Phân trang */}
            <div className="pagination-controls">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span>
                    {currentPage}/{totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default ReviewAndRating;