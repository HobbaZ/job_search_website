import React from "react";

const JobsDisplayFilterOptions = ({
  jobTitlesInput,
  setjobTitlesInput,
  jobs,
  uniquejobTitles,
  locationInput,
}) => {
  const handleJobTitleClick = (selectedJobTitle) => {
    setjobTitlesInput(selectedJobTitle);
  };

  return (
    <div className="form-group mx-2">
      <label htmlFor="jobTitles">
        <b>
          <i className="fa-solid fa-flag"></i> Job Titles
        </b>
      </label>

      {/* Create All Jobs button */}
      <button
        className={`w-100 btn btn-${
          jobTitlesInput === "All Jobs" ? "primary" : "light"
        } filterButton`}
        key="All Jobs"
        type="button"
        onClick={() => handleJobTitleClick("All Jobs")}
        active={jobTitlesInput.toString() === "All Jobs"}
      >
        All Jobs ({jobs.length})
      </button>

      {/* Create other Jobs buttons */}
      <div className="jobTitlesContainer">
        {uniquejobTitles.sort().map((oneJob) => {
          const jobTitle = jobs.filter(
            (job) =>
              job.job_title === oneJob &&
              (locationInput === "All Locations" ||
                job.job_city === locationInput)
          );
          const isActive = jobTitlesInput.toString() === oneJob.toString();
          const isDisabled = jobTitle.length === 0;

          return (
            <button
              className={`w-100 btn btn-${
                isActive ? "primary" : "light"
              } filterButton ${isDisabled ? "d-none" : ""}`}
              type="button"
              key={oneJob}
              onClick={() => handleJobTitleClick(oneJob)}
              active={jobTitlesInput.toString() === oneJob.toString()}
              disabled={isDisabled}
            >
              {oneJob} ({jobTitle.length})
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default JobsDisplayFilterOptions;
