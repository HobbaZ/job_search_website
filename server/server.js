import express from "express";
import path from "path";
import cors from "cors";
import fetch from "node-fetch";
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/api/search", async (req, res) => {
  const searchString = `query=${req.query.query}`;

  const url = `https://jsearch.p.rapidapi.com/search?${searchString}&page=1&num_pages=1`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${process.env.X_RapidAPI_Key}`,
      "X-RapidAPI-Host": `${process.env.X_RapidAPI_Host}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
