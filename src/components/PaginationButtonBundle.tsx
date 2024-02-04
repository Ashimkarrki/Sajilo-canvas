import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const PaginationButtonBundle = ({
  total,
  currentPage,
  query,
  num,
  setCurrentPage,
}) => {
  const x = useParams();

  return (
    <div className="join col-start-2 ml-auto mr-auto mb-4">
      {num.map((s) => {
        if (s == currentPage) {
          return (
            <button key={s} className="join-item btn btn-active">
              {s}
            </button>
          );
        }
        return (
          <Link
            onClick={() => setCurrentPage(s)}
            key={s}
            to={`/shop/${s}/${x.sort}/${x.cat}/${x.min}/${x.max}`}
          >
            <button className="join-item btn">{s}</button>
          </Link>
        );
      })}
    </div>
  );
};

export default PaginationButtonBundle;
