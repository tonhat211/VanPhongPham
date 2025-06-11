import { createContext, useContext, useState } from 'react';

const FEContext = createContext();

export function FEProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

    const [isSubSidebarOpen, setIsSubSidebarOpen] = useState(false);
  const toggleSubSidebar = () => setIsSubSidebarOpen(prev => !prev);
  const closeSubSidebar = () => setIsSubSidebarOpen(false);

  return (
    <FEContext.Provider value={{ isSidebarOpen, toggleSidebar, closeSidebar, isSubSidebarOpen, toggleSubSidebar, closeSubSidebar }}>
      {children}
    </FEContext.Provider>
  );
}

export const useSidebar = () => useContext(FEContext);
