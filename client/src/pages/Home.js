import React, { useState } from "react";
import { Loading } from "../components/Loading";

function Home() {
  const [jobs, setJobs] = useState([]);
  //loading state
  const [loading, setLoading] = useState(false);
  // state for messages
  const [error, setError] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [datePostedInput, setDatePostedInput] = useState([]);
  const [employmentInput, setEmploymentInput] = useState([]);
  const [experienceInput, setExperienceInput] = useState([]);
  const [categoriesInput, setCategoriesInput] = useState([]);
  const [classificationInput, setClassificationInput] = useState([]);
  const [employerNameInput, setEmployerNameInput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Send data to login endpoint
    const url = `https://jsearch.p.rapidapi.com/search?query=${searchInput.replace(
      / /g,
      "%20"
    )}`;
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
    const descArray = description.split(".");
    const renderedDescArray = [];

    for (let index = 0; index < descArray.length; index++) {
      renderedDescArray.push(
        <p key={index}>
          {descArray[index]}
          <br />
        </p>
      );
    }

    return <>{renderedDescArray}</>;
  }

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
              value={datePostedInput || []}
              size="2"
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
              value={employmentInput || []}
              size="2"
              onChange={(e) =>
                setEmploymentInput(
                  Array.from(e.target.selectedOptions).map(
                    (options) => options.value
                  )
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
              size="2"
              name="job_requirements"
              onChange={(e) =>
                setExperienceInput(
                  Array.from(e.target.selectedOptions).map(
                    (options) => options.value
                  )
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

            <label htmlFor="categories">Categories/Industries</label>
            <select
              multiple
              className="form-select w-100"
              id="categories"
              type="text"
              name="categories"
              value={categoriesInput || []}
              size="2"
              onChange={(e) =>
                setCategoriesInput(
                  Array.from(e.target.selectedOptions).map(
                    (options) => options.value
                  )
                )
              }
            >
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
            </select>

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
                  )
                )
              }
            >
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
            </select>

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
                {jobs && jobs.length > 0 ? (
                  jobs.map((job) => (
                    <div key={job.job_id}>
                      <h1>
                        {job.job_employment_type} {job.job_title} At{" "}
                        {job.employer_name}
                      </h1>
                      <p></p>
                      <a href={job.job_apply_link}>
                        Apply on {job.job_publisher}
                      </a>

                      <br />

                      <a href={job.employer_website}>{job.employer_name}</a>

                      <div>{descriptionFormatter(job.job_description)}</div>
                    </div>
                  ))
                ) : (
                  <div>Couldn't find any matching jobs</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
