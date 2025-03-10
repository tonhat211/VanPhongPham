
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from '../redux/actions';

const LoadData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Tạo dữ liệu sản phẩm giả
    const products = [...Array(20)].map(() => ({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.random.image(),
      inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
      fastDelivery: faker.datatype.boolean(),
      ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
    }));

    // Dispatch action để lưu dữ liệu vào Redux store
    dispatch(setProducts(products));
  }, [dispatch]);

  return null; // Component này chỉ dùng để tải dữ liệu và không cần render gì
};

export default LoadData;