function addToRecentlyViewed(product) {
  console.log('recentlyViewedProducts');
  const key = 'recentlyViewedProducts';
  let viewed = JSON.parse(localStorage.getItem(key)) || [];

  viewed = viewed.filter(p => p.id !== product.id);

  viewed.unshift(product);

  if (viewed.length > 10) {
    viewed = viewed.slice(0, 10);
  }

  localStorage.setItem(key, JSON.stringify(viewed));
}

export default addToRecentlyViewed;
