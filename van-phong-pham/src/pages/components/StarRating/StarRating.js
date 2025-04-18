import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

function StarRating({ rate, isRateNumShow }) {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (rate >= i) {
            stars.push(
                <FontAwesomeIcon key={i} icon={faStar} style={{ color: '#facc15' }} />, // vàng đầy
            );
        } else if (rate >= i - 0.5) {
            stars.push(
                <FontAwesomeIcon key={i} icon={faStarHalfAlt} style={{ color: '#facc15' }} />, // vàng nửa
            );
        } else {
            stars.push(
                <FontAwesomeIcon key={i} icon={faStar} style={{ color: '#d1d5db' }} />, // xám
            );
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {stars}
            {isRateNumShow && (
                <span style={{ marginLeft: '8px', fontSize: '14px', color: '#555' }}>{rate.toFixed(1)} / 5</span>
            )}
        </div>
    );
}

export default StarRating;
