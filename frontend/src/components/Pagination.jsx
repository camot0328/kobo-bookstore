import React from "react";
import PropTypes from "prop-types";
import "../styles/Pagination.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination-container">
      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`pagination-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="pagination-link"
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
