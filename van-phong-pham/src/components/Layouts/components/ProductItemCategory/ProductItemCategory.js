import { ProductItem } from '~/pages/components';
import productList from '~/data/productList';
import classNames from 'classnames/bind';
import styles from './ProductItemCategory.scss';

const cx = classNames.bind(styles);
function ProductItemCategory({ categoryID }) {
    const filteredList = productList.filter(item => Number(item.categoryID) === Number(categoryID)).slice(0, 8);

    console.log('productList:', productList);
    console.log('filteredList:', filteredList);
    console.log('categoryID:', categoryID);

    return (
        <div className={cx('product-list')}>
            {filteredList.map(item => (
                <ProductItem key={item.id} item={item} />
            ))}
        </div>
    );
}

export default ProductItemCategory;