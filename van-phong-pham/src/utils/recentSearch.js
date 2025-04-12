const STORAGE_KEY = 'recentSearches';
const MAX_ITEMS = 10; // Số lượng lịch sử tối đa bạn muốn lưu

// Lấy danh sách tìm kiếm từ localStorage
export const getRecentSearches = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to parse recent searches from localStorage:', error);
    return [];
  }
};

// Lưu từ khóa tìm kiếm mới
export const addRecentSearch = (keyword) => {
  if (!keyword || keyword.trim() === '') return;

  const searches = getRecentSearches();

  // Loại bỏ từ khóa nếu đã tồn tại (để đưa lên đầu)
  const filtered = searches.filter(item => item !== keyword);

  // Thêm từ khóa mới lên đầu danh sách
  const updated = [keyword, ...filtered];

  // Giới hạn số lượng
  if (updated.length > MAX_ITEMS) {
    updated.length = MAX_ITEMS;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

// Xóa một từ khóa
export const removeRecentSearch = (keyword) => {
  const searches = getRecentSearches();
  const updated = searches.filter(item => item !== keyword);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

// Xóa toàn bộ
export const clearRecentSearches = () => {
  localStorage.removeItem(STORAGE_KEY);
};
