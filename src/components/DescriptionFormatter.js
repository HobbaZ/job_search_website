import React, { useState } from "react";

const DescriptionFormatter = ({ description, jobID }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const maxLength = 5;
  const descArray = description.split(/(?<=[.])\s+(?=[A-Z])|(?=\s+•)/);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
    document.getElementById(`${jobID}`).scrollIntoView();
  };

  const truncatedDescArray = showFullDescription
    ? descArray
    : descArray.slice(0, maxLength);

  return (
    <>
      {truncatedDescArray.map((sentence, index) => (
        <p key={index}>{sentence.trim()}</p>
      ))}
      <div className="text-center">
        {descArray.length > maxLength && (
          <button
            onClick={toggleDescription}
            className={`btn ${
              showFullDescription ? "btn-primary" : "btn-light"
            } text-center col-sm-12 col-lg-4`}
          >
            {showFullDescription ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </>
  );
};

export default DescriptionFormatter;
