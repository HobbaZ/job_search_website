import React, { useState } from "react";

//Employment Type selectors

const EmploymentTypeOptions = ({ employmentInput, handleCheckboxChange }) => {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-sm-between align-items-center py-2">
      <label htmlFor="employment_input" className="text-white">
        <b>
          <i className="fa-solid fa-calendar-week"></i> Employment Type
        </b>
      </label>

      <div className="d-flex flex-column flex-sm-row justify-content-sm-center flex-md-row justify-content-sm-end col-sm-12 m-0 p-0 col-md-8 employment">
        <input
          type="checkbox"
          id="fulltime"
          value="FULLTIME"
          checked={employmentInput.includes("FULLTIME")}
          onChange={handleCheckboxChange}
        />
        <label
          htmlFor="fulltime"
          className={`btn btn-${
            employmentInput.includes("FULLTIME") ? "primary" : "light"
          } w-100 m-0`}
        >
          Full Time
        </label>

        <input
          type="checkbox"
          id="parttime"
          value="PARTTIME"
          checked={employmentInput.includes("PARTTIME")}
          onChange={handleCheckboxChange}
        />
        <label
          htmlFor="parttime"
          className={`btn btn-${
            employmentInput.includes("PARTTIME") ? "primary" : "light"
          } w-100 m-0`}
        >
          Part Time
        </label>

        <input
          type="checkbox"
          id="contractor"
          value="CONTRACTOR"
          checked={employmentInput.includes("CONTRACTOR")}
          onChange={handleCheckboxChange}
        />
        <label
          htmlFor="contractor"
          className={`btn btn-${
            employmentInput.includes("CONTRACTOR") ? "primary" : "light"
          } w-100 m-0`}
        >
          Contractor/Temp
        </label>

        <input
          type="checkbox"
          id="intern"
          value="INTERN"
          checked={employmentInput.includes("INTERN")}
          onChange={handleCheckboxChange}
        />
        <label
          htmlFor="intern"
          className={`btn btn-${
            employmentInput.includes("INTERN") ? "primary" : "light"
          } w-100 m-0`}
        >
          Intern
        </label>
      </div>
    </div>
  );
};

export default EmploymentTypeOptions;
