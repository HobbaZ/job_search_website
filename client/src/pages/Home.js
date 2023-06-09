import React, { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import { Button, Container } from "react-bootstrap";

function Home() {
  const [jobs, setJobs] = useState([]);
  //loading state
  const [loading, setLoading] = useState(false);
  // state for messages
  const [error, setError] = useState("");
  let [datePostedInput, setDatePostedInput] = useState("all");
  let [datePostedInputText, setDatePostedInputText] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [employmentInput, setEmploymentInput] = useState([]);
  const [experienceInput, setExperienceInput] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [jobTitlesInput, setjobTitlesInput] = useState("All Jobs");
  const [locationInput, setLocationInput] = useState("All Locations");
  const [showOtherFilters, setShowOtherFilters] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send data to search endpoint
    let url = `https://jsearch.p.rapidapi.com/search?query=${searchInput}`;
    if (datePostedInput !== "") {
      url += `&date_posted=${datePostedInput}`;
    }

    url += `&page=1&num_pages=10`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_X_RapidAPI_Key,
        "X-RapidAPI-Host": process.env.REACT_APP_X_RapidAPI_Host,
      },
    };

    try {
      setLoading(true);
      const response2 = await fetch(url, options);
      const result2 = await response2.json();
      setLoading(false);
      setJobs(result2.data);
    } catch (error) {
      console.error(error);
    }
  };

  function descriptionFormatter(description) {
    const descArray = description.split(/(?<=[.])\s+(?=[A-Z])|(?=\s+•)/);
    const firstParagraph = descArray[0] + " " + descArray[2];
    const bulletPoints = descArray.filter((sentence) =>
      sentence.trim().startsWith("•")
    );
    const renderedDescArray = [];

    renderedDescArray.push(
      <p key="firstParagraph">
        {firstParagraph.trim()}
        <br />
      </p>
    );

    for (let index = 0; index < bulletPoints.length; index++) {
      renderedDescArray.push(
        <p key={index}>
          {bulletPoints[index].trim()}
          <br />
        </p>
      );
    }

    return <>{renderedDescArray}</>;
  }

  function dateFormatter(date) {
    const today = new Date();
    const jobPosted = new Date(date);
    let dateDifference = today - jobPosted;
    let dayDifference = dateDifference / (1000 * 60 * 60 * 24);

    if (dayDifference > 1) {
      return dayDifference.toFixed(0) + " days ago";
    } else if (dayDifference === 1) {
      return dayDifference.toFixed(0) + " day ago";
    } else {
      return "Today";
    }
  }

  //custom filters here

  const uniqueLocations = [
    ...new Set(
      jobs?.map((job) =>
        job.job_city === null ? "Not Specified" : job.job_city
      )
    ),
  ];

  const uniquejobTitles = [
    ...new Set(
      jobs?.map((job) => (job.job_title === null ? "Other" : job.job_title))
    ),
  ];

  const filteredJobs = jobs?.filter(
    (job) =>
      (locationInput === "All Locations" || job.job_city === locationInput) &&
      (jobTitlesInput === "All Jobs" || job.job_title === jobTitlesInput)
  );

  const handleDatePostedChange = (e) => {
    setDatePostedInput(e.target.value);
    setDatePostedInputText(e.target.textContent);
  };

  let filtersArray = [];

  filtersArray.push(" " + locationInput, " " + jobTitlesInput);

  const toggleOtherFilters = () => {
    setShowOtherFilters(!showOtherFilters);
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (employmentInput.includes(value)) {
      setEmploymentInput((prevState) =>
        prevState.filter((val) => val !== value)
      );
    } else {
      setEmploymentInput((prevState) => [...prevState, value]);
    }
  };

  const handleSearch = () => {
    setSearchClicked(true);
  };

  const filteredData =
    locationInput.length === 0 && jobTitlesInput.length === 0
      ? jobs
      : filteredJobs;

  const resultsCount = filteredData.length;
  const hasResults = resultsCount !== 0;
  const hasMultipleResults = resultsCount > 1;

  return (
    <div className="App">
      <main>
        <Container>
          <form className="" name="form" id="form" onSubmit={handleSubmit}>
            <label htmlFor="search"></label>
            <input
              className="form-control w-100"
              id="search"
              type="search"
              name="search"
              placeholder={`Search for your dream job`}
              aria-label="Search for a job"
              value={searchInput || ""}
              onChange={(e) => setSearchInput(e.target.value)}
              required={true}
            />
            <div style={{ height: "0em" }}>
              {searchInput !== "" && searchInput.length < 2 && (
                <p className="text-center">
                  Search is required. It must be to be at least 2 characters
                </p>
              )}
            </div>

            <br />
            <br />

            {/** ___________________________Date Posted Input__________________ */}
            <div className="w-100 d-flex flex-col flex-md-row justify-content-between align-items-center py-2">
              <label htmlFor="date_posted" className="">
                <b>
                  <i className="fa-solid fa-calendar-days"></i> Date Posted
                </b>
              </label>

              <div id="date_posted d-flex w-100 align-items-center flex-sm-column flex-nowrap flex-md-row ">
                <button
                  type="button"
                  className={`btn btn-${
                    datePostedInput === "all" ? "primary" : "light"
                  }`}
                  value="all"
                  onClick={handleDatePostedChange}
                >
                  Anytime
                </button>
                <button
                  type="button"
                  className={`btn btn-${
                    datePostedInput === "today" ? "primary" : "light"
                  }`}
                  value="today"
                  onClick={handleDatePostedChange}
                >
                  Today
                </button>
                <button
                  type="button"
                  className={`btn btn-${
                    datePostedInput === "3days" ? "primary" : "light"
                  }`}
                  value="3days"
                  onClick={handleDatePostedChange}
                >
                  Last 3 days
                </button>
                <button
                  type="button"
                  className={`btn btn-${
                    datePostedInput === "week" ? "primary" : "light"
                  }`}
                  value="week"
                  onClick={handleDatePostedChange}
                >
                  Last Week
                </button>
                <button
                  type="button"
                  className={`btn btn-${
                    datePostedInput === "month" ? "primary" : "light"
                  }`}
                  value="month"
                  onClick={handleDatePostedChange}
                >
                  Last Month
                </button>
              </div>
            </div>

            {/** ___________________________Employment Type (checkboxes for multi select)__________________ */}
            <div className="w-100 d-flex flex-col flex-md-row justify-content-between align-items-center">
              <label htmlFor="employment_input">
                <b>
                  <i className="fa-solid fa-calendar-week"></i> Employment Type
                </b>
              </label>

              <div className="">
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
                  }`}
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
                  }`}
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
                  }`}
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
                  }`}
                >
                  Intern
                </label>
              </div>
            </div>

            {/**_________________Experience Input______________________________________________ */}

            <div className="w-100 d-flex flex-col flex-md-row justify-content-between align-items-center py-2">
              <label htmlFor="date_posted" className="">
                <b>
                  <i className="fa-solid fa-clock"></i> Experience
                </b>
              </label>

              <div>
                <button
                  type="button"
                  className={`btn btn-${
                    experienceInput === "under_3_years_experience"
                      ? "primary"
                      : "light"
                  }`}
                  value="under_3_years_experience"
                  onClick={(e) => setExperienceInput(e.target.value)}
                >
                  Under 3 years experience
                </button>
                <button
                  type="button"
                  className={`btn btn-${
                    experienceInput === "over_3_years_experience"
                      ? "primary"
                      : "light"
                  }`}
                  value="over_3_years_experience"
                  onClick={(e) => setExperienceInput(e.target.value)}
                >
                  Over 3 years experience
                </button>
                <button
                  type="button"
                  className={`btn btn-${
                    experienceInput === "no_experience" ? "primary" : "light"
                  }`}
                  value="no_experience"
                  onClick={(e) => setExperienceInput(e.target.value)}
                >
                  No experience
                </button>
              </div>
            </div>

            <div className="text-center">
              <button
                className="btn btn-primary col-sm-12 col-md-4 col-lg-2 mt-3 p-1"
                type="submit"
                name="search"
                onClick={handleSearch}
              >
                Search For Jobs
              </button>
            </div>

            <div className="text-center">
              {jobs?.length > 0 && (
                <button
                  type="button"
                  className="btn btn-primary col-sm-12 col-md-4 col-lg-2 mt-3 p-1"
                  onClick={toggleOtherFilters}
                >
                  Additional Filters
                </button>
              )}
            </div>
          </form>

          <div className="row">
            <hr />
            {showOtherFilters && (
              <div className="col-md-3">
                {searchInput !== "" && jobs?.length > 0 ? (
                  <>
                    <form className="sideForm">
                      <div className="">
                        <div className="form-group mx-2">
                          <label htmlFor="locations">
                            <b>
                              <i className="fa-solid fa-location-dot"></i>{" "}
                              Locations
                            </b>
                          </label>

                          <button
                            className={`w-100 btn btn-${
                              locationInput === "All Locations"
                                ? "primary"
                                : "light"
                            } filterButton`}
                            key="All Locations"
                            type="button"
                            onClick={() => setLocationInput("All Locations")}
                            active={locationInput === "All Locations"}
                          >
                            All ({jobs.length})
                          </button>
                          {uniqueLocations.sort().map((location) => {
                            const locationJobs = jobs.filter(
                              (job) => job.job_city === location
                            );
                            return (
                              <button
                                className={`w-100 btn btn-${
                                  locationInput === location
                                    ? "primary"
                                    : "light"
                                } filterButton`}
                                type="button"
                                key={location}
                                onClick={() => setLocationInput(location)}
                                active={locationInput === location}
                              >
                                {location} ({locationJobs.length})
                              </button>
                            );
                          })}
                        </div>

                        <div className="form-group mx-2">
                          <label htmlFor="jobTitles">
                            <b>
                              <i className="fa-solid fa-flag"></i> Job Titles
                            </b>
                          </label>

                          <button
                            className={`w-100 btn btn-${
                              locationInput === "All Locations"
                                ? "primary"
                                : "light"
                            } filterButton`}
                            key="All Jobs"
                            type="button"
                            onClick={() => setjobTitlesInput("All Jobs")}
                            active={jobTitlesInput === "All Jobs"}
                          >
                            All ({jobs.length})
                          </button>

                          {uniquejobTitles.sort().map((oneJob) => {
                            const jobTitle = jobs.filter(
                              (job) => job.job_title === oneJob
                            );
                            const isActive = jobTitlesInput === oneJob;

                            return (
                              <button
                                className={`w-100 btn btn-${
                                  isActive ? "primary" : "light"
                                } filterButton`}
                                type="button"
                                key={oneJob}
                                onClick={() => setjobTitlesInput(oneJob)}
                              >
                                {oneJob} ({jobTitle.length})
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </form>
                  </>
                ) : null}
              </div>
            )}

            <div
              className={`col ${showOtherFilters ? "col-md-9" : "col-md-12"}`}
            >
              <div id="displayResults">
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <Loading />
                  </div>
                ) : error ? (
                  <div className="text-danger d-flex justify-content-center">
                    {error}
                  </div>
                ) : (
                  <>
                    {hasResults ? ( //if resultsCount isn't zero
                      <>
                        <h2 className="text-left pd-3">
                          {hasMultipleResults ? (
                            <span>{resultsCount} Results</span>
                          ) : (
                            <span>{resultsCount} Result</span>
                          )}
                          {locationInput.length === 0 &&
                          jobTitlesInput.length === 0 ? null : (
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
                                  <h3>
                                    {job.job_title} At {job.employer_name}
                                  </h3>
                                </div>
                                <div className="float-right">
                                  {job.employer_logo ? (
                                    <img
                                      className="companyLogo"
                                      src={`${job.employer_logo}`}
                                      alt={`${job.employer_name}`}
                                    />
                                  ) : null}
                                </div>
                              </div>
                              <h6>
                                <i className="fa-solid fa-calendar-week"></i>{" "}
                                {job.job_employment_type} |{" "}
                                <i className="fa-solid fa-calendar-days"></i>{" "}
                                Posted{" "}
                                {dateFormatter(job.job_posted_at_datetime_utc)}
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
                                    <i className="fa-solid fa-house-laptop"></i>{" "}
                                    Remote job
                                  </>
                                )}
                              </h6>
                              <a
                                href={job.job_apply_link}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Apply on {job.job_publisher}
                              </a>
                              <br />
                              <div>
                                <b>The gist of it:</b>
                                <br />
                                {descriptionFormatter(job.job_description)}
                              </div>
                            </div>
                          ))}
                      </>
                    ) : (
                      <span>
                        {searchClicked && (
                          <>
                            <h2>
                              {resultsCount} Results For{" "}
                              {filtersArray.join(", ")}
                            </h2>
                            <p className="text-center">
                              No jobs match that description
                            </p>
                          </>
                        )}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}

export default Home;
