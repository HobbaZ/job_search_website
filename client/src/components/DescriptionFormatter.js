import React from "react";

//Render descriptions as bullet points for readability

const DescriptionFormatter = ({ description }) => {
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
};

export default DescriptionFormatter;
