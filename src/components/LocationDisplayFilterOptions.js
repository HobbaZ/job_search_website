import React from "react";

const LocationDisplayFilterOptions = ({
  locationInput,
  setLocationInput,
  jobs,
  uniqueLocations,
}) => {
  return (
    <div className="form-group mx-2">
      <label htmlFor="locations">
        <b>
          <i className="fa-solid fa-location-dot"></i> Locations
        </b>
      </label>

      {/**Create all Locations button */}
      <button
        className={`w-100 btn ${
          locationInput === "All Locations" ? "btn-primary" : "btn-light"
        } filterButton`}
        key="All Locations"
        type="button"
        onClick={() => setLocationInput("All Locations")}
      >
        All Locations
      </button>

      {/**Create other Locations buttons */}
      {uniqueLocations.sort().map((location) => {
        const locationJobs = jobs.filter((job) => job.job_city === location);
        return (
          <button
            className={`w-100 btn btn-${
              locationInput === location ? "primary" : "light"
            } filterButton`}
            type="button"
            key={location}
            onClick={() => setLocationInput(location)}
          >
            {location} ({locationJobs.length})
          </button>
        );
      })}
    </div>
  );
};

export default LocationDisplayFilterOptions;
