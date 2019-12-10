import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      {/* <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a href="!#" className="page-link" onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul> */}
      <ul className="pagination">
        <li className={`${currentPage === 1 ? "disabled" : ""} page-item`}>
          <a href="!#" onClick={() => paginate(1)} className="page-link">
            First
          </a>
        </li>
        <li className={`${currentPage === 1 ? "disabled" : ""} page-item`}>
          <a
            href="!#"
            onClick={() => paginate(currentPage - 1)}
            className="page-link"
          >
            Previous
          </a>
        </li>
        {pageNumbers.map(number => (
          <li
            key={number}
            className={`${currentPage === number ? "active" : ""} page-item`}
          >
            <a href="!#" onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li
          className={`${
            currentPage === pageNumbers.length ? "disabled" : ""
          } page-item`}
        >
          <a
            href="!#"
            onClick={() => paginate(currentPage + 1)}
            className="page-link"
          >
            Next
          </a>
        </li>
        <li
          className={`${
            currentPage === pageNumbers.length ? "disabled" : ""
          } page-item`}
        >
          <a
            href="!#"
            onClick={() => paginate(pageNumbers.length)}
            className="page-link"
          >
            Last
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
