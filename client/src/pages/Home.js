import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ScrollButton from "../components/ScrollButton";
import DatePostedOptions from "../components/DatePostedOptions";
import EmploymentTypeOptions from "../components/EmploymentTypeOptions";
import ExperienceOptions from "../components/ExperienceOptions";
import JobsDisplayFilterOptions from "../components/JobsDisplayFilterOptions";
import LocationDisplayFilterOptions from "../components/LocationDisplayFilterOptions";
import Results from "../components/Results";

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
  const [remoteOnly, setRemoteOnly] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send data to search endpoint
    let url = `https://jsearch.p.rapidapi.com/search?query=${searchInput}`;

    //url builder
    if (datePostedInput !== "") {
      url += `&date_posted=${datePostedInput}`;
    }

    if (experienceInput !== "") {
      url += `&job_requirements=${experienceInput}`;
    }

    if (employmentInput !== "") {
      url += `&employment_types=${employmentInput}`;
    }

    if (remoteOnly !== "false") {
      url += `&remote_jobs_only=${remoteOnly}`;
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
      const response = await fetch(url, options);
      const result = await response.json();
      setLoading(false);
      setJobs(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  //custom filters here
  const uniqueLocations = [
    ...new Set(
      jobs
        ?.map((job) =>
          job.job_city && job.job_city.length > 0
            ? job.job_city
            : "Not Specified"
        )
        .filter((location) => location !== "Not Specified")
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

  const handleExperienceChange = (e) => {
    setExperienceInput(e.target.value);
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
    setjobTitlesInput("All Jobs");
    setLocationInput("All Locations");
  };

  const filteredData =
    locationInput.length === 0 && jobTitlesInput.length === 0
      ? jobs
      : filteredJobs;

  const resultsCount = filteredData.length;

  const hasMultipleResults = resultsCount > 1;

  return (
    <div className="App">
      <main>
        <Container>
          <form name="form" id="form" className="pb-4" onSubmit={handleSubmit}>
            <label htmlFor="search"></label>
            <input
              className="form-control"
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
                <p className="text-center text-white">
                  <b>
                    Search is required. It must be to be at least 2 characters
                  </b>
                </p>
              )}
            </div>

            <br />
            <br />

            <DatePostedOptions
              handleDatePostedChange={handleDatePostedChange}
              datePostedInput={datePostedInput}
            />

            <EmploymentTypeOptions
              handleCheckboxChange={handleCheckboxChange}
              employmentInput={employmentInput}
            />

            <ExperienceOptions
              handleExperienceChange={handleExperienceChange}
              experienceInput={experienceInput}
            />

            <div className="d-flex flex-row justify-content-center justify-content-sm-start w-100 form-check text-white remote py-2 p-0">
              <div className="text-center text-sm-left">
                <label
                  className="form-check-label text-white"
                  htmlFor="remoteCheck"
                >
                  <b>
                    <i className="fa-solid fa-house-laptop"></i> Remote Only
                  </b>
                </label>
                <input
                  type="checkbox"
                  className="form-check-input ml-2"
                  id="remoteCheck"
                  name="remoteCheck"
                  onChange={(e) => setRemoteOnly(e.target.checked)}
                />
              </div>
            </div>

            <div className="d-flex flex-column text-center w-100 p-0">
              <div className="text-center w-100">
                <button
                  className="btn btn-primary col-12 col-sm-6 col-md-4 col-lg-2 mt-3 p-2"
                  type="submit"
                  name="search"
                  onClick={handleSearch}
                  disabled={loading} // Disable the button while loading
                >
                  {loading ? "Searching..." : "Search For Jobs"}
                </button>
              </div>

              <div className="text-center w-100">
                {jobs?.length > 0 && (
                  <button
                    type="button"
                    className="btn btn-primary col-12 col-sm-6 col-md-4 col-lg-2 mt-3 p-2"
                    onClick={toggleOtherFilters}
                  >
                    Additional Filters
                  </button>
                )}
              </div>
            </div>
          </form>

          {searchInput !== "" && jobs?.length > 0 && (
            <div className="row pt-4 results">
              <hr />
              {showOtherFilters && (
                <div className="col-md-5 col-lg-4 col-xl-3">
                  <>
                    <form id="sideForm">
                      <div>
                        <LocationDisplayFilterOptions
                          locationInput={locationInput}
                          setLocationInput={setLocationInput}
                          jobs={jobs}
                          uniqueLocations={uniqueLocations}
                        />

                        <JobsDisplayFilterOptions
                          jobTitlesInput={jobTitlesInput}
                          setjobTitlesInput={setjobTitlesInput}
                          jobs={jobs}
                          uniquejobTitles={uniquejobTitles}
                          locationInput={locationInput}
                        />
                      </div>
                    </form>
                  </>
                </div>
              )}

              <div
                className={`col px-5 ${
                  showOtherFilters ? "col-md-7 col-lg-8 col-xl-9" : "col-md-12"
                }`}
              >
                <div id="displayResults w-100">
                  {error ? (
                    <div className="text-danger d-flex justify-content-center">
                      {error}
                    </div>
                  ) : (
                    <>
                      <Results
                        hasMultipleResults={hasMultipleResults}
                        resultsCount={resultsCount}
                        locationInput={locationInput}
                        jobTitlesInput={jobTitlesInput}
                        filtersArray={filtersArray}
                        filteredData={filteredData}
                        searchClicked={searchClicked}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {searchClicked &&
            searchInput !== "" &&
            jobs?.length === 0 &&
            !loading && (
              <div className="col pt-4 w-100">
                <h2 className="text-white text-center">
                  No jobs match that search
                </h2>
              </div>
            )}
          {jobs?.length > 2 && <ScrollButton />}
        </Container>
      </main>
    </div>
  );
}

export default Home;
