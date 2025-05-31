const importAll = (r) =>
    r
        .keys()
        .sort()
        .map((key) => ({
            url: r(key),
            alt: key.replace('./', '').replace(/\.\w+$/, ''),
        }));

const imageData = importAll(
    require.context('./', false, /\.(png|jpe?g|webp|svg|gif)$/)
);

// Danh sách thông tin kèm href, title
const hrefAndTitles = [
    { href: "/uu-dai", title: "Cẩm nang ưu đãi" },
    { href: "/san-pham-moi", title: "Sản phẩm mới" },
    { href: "/outlet", title: "Outlet chính hãng" },
    { href: "/in-an", title: "Giải pháp in ấn" },
    { href: "/van-phong-pham", title: "Văn phòng phẩm doanh nghiệp" },
    { href: "/top-sale", title: "Top sale" },
    { href: "/kiem-tra-don-hang", title: "Kiểm tra đơn hàng" },
];

const hotProductsHomePage = imageData.map((img, index) => ({
    id: `${index + 1}`,
    title: hrefAndTitles[index]?.title || "",
    href: hrefAndTitles[index]?.href || "#",
    images: [img],
}));
export default hotProductsHomePage;