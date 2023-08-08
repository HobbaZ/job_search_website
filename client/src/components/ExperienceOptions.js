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
              experienceInput === "over_3_years_experience"
                ? "primary"
                : "light"
            } w-100`}
            value="over_3_years_experience"
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

      <div className="d-flex flex-row justify-content-center justify-content-sm-start w-100 form-check text-white remote py-2 p-0">
        <div className="text-center text-sm-left">
          <label className="form-check-label text-white" htmlFor="remoteCheck">
            <b>
              <i className="fa-solid fa-house-laptop"></i> Remote Only
            </b>
          </label>
          <input
            type="checkbox"
            className="form-check-input ml-2"
            id="remoteCheck"
            name="remoteCheck"
            onChange={handleExperienceChange}
          />
        </div>
      </div>
    </>
  );
};

export default ExperienceOptions;
