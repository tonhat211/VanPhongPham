import React from "react";
import  propTypes from 'prop-types';

import {Route, Router, Routes, useMatch} from "react-router-dom";
import DetailPage from "../../pages/ProductsDetail/DetailPage";
import ListPage from "../../pages/ListProducts/ListPage";

ProductsFeature.propTypes = {};
function ProductsFeature(props) {


    return (
        <div>
            products Feature
            <Routes>
                {/*<Route path={'/'} element={<ListPage/>}> </Route>*/}
                <Route path={'/products'} element={<ListPage/>}> </Route>
                <Route path={'/products/:productid'} element={<DetailPage/>}> </Route>
            </Routes>

        </div>
    );
}

export default ProductsFeature;