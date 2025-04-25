import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

function StarRating({ rate, onChange, isRateNumShow = false }) {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        stars.push(
            <FontAwesomeIcon
                key={i}
                icon={rate >= i ? faStar : faStarHalfAlt}
                style={{ color: rate >= i ? '#facc15' : '#d1d5db', cursor: onChange ? 'pointer' : 'default' }}
                onClick={() => onChange && onChange(i)}
            />
        );
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {stars}
            {isRateNumShow && (
                <span style={{ marginLeft: '8px', fontSize: '14px', color: '#555' }}>
                    {rate.toFixed(1)} / 5
                </span>
            )}
        </div>
    );
}

export default StarRating;
