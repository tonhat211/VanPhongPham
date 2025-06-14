import { createContext, useContext, useState } from 'react';

const FEContext = createContext();

export function FEProvider({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
    const closeSidebar = () => setIsSidebarOpen(false);

    const [isSubSidebarOpen, setIsSubSidebarOpen] = useState(false);
    const toggleSubSidebar = () => setIsSubSidebarOpen((prev) => !prev);
    const closeSubSidebar = () => setIsSubSidebarOpen(false);

    const [isLoading,setIsLoading] = useState(false);


    return (
        <FEContext.Provider
            value={{ isSidebarOpen, toggleSidebar, closeSidebar, isSubSidebarOpen, toggleSubSidebar, closeSubSidebar, isLoading, setIsLoading }}
        >
            {children}
        </FEContext.Provider>
    );
}

export const useFEContext = () => useContext(FEContext);
