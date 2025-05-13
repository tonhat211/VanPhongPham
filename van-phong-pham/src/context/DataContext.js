// MenuContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { getBrands, getPrimaryCategories } from '~/api/feApi';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [menus, setMenus] = useState([]);
    const [featureMenus, setFeatureMenus] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        getPrimaryCategories(1)
            .then(setMenus)
            .catch(() => alert('Không thể tải menu'));

        getPrimaryCategories(9)
            .then(setFeatureMenus)
            .catch(() => alert('Không thể tải feature menu'));
        getBrands()
            .then(setBrands)
            .catch(() => alert('Không thể tải feature menu'));
    }, []);

    return <DataContext.Provider value={{ menus, featureMenus,brands }}>{children}</DataContext.Provider>;
};

// Hook dùng để gọi nhanh
export const useData = () => useContext(DataContext);
