import PriceRange from '~/models/PriceRange';

const priceRanges = [
  new PriceRange('Giá dưới 100.000đ', "0-100"),
  new PriceRange('100.000đ - 300.000đ', "100-300"),
  new PriceRange('300.000đ - 500.000đ', "300-500"),
  new PriceRange('500.000đ - 700.000đ', "500-700"),
  new PriceRange('700.000đ - 1.000.000đ', "700-1000"),
  new PriceRange('Giá trên 1.000.000đ', "1000-9999")
 
];

export default priceRanges;