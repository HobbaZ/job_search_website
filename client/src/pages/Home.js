import React, { useState } from "react";
import { Loading } from "../components/Loading";
import { Button } from "react-bootstrap";

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send data to search-filters endpoint
    let url = `https://jsearch.p.rapidapi.com/search-filters?query=${searchInput}`;

    if (datePostedInput !== "") {
      url += `&date_posted=${datePostedInput}`;
    }

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "",
        "X-RapidAPI-Host": "",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.data);
      setFilters(result.data);

      // Send data to search endpoint
      let url2 = `https://jsearch.p.rapidapi.com/search?query=${searchInput}`;
      if (datePostedInput !== "") {
        url2 += `&date_posted=${datePostedInput}`;
      }

      url2 += `&page=1&num_pages=10`;

      const options2 = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "",
          "X-RapidAPI-Host": "",
        },
      };

      try {
        const response2 = await fetch(url2, options2);
        const result2 = await response2.json();
        console.log(result2.data);
        setJobs(result2.data);
      } catch (error) {
        console.error(error);
      }
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

  filtersArray.push(locationInput, jobTitlesInput);

  return (
    <div className="App">
      <div className="main d-flex flex-column">
        <div className="w-100">
          <form
            className="form w-100 mx-auto p-5 col-12 col-md-9 col-lg-6"
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
              placeholder="Search for your dream job"
              aria-label="Search for a job"
              value={searchInput || ""}
              onChange={(e) => setSearchInput(e.target.value)}
            ></input>

            <br />
            <br />

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
              value={datePostedInput || ""}
              size="5"
              onChange={(e) => setDatePostedInput(e.target.value)}
            >
              <option value="all">All</option>
              <option value="today">Today</option>
              <option value="3days">Last 3 days</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>

            <br />
            <br />

            <label htmlFor="employment_type">
              <b>
                <i className="fa-solid fa-calendar-week"></i> Employment Type
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

            <br />
            <br />

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

            <br />
            <br />

            <div className="text-center">
              <button
                className="btn btn-outline-primary w-50 mt-3 p-1"
                type="submit"
                id="search"
                name="search"
              >
                Search For Jobs
              </button>
            </div>
          </form>
        </div>

        {searchInput !== "" && jobs.length > 0 ? (
          <>
            <label htmlFor="company_types">
              <b>
                <i className="fa-solid fa-building"></i> Company Types
              </b>
            </label>
            {filters.company_types?.sort().map((company) => (
              <Button
                key={company.name}
                onClick={() => setCompanyTypeInput(company.name)}
                active={companyTypeInput === company.name}
              >
                {company.name} ({company.est_count})
              </Button>
            ))}

            {searchInput !== "" && jobs.length > 0 ? (
              <>
                <label htmlFor="jobTitles">
                  <b>
                    <i className="fa-solid fa-flag"></i> Job Titles
                  </b>
                </label>
                <Button
                  key="All Jobs"
                  onClick={() => setjobTitlesInput("All Jobs")}
                  active={jobTitlesInput === "All Jobs"}
                >
                  All ({jobs.length})
                </Button>
                {uniquejobTitles.sort().map((jobTitle) => {
                  const jobTitles = jobs.filter(
                    (job) => job.job_title === jobTitle
                  );
                  return (
                    <Button
                      key={jobTitle}
                      onClick={() => setjobTitlesInput(jobTitle)}
                      active={jobTitlesInput === jobTitle}
                    >
                      {jobTitle} ({jobTitles.length})
                    </Button>
                  );
                })}
                <br />
                <br />
              </>
            ) : null}

            <label htmlFor="locations">
              <b>
                <i className="fa-solid fa-location-dot"></i> Locations
              </b>
            </label>
            <Button
              key="All Locations"
              onClick={() => setLocationInput("All Locations")}
              active={locationInput === "All Locations"}
            >
              All ({jobs.length})
            </Button>
            {uniqueLocations.sort().map((location) => {
              const locationJobs = jobs.filter(
                (job) => job.job_city === location
              );
              return (
                <Button
                  key={location}
                  onClick={() => setLocationInput(location)}
                  active={locationInput === location}
                >
                  {location} ({locationJobs.length})
                </Button>
              );
            })}
          </>
        ) : null}

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
              <>
                {filteredJobs.length > 0 ? (
                  <>
                    <h2>
                      {filteredJobs.length === 1 ? (
                        <span>{filteredJobs.length} Result</span>
                      ) : (
                        <span>{filteredJobs.length} Results</span>
                      )}{" "}
                      For {filtersArray.join(", ")}
                    </h2>

                    {filteredJobs
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
                ) : null}
                <hr />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
