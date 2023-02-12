import express from "express";
import fetch from "node-fetch";
import cors from "cors";

if (process.env.NODE_ENV !== "production") {
    const { default: dotenv } = await import("dotenv");
    dotenv.config();
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", async (req, res) => {
    const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${process.env.apiID}&app_key=${process.env.apiKey}&results_per_page=30&what=frontend%20developer`;
    await sendDataToResponse(url, res);
});

app.post("/search", async (req, res) => {
    const { search, country } = req.body;
    if (search && country) {
        search.replace(" ", "%20");
        const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${process.env.apiID}&app_key=${process.env.apiKey}&results_per_page=30&what=${search}`;
        await sendDataToResponse(url, res);
    }
});

function getData(url) {
    const data = fetch(url)
        .then((response) => response.json())
        .catch((err) => console.error(err));
    return data;
}

async function sendDataToResponse(url, res) {
    const data = await getData(url);
    const results = await data.results;
    res.json(results);
}

app.listen(3000, () => {
    console.log(`Listening on PORT 3000`);
});
