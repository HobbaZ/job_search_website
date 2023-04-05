const express = require("express");
require("dotenv").config();
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/search", async (req, res) => {
  const searchValue = req.query.query;

  const requestURL =
    "https://jsearch.p.rapidapi.com/search?query=" + searchValue;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "636664ffa7msh9f70228c47a9fa0p19effajsn6516289ddbf4",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(requestURL, options);
    const data = await response.json();
    console.log("Got the data", data.data);
    res.send(data);
    res.status(200).json(data);

    if (!response.ok) {
      console.log(response);
      res.status(400).json(response);
      throw new Error("Something went wrong getting the data!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
