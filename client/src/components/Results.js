import React from "react";

import DescriptionFormatter from "./DescriptionFormatter";
import DateFormatter from "./DateFormatter";

const Results = ({
  hasResults,
  hasMultipleResults,
  resultsCount,
  locationInput,
  jobTitlesInput,
  filtersArray,
  filteredData,
  searchClicked,
}) => {
  return hasResults ? ( //if resultsCount isn't zero
    <>
      <h2 className="text-left pd-3">
        {hasMultipleResults ? (
          <span>{resultsCount} Results</span>
        ) : (
          <span>{resultsCount} Result</span>
        )}
        {locationInput.length === 0 && jobTitlesInput.length === 0 ? null : (
          <> For {filtersArray.join(", ")}</>
        )}
      </h2>
      {filteredData
        .sort(
          (a, b) =>
            new Date(b.job_posted_at_datetime_utc) -
            new Date(a.job_posted_at_datetime_utc)
        )
        .map((job) => (
          <div key={job.job_id} className="w-100">
            <hr />
            <div>
              <div>
                <h3 id={job.job_id}>
                  {job.job_title} At {job.employer_name}
                </h3>
              </div>

              {/*position company logo*/}

              <div className="float-right">
                {job?.employer_logo ? (
                  <img
                    className="companyLogo"
                    src={`${job.employer_logo}`}
                    alt={`${job.employer_name}`}
                  />
                ) : (
                  <img
                    className="companyLogo"
                    src={`../images/placeholder`}
                    alt={`${job.employer_name}`}
                  />
                )}
              </div>

              {/*end of position company logo*/}
            </div>

            {/*Create sub header with user selections*/}
            <h6>
              <i className="fa-solid fa-calendar-week"></i>{" "}
              {job.job_employment_type} |{" "}
              <i className="fa-solid fa-calendar-days"></i> Posted{" "}
              <DateFormatter date={job.job_posted_at_datetime_utc} />
              {job.job_city && (
                <>
                  {" | "}
                  <i className="fa-solid fa-location-dot"></i>{" "}
                  {job.job_city + ", "}
                </>
              )}
              {job.job_state && job.job_state}
              {job.job_is_remote && (
                <>
                  {" | "}
                  <i className="fa-solid fa-house-laptop"></i> Remote job
                </>
              )}
            </h6>
            {/*End Create sub header with user selections*/}

            <a href={job.job_apply_link} target="_blank" rel="noreferrer">
              Apply on {job.job_publisher}
            </a>
            <br />

            {/*Job description goes here*/}
            <div>
              <b>The gist of it:</b>
              <br />
              <DescriptionFormatter
                description={job.job_description}
                jobID={job.job_id}
              />
            </div>
          </div>
        ))}
    </>
  ) : (
    <span>
      {searchClicked && (
        <>
          <h2>
            {resultsCount} Results For {filtersArray.join(", ")}
          </h2>
          <p className="text-center">No jobs match that description</p>
        </>
      )}
    </span>
  );
};

export default Results;
