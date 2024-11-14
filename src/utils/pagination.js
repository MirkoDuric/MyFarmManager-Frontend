export const handlePageChange = (currentPage, setPage, direction, totalPages = Infinity) => {
    if (direction === "next") {
      setPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
    } else if (direction === "previous") {
      setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    } else {
      setPage(currentPage); 
    }
  };
  