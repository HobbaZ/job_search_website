import React from "react";

// Date Posted selectors

const DatePostedOptions = ({ datePostedInput, handleDatePostedChange }) => {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-sm-between align-items-center py-2">
      <label htmlFor="date_posted" className="text-white">
        <b>
          <i className="fa-solid fa-calendar-days"></i> Date Posted
        </b>
      </label>

      <div className="d-flex flex-column flex-sm-row justify-content-sm-center flex-md-row justify-content-sm-end col-sm-12 m-0 p-0 col-md-8">
        <button
          type="button"
          className={`btn btn-${
            datePostedInput === "today" ? "primary" : "light"
          } w-100`}
          value="today"
          onClick={handleDatePostedChange}
        >
          Today
        </button>
        <button
          type="button"
          className={`btn btn-${
            datePostedInput === "3days" ? "primary" : "light"
          } w-100`}
          value="3days"
          onClick={handleDatePostedChange}
        >
          Last 3 days
        </button>
        <button
          type="button"
          className={`btn btn-${
            datePostedInput === "week" ? "primary" : "light"
          } w-100`}
          value="week"
          onClick={handleDatePostedChange}
        >
          Last Week
        </button>
        <button
          type="button"
          className={`btn btn-${
            datePostedInput === "month" ? "primary" : "light"
          } w-100`}
          value="month"
          onClick={handleDatePostedChange}
        >
          Last Month
        </button>
        <button
          type="button"
          className={`btn btn-${
            datePostedInput === "all" ? "primary" : "light"
          } w-100`}
          value="all"
          onClick={handleDatePostedChange}
        >
          Anytime
        </button>
      </div>
    </div>
  );
};

export default DatePostedOptions;
