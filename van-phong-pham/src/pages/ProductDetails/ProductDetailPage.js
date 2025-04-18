import './ProductDetailPage.scss'
import ProductImageGallery from '~/components/Layouts/components/ProductDetail/ProductImageGallery';
import ProductsDetailsInfo from '~/components/Layouts/components/ProductDetail/ProductsDetailsInfo';
import ProductDetailsDiscription from '~/components/Layouts/components/ProductDetail/ProductDetailsDiscription';
import ReviewAndRating from '~/components/Layouts/components/ProductDetail/ReviewAndRating';

function ProductDetailPage() {
    const productId = "600022385";
    return (
            <div className="product-detail-container">
                <div className="product-detail-section1">
                    <ProductImageGallery productId={productId}/>
                    <div className=" pdetails-info ">
                        <ProductsDetailsInfo productId={productId} />
                    </div>
                </div>
                <div className="discript-product-detail-section2">
                    <ProductDetailsDiscription productId={productId}/>
                </div>
                <div className="product-reviewAndRating-section3">
                    <ReviewAndRating productId={productId}/>
                </div>
        </div>


    );
}

export default ProductDetailPage;