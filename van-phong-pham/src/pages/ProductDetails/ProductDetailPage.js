import './ProductDetailPage.scss';
import ProductImageGallery from '~/components/Layouts/components/ProductDetail/ProductImageGallery';
import ProductsDetailsInfo from '~/components/Layouts/components/ProductDetail/ProductsDetailsInfo';
import ProductDetailsDiscription from '~/components/Layouts/components/ProductDetail/ProductDetailsDiscription';
import ReviewAndRating from '~/components/Layouts/components/ProductDetail/ReviewAndRating';
import CarouselCards from '~/components/Layouts/components/ProductDetail/carouselCards/CarouselCards';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductDetail } from '~/api/productApi';
import { DatasetRounded } from '@mui/icons-material';
import useI18n from '~/hooks/useI18n';

function ProductDetailPage() {
    const { t, lower } = useI18n();
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductDetail({
            id,
        })
            .then((data) => {
                setProduct(data);
                //    console.log("setProduct:" +JSON.stringify(data,null,2));
            })
            .catch((err) => {
               
            })
    }, [id]);

    useEffect(() => {
        if (product) {
            console.log('Product đã được cập nhật:', JSON.stringify(product, null, 2));
        }
    }, [product]);

    return (
        <div className="product-detail-container">
            {product ? (
                <>
                    <div className="product-detail-section1">
                        <ProductImageGallery images={product.images} />
                        <div className=" pdetails-info ">
                            <ProductsDetailsInfo product={product} />
                        </div>
                    </div>
                    <div className="discript-product-detail-section2">
                        <ProductDetailsDiscription description={JSON.parse(product.description)} />
                    </div>
                    <div className="product-reviewAndRating-section3">
                        <ReviewAndRating product={product} />
                    </div>
                    <div className="carousel-section">
                        <CarouselCards />
                    </div>
                </>
            ) : (
                <p>{t('detail.loading')}</p>
            )}
        </div>
    );
}

export default ProductDetailPage;
