const displaycardsElement = document.querySelector("#displayResults");
const searchInput = document.querySelector("#search");
const formButton = document.querySelector("#search_button");

const handleFormSubmit = async (event) => {
  event.preventDefault();

  const searchValue = searchInput.value.trim();
  //const requestURL = "/search?query=" + searchValue;

  const requestURL =
    "https://jsearch.p.rapidapi.com/search?query=" + searchValue;
  // Clear the display cards element
  displaycardsElement.innerHTML = "";

  if (!searchValue) {
    console.log("No search value entered");
    return false;
  }

  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "",
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    };

    const response = await fetch(requestURL, options);
    const data = await response.json();

    const results = document.createElement("h2");
    results.classList.add("text-center");
    results.innerHTML = `${data.data.length} results found for ${searchValue}</br>`;
    // attach data to element and display
    data.data.forEach((job) => {
      // create card div
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");

      // create card body div
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      // create card title div
      const cardTitle = document.createElement("h3");
      const cardLink = document.createElement("a");
      cardLink.innerHTML = job.job_apply_link;
      cardTitle.appendChild(cardLink);
      cardTitle.classList.add("card-title");
      cardTitle.innerHTML = `${job.job_employment_type} ${job.job_title} <b>${job.employer_name}</b>`;

      // create card subtitle div
      const cardButtonLink = document.createElement("a");
      cardButtonLink.classList.add("text-center", "btn", "btn-primary");
      cardButtonLink.href = job.job_apply_link;
      cardButtonLink.innerHTML = "Apply on " + job.job_publisher;

      const cardImage = document.createElement("img");
      cardImage.classList.add("img-thumbnail", "rounded", "float-right");
      cardImage.src = job.employer_logo;
      cardImage.alt = job.employer_name;
      cardTitle.appendChild(cardImage);

      /* const cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardText.innerHTML = job.job_highlights; */

      const cardDesc = document.createElement("p");
      cardDesc.classList.add("card-text");
      cardDesc.innerHTML = "<b>Description</b></br>" + job.job_description;

      // Append things to each other to create card component

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardButtonLink);
      // cardBody.appendChild(cardText);
      cardBody.appendChild(cardDesc);
      cardElement.appendChild(cardBody);

      displaycardsElement.appendChild(results);
      displaycardsElement.appendChild(cardElement);
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("something went wrong getting the data!");
    }
  } catch (err) {
    console.error(err);
  }
};

formButton.addEventListener("click", handleFormSubmit);
