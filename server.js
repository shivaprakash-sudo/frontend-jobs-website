import express from "express";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import { dirname } from "path";

if (process.env.NODE_ENV !== "production") {
    const { default: dotenv } = await import("dotenv");
    dotenv.config();
}

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.static("public"));

app.get("/", async (req, res) => {
    const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${process.env.apiID}&app_key=${process.env.apiKey}&results_per_page=30&what=frontend%20developer`;
    const data = await getData(url);

    res.render("index", { data });
});

app.post("/search", async (req, res) => {
    const { search, country } = req.body;

    if (search && country) {
        search.replace(" ", "%20");
        const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${process.env.apiID}&app_key=${process.env.apiKey}&results_per_page=30&what=${search}`;
        const data = await getData(url);
        res.render("index", { data });
    }
});

async function getData(url) {
    const data = await fetch(url);
    const res = await data.json();
    return res.results;
}

app.listen(3000 || process.env.PORT, () => {
    console.log(`Listening on PORT 3000`);
});
