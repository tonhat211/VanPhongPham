import React, {useEffect, useState} from "react";
import './ListPageStyles.scss'
import {Button, Pagination} from "@mui/material";
import ProductsList from "../../component/ProductList/ProductsList/ProductsList";
import productsData from "../../data/Product/productData";
import ProductPrices from "../../component/ProductList/SideBar/ProductsPrices/ProductPrices";
import ProductsColors from "../../component/ProductList/SideBar/ProductsColors/ProductsColors";
import ProductsTypes from "../../component/ProductList/SideBar/ProductsTypes/ProductsTypes";
import ProductsBrands from "../../component/ProductList/SideBar/ProductsBrands/ProductsBrands";
import SliderPage from "../sliderBrands/SliderPage";
import { useLocation } from "react-router-dom";

function ListPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [currentPage, setCurrentPage] = useState(1);
    const showItems = 12;
    const lastIndex = currentPage * showItems;
    const firstIndex = lastIndex - showItems;
    // const currentPosts = productsData.slice(firstIndex, lastIndex);
    const npages = Math.ceil(productsData.length / showItems);

    const handleChange = (even, page) => {
        setCurrentPage(page)
    };

    const [itemsList, setItemsList] = useState(productsData);
    const currentPosts = itemsList.slice(firstIndex, lastIndex);

    // sort
    const sortByNameAZ = () => {
        const sortByName = [...itemsList].sort((a, b) => a.name.localeCompare(b.name));
        setItemsList(sortByName);
        setCurrentPage(1);
    };

    const sortByNameZA = () => {
        const sortByName = [...itemsList].sort((a, b) => b.name.localeCompare(a.name));
        setItemsList(sortByName);
        setCurrentPage(1);
    };

    const sortByPriceAsc = () => {
        const sortByPrice = [...itemsList].sort((a, b) => a.price - b.price);
        setItemsList(sortByPrice);
        setCurrentPage(1);
    };

    const sortByPriceDesc = () => {
        const sortByPrice = [...itemsList].sort((a, b) => b.price - a.price);
        setItemsList(sortByPrice);
        setCurrentPage(1);
    };

    // filter
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCategogyID, setSelectedCategogyID] = useState([]);

    const [selectedBrands, setSelectedBrands] = useState([]);

    // Filter function
    const filterItems = () => {
        let filteredItems = productsData;

        if (selectedColors.length > 0) {
            filteredItems = filteredItems.filter(product =>
                selectedColors.some(color => product.colors && product.colors.includes(color))
            );
        }

        if (selectedPrices.length > 0) {
            filteredItems = filteredItems.filter(product => {
                return selectedPrices.some(priceRange => {
                    const price = product.price;
                    switch (priceRange) {
                        case "under_100k":
                            return price < 100000;
                        case "100k_300k":
                            return price >= 100000 && price <= 300000;
                        case "300k_500k":
                            return price > 300000 && price <= 500000;
                        case "over_500k":
                            return price > 500000;
                        default:
                            return true;
                    }
                });
            });
        }
        const selectedCategories = queryParams.getAll("categogy");
        if (selectedCategories.length > 0) {
            filteredItems = filteredItems.filter(product =>
                selectedCategories.some(category => product.category && product.category.includes(category))
            );
        }
        const selectedCategogyID = queryParams.getAll("categogy");
        if (selectedCategogyID.length > 0) {
            filteredItems = filteredItems.filter(product =>
                selectedCategogyID.some(categogyID => product.categogyID && product.categogyID.includes(categogyID))
            );
        }

        if (selectedBrands.length > 0) {
            filteredItems = filteredItems.filter(product =>
                selectedBrands.some(brand => product.brandType && product.brandType.includes(brand))
            );
        }

        setItemsList(filteredItems);
        setCurrentPage(1);
    };

    useEffect(() => {
        filterItems();
    }, [selectedColors, selectedPrices, selectedCategories, selectedCategogyID,selectedBrands]);
    
    // Handle change functions
    const handleColorChange = (event) => {
        const value = event.target.value;
        if (value === "all") {
            setSelectedColors([]);
        } else {
            setSelectedColors(prevColors =>
                prevColors.includes(value)
                    ? prevColors.filter(color => color !== value)
                    : [...prevColors, value]
            );
        }
    };

    const handlePriceChange = (event) => {
        const value = event.target.value;
        if (value === "all") {
            setSelectedPrices([]);
        } else {
            setSelectedPrices(prevPrices =>
                prevPrices.includes(value)
                    ? prevPrices.filter(price => price !== value)
                    : [...prevPrices, value]
            );
        }
    };

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        if (value === "all") {
            setSelectedCategories([]);
        } else {
            setSelectedCategories(prevCategories =>
                prevCategories.includes(value)
                    ? prevCategories.filter(category => category !== value)
                    : [...prevCategories, value]
            );
        }
    };
    const handleCategoryIDChange = (event) => {
        const value = event.target.value;
        if (value === "all") {
            setSelectedCategogyID([]);
        } else {
            setSelectedCategogyID(prevCategories =>
                prevCategories.includes(value)
                    ? prevCategories.filter(categogyID => categogyID !== value)
                    : [...prevCategories, value]
            );
        }
    };

    const handleBrandChange = (event) => {
        const value = event.target.value;
        if (value === "all") {
            setSelectedBrands([]);
        } else {
            setSelectedBrands(prevBrands =>
                prevBrands.includes(value)
                    ? prevBrands.filter(brand => brand !== value)
                    : [...prevBrands, value]
            );
        }
    };

    return (
<div>

        <div className="listP_container">

            <div className="listP_left">
                <ProductsBrands handleChange={handleBrandChange}/>
                <ProductsTypes handleChange={handleCategoryChange} />
                <ProductPrices  handleChange={handlePriceChange}/>
                <ProductsColors handleChange={handleColorChange}/>
            </div>

            <div className="listP_right">
                <div className="bannerAndSort">
                    <div className="banner">
                        <img
                            src='https://file.hstatic.net/1000230347/collection/22_banner_1920x600_6a4f617b4da24b6fa5a6738381149686.png'/>
                    </div>

                    <h2 className="title">Văn phòng phẩm</h2>

                    <div className="productItem_sort">
                        <span className="sort_label"> Sắp xếp: </span>
                        <Button className="sort" onClick={sortByNameAZ}> Tên A → Z </Button>
                        <Button className="sort" onClick={sortByNameZA}> Tên Z → A </Button>
                        <Button className="sort" onClick={sortByPriceAsc}> Giá tăng dần </Button>
                        <Button className="sort" onClick={sortByPriceDesc}> Giá giảm dần </Button>
                    </div>
                </div>

                <div className="separator"></div>

                <div className="listProductsItem">
                    <ProductsList productData={currentPosts}/>
                </div>

                <div className="pagination_pages">
                    <Pagination count={npages} variant="outlined" color="primary" page={currentPage}
                                onChange={handleChange}/>
                </div>

            </div>

        </div>
    <SliderPage/>
</div>
    );
}

export default ListPage;