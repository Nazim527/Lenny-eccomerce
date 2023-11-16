import React, { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentId, setCurrentId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const [showOverlayModal, setShowOverlayModal] = useState(true)
  const [showProductTotal, setShowProductTotal] = useState("")
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  return (
    <CategoryContext.Provider value={{ currentCategory, setCurrentCategory, 
    currentId, setCurrentId,
    showModal,setShowModal,
    successModal, setSuccessModal,
    showOverlayModal, setShowOverlayModal,
    showProductTotal, setShowProductTotal,
    showMobileFilter, setShowMobileFilter,}}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory hook must be used within a CategoryProvider');
  }
  return context;
};

export const useCategoryId = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory hook must be used within a CategoryProvider');
  }
  return context;
}
export const useShowModal = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useShowModal hook must be used within a CategoryProvider');
  }
  return context;
}
export const useSuccessModal = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useShowModal hook must be used within a CategoryProvider');
  }
  return context;
}
export const useShowOverlayModal = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useShowOverlayModal hook must be used within a CategoryProvider');
  }
  return context;
}
export const useShowProductsTotal = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useShowProductsTotal hook must be used within a CategoryProvider');
  }
  return context;
}
export const useShowMobileFilter = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useShowMobileFilter hook must be used within a CategoryProvider');
  }
  return context;
}
