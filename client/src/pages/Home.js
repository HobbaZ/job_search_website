import React, { useState } from "react";
import { Loading } from "../components/Loading";

function Home() {
  const [jobs, setJobs] = useState([]);
  //loading state
  const [loading, setLoading] = useState(false);
  // state for messages
  const [error, setError] = useState("");

  // state for messages
  const [formInput, setFormInput] = useState({
    search: "",
    datePosted: [],
    employmentType: [],
    experience: [],
    categories: [],
    classification: [],
    employerName: "",
    location: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formInput) {
      return false;
    }

    //Send data to login endpoint
    const url = `https://jsearch.p.rapidapi.com/search?query=${formInput.search.replace(
      / /g,
      "%20"
    )}&page=1&num_pages=1`;
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

  function handleChange(event) {
    const { name, value } = event.target;
    /* const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    ); */

    setFormInput({
      ...formInput,
      [name]: value,
      /* [name]: selectedOptions,*/
    });
  }

  function descriptionFormatter(description) {
    const descArray = description.split(".");
    const renderedDescArray = [];

    for (let index = 0; index < descArray.length; index++) {
      const sentence = descArray[index].trim();

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
              value={formInput.search || ""}
              onChange={handleChange}
            ></input>

            <label htmlFor="date_posted">Date Posted</label>
            <select
              multiple
              className="form-select w-100"
              id="date_posted"
              type="text"
              name="date_posted"
              value={formInput.datePosted || ""}
              size="2"
              onChange={handleChange}
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
              value={formInput.employmentType || ""}
              size="2"
              onChange={handleChange}
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
              value={formInput.experience || ""}
              size="2"
              name="job_requirements"
              onChange={handleChange}
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
              value={formInput.categories || ""}
              size="2"
              onChange={handleChange}
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
              value={formInput.classification || ""}
              size="2"
              onChange={handleChange}
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
              value={formInput.employerName || ""}
              aria-label="Enter an employer name"
              onChange={handleChange}
            ></input>

            <label htmlFor="location">Location</label>
            <input
              className="form-input w-100"
              id="location"
              type="text"
              name="location"
              placeholder="Enter a location"
              value={formInput.location || ""}
              aria-label="Enter a location"
              onChange={handleChange}
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
