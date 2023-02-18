import express from "express";
import http from "http";
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

const options = {
    hostname: "dylanvarner.com",
    path: "/",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};

app.get("/", async (req, res) => {
    const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${process.env.apiID}&app_key=${process.env.apiKey}&results_per_page=30&what=frontend%20developer`;
    const data = await getData(url);
    // const httpReq = http.request(options, (response) => {
    //     response.pipe(res);
    // });

    // httpReq.on("error", (err) => {
    //     console.log(err);
    // });

    // httpReq.write(JSON.stringify(data));
    // httpReq.end();
    res.json(data);
});

app.post("/search", async (req, res) => {
    const { search, country } = req.body;

    if (search && country) {
        search.replace(" ", "%20");
        const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${process.env.apiID}&app_key=${process.env.apiKey}&results_per_page=30&what=${search}`;
        const data = await getData(url);
        res.json(data);
        // res.redirect("/");
        // console.log(data);
        const req = http.request(options, (response) => {
            response.pipe(res);
        });

        req.on("error", (err) => {
            console.log(err);
        });

        req.write(JSON.stringify(data));
        req.end();
    }
});

async function getData(url) {
    const data = await fetch(url);
    const res = await data.json();
    return res.results;
}

app.listen(3000, () => {
    console.log(`Listening on PORT 3000`);
});
