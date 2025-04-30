import PropTypes from 'prop-types';
import '/src/CSS/Pagination.css'
const Pagination = ({
  itemsPerPage,
  totalItems,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePaginate = (pageNumber, e) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };


  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li 
            key={number}
            className={`${currentPage === number ? 'active' : ''}`}
          >
            <a
              onClick={(e) => handlePaginate(number, e)}
              href="!#"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired, 
  totalItems: PropTypes.number.isRequired, 
  setCurrentPage: PropTypes.func.isRequired, 
  currentPage: PropTypes.number.isRequired, 
};

export default Pagination;
