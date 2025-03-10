import productsData from "../../../data/Product/productData";
import './ProductDiscriptionStyles.scss'
function ProductDiscription({ productId }) {
    const product = productsData.find(item => item.id === productId);

    const name = product.name;
    const descript = product.descript;
    const characteristic =  product.characteristic
        ? product.characteristic.split('\n\n-').map((item, index) => (
        <span key={index}>{item.trim() ? `- ${item.trim()}` : ''}<br/></span>
    )) : null;
    const improvement = product.improvement
        ? product.improvement.split('\n\n-').map((item, index) => (
        <span key={index}>{item.trim() ? `- ${item.trim()}` : ''}<br/></span>
    )) : null;

    return (
        <div className="description_container">
            <h2> Mô tả sản phẩm</h2>
            <div className="warp_descript">
                <div className="name_p">
                    <h4 className="label"> Tên sản phẩm: </h4>
                    <span>  {name}</span>
                </div>
                {product.category !== 'books' && (
                    <>
                        <div className="characteristic_p">
                            <h4 className="label">Đặc điểm sản phẩm: </h4>
                            <span> {characteristic}</span>
                        </div>
                        <div className="improvement_p">
                            <h4 className="label"> Cải tiến: </h4>
                            <span> {improvement}</span>
                        </div>
                    </>
                )}
                <p>{descript}</p>
            </div>

        </div>
    );
}

export default ProductDiscription;