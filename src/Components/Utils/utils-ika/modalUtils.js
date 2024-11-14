export const openModal = (setShowModal, setCurrentItem = null, item = null) => {
    setShowModal(true);
    if (setCurrentItem && item) {
      setCurrentItem(item);
    }
  };
  
  export const closeModal = (setShowModal, resetState = null) => {
    setShowModal(false);
    if (resetState) resetState(null);
  };
  