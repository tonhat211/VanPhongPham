const importAll = (r) =>
    r
        .keys()
        .sort()
        .map((key, index) => ({
            id: `${index + 1}`,
            images: [
                {
                    url: r(key),
                    alt: key.replace('./', '').replace(/\.\w+$/, ''),
                    href: '#',
                },
            ],
        }));

const midFooterImgs = importAll(
    require.context('./', false, /\.(png|jpe?g|webp|svg)$/)
);
export default midFooterImgs;