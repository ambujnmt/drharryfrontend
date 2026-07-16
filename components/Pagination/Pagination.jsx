import React, { useCallback, useEffect, useState } from "react";
import { Link } from "@heroui/react";
import classNames from "classnames";
import { FaAngleLeft,FaAngleRight  } from "react-icons/fa";

const Pagination = ({
  tableProps,
  sizePerPageList
}) => {
  /**
   * pagination count , index
   */
  const [pageCount, setPageCount] = useState(tableProps.pageCount);
  const [pageIndex, setPageIndex] = useState(tableProps.state.pageIndex);
  useEffect(() => {
    setPageCount(tableProps.pageCount);
    setPageIndex(tableProps.state.pageIndex);
  }, [tableProps.pageCount, tableProps.state.pageIndex]);

  /**
   * get filter pages
   */
  const filterPages = useCallback((visiblePages, totalPages) => {
    return visiblePages.filter(page => page <= pageCount);
  }, [pageCount]);

  /**
   * handle visible pages
   */
  const getVisiblePages = useCallback((page, total) => {
    if (total < 7) {
      return filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [1, page - 1, page, page + 1, total];
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [1, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, total];
      }
    }
  }, [filterPages]);

  /**
   * handle page change
   * @param page - current page
   * @returns
   */
  const changePage = page => {
    const activePage = pageIndex + 1;
    if (page === activePage) {
      return;
    }
    const visiblePages = getVisiblePages(page, pageCount);
    setVisiblePages(filterPages(visiblePages, pageCount));
    tableProps.gotoPage(page - 1);
  };
  useEffect(() => {
    const visiblePages = getVisiblePages(null, pageCount);
    setVisiblePages(visiblePages);
  }, [pageCount, getVisiblePages]);
  const [visiblePages, setVisiblePages] = useState(getVisiblePages(null, pageCount));
const activePage = pageIndex + 1;

return (
  <div className="mt-6 bg-white p-3 lg:p-4 rounded-xl shadow-sm border border-[var(--light-gold)]">

    {/* Top Section */}
    <div className="flex flex-row  items-center justify-between gap-3 lg:gap-5">

      {/* Left Controls */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4">

        {sizePerPageList.length > 0 && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label
              className="text-sm font-medium whitespace-nowrap"
              style={{ color: "var(--secondary-color)" }}
            >
              Show
            </label>

            <select
              value={tableProps.state.pageSize}
              onChange={(e) =>
                tableProps.setPageSize(Number(e.target.value))
              }
              className="border rounded-lg px-3 py-2 text-sm w-full sm:w-auto focus:outline-none"
              style={{
                borderColor: "var(--primary-color)",
                color: "var(--secondary-color)",
              }}
            >
              {sizePerPageList.map((pageSize, index) => (
                <option key={index} value={pageSize.value}>
                  {pageSize.text}
                </option>
              ))}
            </select>
          </div>
        )}

        <div
          className="text-sm font-medium whitespace-nowrap"
          style={{ color: "var(--secondary-color)" }}
        >
          Page <strong>{pageIndex + 1}</strong> of{" "}
          <strong>{tableProps.pageOptions.length}</strong>
        </div>

        <div className=" items-center hidden lg:block gap-2 w-full sm:w-auto">
          <label
            className="text-sm whitespace-nowrap"
            style={{ color: "var(--secondary-color)" }}
          >
            Go To
          </label>

          <input
            type="number"
            value={pageIndex + 1}
            min="1"
            onChange={(e) => {
              const page = e.target.value
                ? Number(e.target.value) - 1
                : 0;

              tableProps.gotoPage(page);
            }}
            className="w-20 border rounded-lg text-center py-2"
            style={{
              borderColor: "var(--primary-color)",
              color: "var(--secondary-color)",
            }}
          />
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center xl:justify-end">
        <ul className="flex flex-wrap justify-center items-center gap-2 m-0 p-0 list-none">

          {/* Previous */}
          <li>
            <button
              type="button"
              disabled={activePage === 1}
              onClick={() => activePage > 1 && changePage(activePage - 1)}
              className="w-10 h-10 rounded-lg border flex items-center justify-center transition-all disabled:opacity-40"
              style={{
                borderColor: "var(--primary-color)",
                color: "var(--secondary-color)",
              }}
            >
              <FaAngleLeft />
            </button>
          </li>

          {/* Page Numbers */}
          {(visiblePages || []).map((page, index, array) => {
            const showEllipsis =
              index > 0 && array[index - 1] + 1 < page;

            return (
              <React.Fragment key={page}>
                {showEllipsis && (
                  <li className="hidden md:block">
                    <span className="px-2 text-gray-500">...</span>
                  </li>
                )}

                <li className="hidden lg:block">
                  <button
                    type="button"
                    onClick={() => changePage(page)}
                    className="w-10 h-10 rounded-lg font-medium transition-all"
                    style={{
                      backgroundColor:
                        activePage === page
                          ? "var(--primary-color)"
                          : "#fff",
                      color:
                        activePage === page
                          ? "#fff"
                          : "var(--secondary-color)",
                      border:
                        activePage === page
                          ? "none"
                          : "1px solid var(--light-gold)",
                    }}
                  >
                    {page}
                  </button>
                </li>
              </React.Fragment>
            );
          })}

          {/* Next */}
          <li>
            <button
              type="button"
              disabled={activePage === tableProps.pageCount}
              onClick={() =>
                activePage < tableProps.pageCount &&
                changePage(activePage + 1)
              }
              className="w-10 h-10 rounded-lg border flex items-center justify-center transition-all disabled:opacity-40"
              style={{
                borderColor: "var(--primary-color)",
                color: "var(--secondary-color)",
              }}
            >
              <FaAngleRight />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
);
};
export default Pagination;