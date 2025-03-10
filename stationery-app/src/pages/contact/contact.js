import { memo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './contactStyle.scss';

function ContactPage() {
    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle the feedback submission, e.g., sending it to a server or email.
        alert(`Email: ${email},\nĐánh Giá: ${feedback}`);
        setFeedback('');
        setEmail('');
        setShowFeedbackModal(false);
    };

    const toggleFeedbackModal = () => {
        setShowFeedbackModal(!showFeedbackModal);
    };

    return (
        <div className="contact-page">
            <h1 className="contact-title">Liên hệ chúng tôi</h1>
            <p className="contact-description">Chúng tôi luôn sẵn sàng lắng nghe từ bạn!</p>

            <div className="contact-section">
                <h2>Địa chỉ</h2>
                <p>123 Đường ABC, Phường XYZ, Quận 123, Thành phố ABC</p>
            </div>

            <div className="contact-section">
                <h2>Điện thoại</h2>
                <p>+84 123 456 789</p>
            </div>

            <div className="contact-section">
                <h2>Email</h2>
                <p>21130588@st.hcmuaf.edu.vn</p>
            </div>

            <div className="contact-section">
                <h2>Theo dõi chúng tôi</h2>
                <div className="social-links">
                    <a href="https://facebook.com" className="social-link facebook">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>

                    <a href="https://instagram.com" className="social-link instagram">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
            </div>

            <div className="contact-section feedback-section">
                <button className="toggle-feedback-btn" onClick={toggleFeedbackModal}>
                    Gửi đánh giá
                </button>
            </div>

            {showFeedbackModal && (
                <div className="feedback-modal">
                    <div className="feedback-modal-content">
                        <span className="close-modal" onClick={toggleFeedbackModal}>&times;</span>
                        <form onSubmit={handleSubmit} className="feedback-form">
                            <div className="form-group">
                                <label>Email của bạn:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                    placeholder="Nhập email của bạn"
                                />
                            </div>
                            <div className="form-group">
                                <label>Đánh giá:</label>
                                <textarea
                                    value={feedback}
                                    onChange={handleFeedbackChange}
                                    required
                                    placeholder="Nhập đánh giá của bạn"
                                />
                            </div>
                            <button type="submit" className="submit-feedback-btn">Gửi đánh giá</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default memo(ContactPage);
