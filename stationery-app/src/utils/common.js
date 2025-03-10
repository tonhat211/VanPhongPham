export function formatPrices(price) {
    return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(price);
}

export function formatPercentage(decimalValue) {
    // Chuyển đổi số thập phân thành phần trăm và định dạng với 2 chữ số thập phân
    return (decimalValue * 100) + '%';
}
