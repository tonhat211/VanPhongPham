export const getLabelKeyFromSlug = (slug) => {
    const map = {
      'products': 'products',
      'but-viet': 'pen',
      'giay': 'paper',
      'search': 'search',
    };
  
    return map[slug] || slug; // fallback nếu không có key
  };
  