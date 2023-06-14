import React, { useState } from "react";
import { Loading } from "../components/Loading";
import { Button, Container } from "react-bootstrap";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({});
  //loading state
  const [loading, setLoading] = useState(false);
  // state for messages
  const [error, setError] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [datePostedInput, setDatePostedInput] = useState("");
  const [employmentInput, setEmploymentInput] = useState([]);
  const [experienceInput, setExperienceInput] = useState([]);
  const [jobTitlesInput, setjobTitlesInput] = useState([]);
  const [companyTypeInput, setCompanyTypeInput] = useState([]);
  const [locationInput, setLocationInput] = useState([]);
  const [employerNameInput, setEmployerNameInput] = useState([]);
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
        "X-RapidAPI-Key": "",
        "X-RapidAPI-Host": "",
      },
    };

    try {
      const response2 = await fetch(url, options);
      const result2 = await response2.json();
      console.log(result2.data);
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

    return dayDifference.toFixed(0) > 0
      ? dayDifference.toFixed(0) + " days ago"
      : dayDifference.toFixed(0) === "1"
      ? dayDifference.toFixed(0) + " day ago"
      : "Today";
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

  let filtersArray = [];

  const filteredJobs = jobs?.filter(
    (job) =>
      (locationInput === "All Locations" || job.job_city === locationInput) &&
      (jobTitlesInput === "All Jobs" || job.job_title === jobTitlesInput)
  );

  const datePostedText =
    /*datePostedInput !== ""
      ? document.getElementById("date_posted").options[
          document.getElementById("date_posted").selectedIndex
        ].text
      : "Anytime";*/
    datePostedInput !== "" ? datePostedInput : "Anytime";

  filtersArray.push(locationInput, jobTitlesInput, "Posted " + datePostedText);

  const toggleOtherFilters = () => {
    setShowOtherFilters(!showOtherFilters);
  };

  return (
    <div className="App">
      <div className="main col">
        <div className="w-100">
          <form
            className="form w-100 mx-auto p-5 col-12 col-md-9"
            name="form"
            id="form"
            onSubmit={handleSubmit}
          >
            <label htmlFor="search"></label>
            <input
              className="form-input w-100"
              id="search"
              type="search"
              name="search"
              placeholder={`${(
                <i class="fa-solid fa-magnifying-glass"></i>
              )} Search for your dream job`}
              aria-label="Search for a job"
              value={searchInput || ""}
              onChange={(e) => setSearchInput(e.target.value)}
              required={true}
            />

            {searchInput !== "" && searchInput.length < 2 && (
              <p className="text-center">
                Search is required. It must be to be at least 2 characters
              </p>
            )}

            <br />
            <br />

            <div className="w-100 d-flex flex-col flex-md-row justify-content-between">
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
                  onClick={(e) => setDatePostedInput(e.target.value)}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`btn btn-${
                    datePostedInput === "today" ? "primary" : "light"
                  }`}
                  value="today"
                  onClick={(e) => setDatePostedInput(e.target.value)}
                >
                  Today
                </button>
                <button
                  type="button"
                  className={`btn btn-${
                    datePostedInput === "3days" ? "primary" : "light"
                  }`}
                  value="3days"
                  onClick={(e) => setDatePostedInput(e.target.value)}
                >
                  Last 3 days
                </button>
                <button
                  type="button"
                  className={`btn btn-${
                    datePostedInput === "week" ? "primary" : "light"
                  }`}
                  value="week"
                  onClick={(e) => setDatePostedInput(e.target.value)}
                >
                  Last Week
                </button>
                <button
                  type="button"
                  className={`btn btn-${
                    datePostedInput === "month" ? "primary" : "light"
                  }`}
                  value="month"
                  onClick={(e) => setDatePostedInput(e.target.value)}
                >
                  Last Month
                </button>
              </div>
            </div>

            <hr />

            {/** ___________________________Employment Type__________________ */}
            <div className="w-100 d-flex flex-col flex-md-row justify-content-between align-items-center py-2">
              <label htmlFor="employment_input">
                <b>
                  <i className="fa-solid fa-calendar-week"></i> Employment Type
                </b>
              </label>

              {/*<div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary active">
                  <input
                    type="radio"
                    name="options"
                    id="option1"
                    autocomplete="off"
                    checked
                  />{" "}
                  Active
                </label>
                <label class="btn btn-secondary">
                  <input
                    type="radio"
                    name="options"
                    id="option2"
                    autocomplete="off"
                  />{" "}
                  Radio
                </label>
                <label class="btn btn-secondary">
                  <input
                    type="radio"
                    name="options"
                    id="option3"
                    autocomplete="off"
                  />{" "}
                  Radio
                </label>
                </div>*/}

              <div>
                <input
                  type="checkbox"
                  id="fulltime"
                  value="FULLTIME"
                  checked={employmentInput.includes("FULLTIME")}
                  onChange={(e) =>
                    setEmploymentInput((prevState) =>
                      prevState.includes(e.target.value)
                        ? prevState.filter((value) => value !== e.target.value)
                        : [...prevState, e.target.value]
                    )
                  }
                  className={`btn btn-${
                    employmentInput.includes("FULLTIME") ? "primary" : "light"
                  }`}
                />
                <label htmlFor="fulltime" className="btn-label">
                  Full Time
                </label>

                <input
                  type="checkbox"
                  id="parttime"
                  value="PARTTIME"
                  checked={employmentInput.includes("PARTTIME")}
                  onChange={(e) =>
                    setEmploymentInput((prevState) =>
                      prevState.includes(e.target.value)
                        ? prevState.filter((value) => value !== e.target.value)
                        : [...prevState, e.target.value]
                    )
                  }
                  className={`btn btn-${
                    employmentInput.includes("PARTTIME") ? "primary" : "light"
                  }`}
                />
                <label htmlFor="parttime" className="btn-label">
                  Part Time
                </label>

                <input
                  type="checkbox"
                  id="contractor"
                  value="CONTRACTOR"
                  checked={employmentInput.includes("CONTRACTOR")}
                  onChange={(e) =>
                    setEmploymentInput((prevState) =>
                      prevState.includes(e.target.value)
                        ? prevState.filter((value) => value !== e.target.value)
                        : [...prevState, e.target.value]
                    )
                  }
                  className={`btn btn-${
                    employmentInput.includes("CONTRACTOR") ? "primary" : "light"
                  }`}
                />
                <label htmlFor="contractor" className="btn-label">
                  Contractor/Temp
                </label>

                <input
                  type="checkbox"
                  id="intern"
                  value="INTERN"
                  checked={employmentInput.includes("INTERN")}
                  onChange={(e) =>
                    setEmploymentInput((prevState) =>
                      prevState.includes(e.target.value)
                        ? prevState.filter((value) => value !== e.target.value)
                        : [...prevState, e.target.value]
                    )
                  }
                  className={`btn btn-${
                    employmentInput.includes("INTERN") ? "primary" : "light"
                  }`}
                />
                <label htmlFor="intern" className="btn-label">
                  Intern
                </label>
              </div>
            </div>

            <hr />

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

            <hr />

            {/*<div className="d-flex flex-sm-column flex-md-row justify-content-between">
              <div className="form-group mx-2">
                <label htmlFor="date_posted">
                  <b>
                    <i className="fa-solid fa-calendar-days"></i> Date Posted
                  </b>
                </label>

                <select
                  className="form-select w-100"
                  id="date_posted"
                  type="text"
                  name="date_posted"
                  size="5"
                  value={datePostedInput || ""}
                  onChange={(e) => setDatePostedInput(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="today">Today</option>
                  <option value="3days">Last 3 days</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                </select>
                </div>*/}

            {/*<div className="form-group mx-2">
                <label htmlFor="employment_type">
                  <b>
                    <i className="fa-solid fa-calendar-week"></i> Employment
                    Type
                  </b>
                </label>

                <select
                  multiple
                  className="form-select w-100"
                  id="employment_type"
                  type="text"
                  name="employment_type"
                  value={employmentInput}
                  size="4"
                  onChange={(e) =>
                    setEmploymentInput(
                      employmentInput
                        ? Array.from(e.target.selectedOptions).map(
                            (options) => options.value
                          )
                        : setEmploymentInput(e.target.selectedOptions[0])
                    )
                  }
                >
                  <option value="FULLTIME">Full Time</option>
                  <option value="PARTTIME">Part Time</option>
                  <option value="CONTRACTOR">Contractor/Temp</option>
                  <option value="INTERN">Intern</option>
                </select>
                </div>

              <div className="form-group mx-2">
                <label htmlFor="job_requirements">
                  <b>
                    <i className="fa-solid fa-clock"></i> Experience
                  </b>
                </label>

                <select
                  multiple
                  className="form-select w-100"
                  id="job_requirements"
                  type="text"
                  value={experienceInput || []}
                  size="3"
                  name="job_requirements"
                  onChange={(e) =>
                    setExperienceInput(
                      Array.from(e.target.selectedOptions).map(
                        (options) => options.value
                      ),
                      setExperienceInput(e.target.selectedOptions[0])
                    )
                  }
                >
                  <option value="under_3_years_experience">
                    Under 3 years experience
                  </option>
                  <option value="more_than_3_years_experience">
                    Over 3 years experience
                  </option>
                  <option value="no_experience">No Experience</option>
                </select>
              </div>
            </div>*/}

            <div className="text-center">
              <button
                className="btn btn-outline-primary w-50 mt-3 p-1"
                type="submit"
                name="search"
              >
                Search For Jobs
              </button>
            </div>
          </form>
        </div>

        <div>
          {jobs.length > 0 && (
            <button onClick={toggleOtherFilters}>Additional Filters</button>
          )}
          {showOtherFilters && (
            <div>
              {searchInput !== "" && jobs.length > 0 ? (
                <>
                  <form className="form w-100 mx-auto p-5 col-12 col-md-9">
                    <div className="d-flex flex-sm-column flex-md-row justify-content-center">
                      <div className="form-group mx-2 w-50">
                        <label htmlFor="locations">
                          <b>
                            <i className="fa-solid fa-location-dot"></i>{" "}
                            Locations
                          </b>
                        </label>
                        <select
                          className="form-select w-100"
                          type="text"
                          id="locations"
                          name="locations"
                          value={locationInput || []}
                          size={uniqueLocations.length + 1}
                          onChange={(e) =>
                            setLocationInput(
                              Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                              ),
                              setLocationInput(
                                e.target.selectedOptions[0]?.value || []
                              )
                            )
                          }
                        >
                          <option
                            key="All Locations"
                            value="All Locations"
                            onClick={() => setLocationInput("All Locations")}
                          >
                            All ({uniqueLocations.length})
                          </option>
                          {uniqueLocations.sort().map((locations) => {
                            return (
                              <option
                                key={locations}
                                value={locations}
                                onClick={() => setLocationInput(locations)}
                              >
                                {locations} (
                                {
                                  jobs.filter(
                                    (job) => job.job_city === locations
                                  ).length
                                }
                                )
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      <div className="form-group mx-2 w-50">
                        <label htmlFor="jobTitles">
                          <b>
                            <i className="fa-solid fa-flag"></i> Job Titles
                          </b>
                        </label>
                        <select
                          className="form-select w-100"
                          id="jobTitles"
                          name="jobTitles"
                          type="text"
                          value={jobTitlesInput || []}
                          size={
                            uniquejobTitles.length >= 10
                              ? "10"
                              : uniquejobTitles.length + 1
                          }
                          onChange={(e) =>
                            setjobTitlesInput(
                              Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                              ),
                              setjobTitlesInput(
                                e.target.selectedOptions[0]?.value || []
                              )
                            )
                          }
                        >
                          <option
                            key="All Jobs"
                            value="All Jobs"
                            onClick={() => setjobTitlesInput("All Jobs")}
                          >
                            All ({uniquejobTitles.length})
                          </option>
                          {uniquejobTitles.sort().map((jobTitleList) => {
                            return (
                              <option
                                key={jobTitleList}
                                value={jobTitleList}
                                onClick={() => setjobTitlesInput(jobTitleList)}
                              >
                                {jobTitleList} (
                                {
                                  jobs.filter(
                                    (job) => job.job_title === jobTitleList
                                  ).length
                                }
                                )
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </form>
                </>
              ) : null}
            </div>
          )}
        </div>

        <div className="col-lg">
          <hr />
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
              <Container>
                {(locationInput.length === 0 ? jobs : filteredJobs)?.length >
                0 ? (
                  <>
                    <h2 className="text-center">
                      {(locationInput.length === 0 ? jobs : filteredJobs)
                        ?.length === 1 ? (
                        <span>
                          {
                            (locationInput.length === 0 ? jobs : filteredJobs)
                              .length
                          }{" "}
                          Result
                        </span>
                      ) : (
                        <span>
                          {
                            (locationInput.length === 0 ? jobs : filteredJobs)
                              .length
                          }{" "}
                          Results
                        </span>
                      )}{" "}
                      {locationInput.length === 0
                        ? ""
                        : "For " + filtersArray.join(", ")}
                    </h2>

                    {(locationInput.length === 0 ? jobs : filteredJobs)
                      .sort(
                        (a, b) =>
                          new Date(b.job_posted_at_datetime_utc) -
                          new Date(a.job_posted_at_datetime_utc)
                      ) //sort by newest posted first

                      .map((job) => (
                        <div key={job.job_id} className="results">
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
                            <i className="fa-solid fa-calendar-days"></i> Posted{" "}
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
                  <h3>Couldn't find any matching jobs</h3>
                )}

                <hr />
              </Container>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
