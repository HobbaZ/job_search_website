import React, { useState } from "react";
import { Loading } from "../components/Loading";

function Home() {
  const [jobs, setJobs] = useState([]);
  //loading state
  const [loading, setLoading] = useState(false);
  // state for messages
  const [error, setError] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [datePostedInput, setDatePostedInput] = useState("");
  const [employmentInput, setEmploymentInput] = useState([]);
  const [experienceInput, setExperienceInput] = useState([]);
  const [categoriesInput, setCategoriesInput] = useState([]);
  const [classificationInput, setClassificationInput] = useState([]);
  const [employerNameInput, setEmployerNameInput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Send data to login endpoint
    const url = `https://jsearch.p.rapidapi.com/search?query=${searchInput.replace(
      " ",
      "%20"
    )}
    ${datePostedInput !== "" && `&date_posted=${datePostedInput}`}${
      employmentInput !== "" && `&employment_types=${employmentInput}`
    }${categoriesInput !== "" && `&categories=${categoriesInput}`}
    &page=1&num_pages=10`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "",
        "X-RapidAPI-Host": "",
      },
    };

    //rest of query for options
    /* ${datePostedInput !== "" && `&date_posted=${datePostedInput}`}${
      employmentInput !== "" && `&employment_types=${employmentInput}`
    }${experienceInput !== "" && `&job_requirements=${experienceInput}`}${
      categoriesInput !== "" && `&categories=${categoriesInput}`
    }
      ${classificationInput !== "" && `&categories=${classificationInput}`}
      */

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result.data);
      setJobs(result.data);
    } catch (error) {
      console.error(error);
    }

    /* try {
      const response = await fetch(
        `http://127.0.0.1:4000/api/search?query=${formInput.search}`
      );
      const result = await response.json();
      console.log(result.data);
      setJobs(result.data);
    } catch (error) {
      console.error(error);
    } */
  };

  function descriptionFormatter(description) {
    const descArray = description.split(/(?<=[.!?])\s+(?=[A-Z])|(?=\s+•)/);
    const bulletPoints = descArray.filter((sentence) =>
      sentence.trim().startsWith("•")
    );
    const renderedDescArray = [];

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

    return dayDifference.toFixed(0) > 1
      ? dayDifference.toFixed(0) + " days ago"
      : dayDifference.toFixed(0) === "1"
      ? dayDifference.toFixed(0) + " day ago"
      : "Today";
  }

  const uniqueJobTitles = [...new Set(jobs?.map((job) => job.job_title))];

  return (
    <div className="App">
      <div className="main">
        <div className="w-50 mx-auto p-4">
          <form
            className="form w-100 p-5"
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

            <label htmlFor="date_posted">Date Posted</label>
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

            <label htmlFor="employment_type">Employment Type</label>
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

            <label htmlFor="job_requirements">Experience</label>
            <select
              multiple
              className="form-select w-100"
              id="job_requirements"
              type="text"
              value={experienceInput || []}
              size="4"
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

            {searchInput !== "" && jobs.length > 4 ? (
              <>
                <label htmlFor="categories">Categories/Industries</label>
                <select
                  multiple
                  className="form-select w-100"
                  id="categories"
                  type="text"
                  name="categories"
                  value={categoriesInput || []}
                  size={uniqueJobTitles.length}
                  onChange={(e) =>
                    setCategoriesInput(
                      Array.from(e.target.selectedOptions).map(
                        (options) => options.value
                      ),
                      setCategoriesInput(e.target.selectedOptions[0])
                    )
                  }
                >
                  {uniqueJobTitles.sort().map((jobTitle) => (
                    <option key={jobTitle}>{jobTitle}</option>
                  ))}
                </select>
              </>
            ) : null}

            <label htmlFor="company_types">Classification</label>
            <select
              multiple
              className="form-select w-100"
              id="company_types"
              type="text"
              name="company_types"
              value={classificationInput || []}
              size="2"
              onChange={(e) =>
                setClassificationInput(
                  Array.from(e.target.selectedOptions).map(
                    (options) => options.value
                  ),
                  setClassificationInput(e.target.selectedOptions[0])
                )
              }
            ></select>

            <label htmlFor="employers">Employer Name</label>
            <input
              className="form-input w-100"
              id="employers"
              type="text"
              name="employers"
              placeholder="Enter an employer name"
              value={employerNameInput || ""}
              aria-label="Enter an employer name"
              onChange={(e) => setEmployerNameInput(e.target.value)}
            ></input>

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

        <div className="col-lg">
          <hr />
          <div id="displayResults">
            {loading ? (
              <div className="d-flex justify-content-center">
                <Loading />
              </div>
            ) : error ? (
              <div
                className="text-danger d-flex justify-content-center"
                role="alert"
              >
                {error}
              </div>
            ) : (
              <>
                {jobs.length > 0 && searchInput !== "" ? (
                  <h2>Results: {jobs.length}</h2>
                ) : (
                  <p>Couldn't find any matching jobs</p>
                )}

                {jobs.length > 0
                  ? jobs
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
                            {job.job_employment_type} | Posted{" "}
                            {dateFormatter(job.job_posted_at_datetime_utc)} |{" "}
                            {job.job_city}, {job.job_state}
                          </h6>
                          <a href={job.job_apply_link}>
                            Apply on {job.job_publisher}
                          </a>
                          <br />
                          <div>{descriptionFormatter(job.job_description)}</div>
                        </div>
                      ))
                  : null}
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
