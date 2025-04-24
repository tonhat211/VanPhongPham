export const getLabelKeyFromSlug = (slug) => {
    const map = {
      'products': 'products',
      'but-viet': 'pen',
      'giay': 'paper',
    };
  
    return map[slug] || slug; // fallback nếu không có key
  };
  