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

const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${process.env.apiID}&app_key=${process.env.apiKey}&results_per_page=30&what=frontend%20developer`;

app.get("/", async (req, res) => {
    const data = await getData(url);
    const results = await data.results;
    res.json(results);
});

app.post("/search", async (req, res) => {
    console.log(req.body);
    res.json({
        message: "Form data is sent succesfully!",
    });
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
