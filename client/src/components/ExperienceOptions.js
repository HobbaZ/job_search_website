import React, { useState } from "react";

//Experience selectors

const ExperienceOptions = ({ experienceInput, handleExperienceChange }) => {
  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-sm-between align-items-center py-2">
        <label htmlFor="date_posted" className="text-white">
          <b>
            <i className="fa-solid fa-clock"></i> Experience
          </b>
        </label>

        <div className="d-flex flex-column flex-sm-row justify-content-xs-center flex-md-row justify-content-sm-end col-sm-12 m-0 p-0 col-md-8">
          <button
            type="button"
            className={`btn btn-${
              experienceInput === "under_3_years_experience"
                ? "primary"
                : "light"
            } w-100`}
            value="under_3_years_experience"
            onClick={handleExperienceChange}
          >
            Under 3 years experience
          </button>
          <button
            type="button"
            className={`btn btn-${
              experienceInput === "more_than_3_years_experience"
                ? "primary"
                : "light"
            } w-100`}
            value="more_than_3_years_experience"
            onClick={handleExperienceChange}
          >
            Over 3 years experience
          </button>
          <button
            type="button"
            className={`btn btn-${
              experienceInput === "no_experience" ? "primary" : "light"
            } w-100`}
            value="no_experience"
            onClick={handleExperienceChange}
          >
            No experience
          </button>
        </div>
      </div>
    </>
  );
};

export default ExperienceOptions;
