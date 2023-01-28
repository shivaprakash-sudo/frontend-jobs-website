import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

app.use(cors());

const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${process.env.apiID}&app_key=${process.env.apiKey}`;

app.get("/", async (req, res) => {
  const data = await getData(url);
  const results = await data.results;
  res.json(results);
});

function getData(url) {
  const data = fetch(url)
    .then((response) => response.json())
    .catch((err) => console.error(err));
  return data;
}

app.listen(3000, () => {
  console.log(`Listening on PORT 3000`);
});
