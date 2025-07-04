import productsData from '~/data/productData';
import { useState } from 'react';
import Button from '@mui/material/Button';
import './ProductDetailsDiscription.scss';
import useI18n from '~/hooks/useI18n';

function ProductDetailsDiscription({ description = [] }) {
    const { t, lower } = useI18n();
    // const product = productsData.find(item => item.id === productId);
    const [isExpanded, setIsExpanded] = useState(false);
    const maxContentLength = 1;

    const renderDescription = () => {
        const itemsToRender = isExpanded
            ? Array.isArray(description)
                ? description
                : []
            : Array.isArray(description)
            ? description.slice(0, maxContentLength)
            : [];
        return itemsToRender.map((item, index) => {
            if (item.type === 'text') {
                return (
                    <div key={index} className="description_text">
                        {item.label && <h4 className="label">{item.label}</h4>}
                        <p>{item.content}</p>
                    </div>
                );
            } else if (item.type === 'list') {
                return (
                    <div key={index} className="description_list">
                        {item.label && <h4 className="label">{item.label}</h4>}
                        <ul>
                            {item.items.map((point, idx) => (
                                <li key={idx}>{point}</li>
                            ))}
                        </ul>
                    </div>
                );
            } else if (item.type === 'image') {
                return (
                    <div key={index} className="description_images">
                        {item.images &&
                            item.images.map((img, i) => (
                                <div key={i} className="description_image">
                                    <img src={img.url} alt={img.alt || `image-${i}`} />
                                </div>
                            ))}
                    </div>
                );
            }
            return null;
        });
    };

    return (
        <div className="description_container">
            <h2> {t('productDiscript.title')}</h2>
            <div className="warp_descript">
                <div className={`description_content ${isExpanded ? 'expanded' : ''}`}>{renderDescription()}</div>
                <div className="btn_wrapper">
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="toggle_btn"
                    >
                        {isExpanded ? t('productDiscript.collapse') : t('productDiscript.expand')}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsDiscription;
