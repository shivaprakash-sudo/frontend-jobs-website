window.onload = async () => {
    const jobs = document.querySelector("#jobs");
    const searchForm = document.querySelector("#searchForm");
    let url = "http://localhost:3000/";
    searchForm.onsubmit = async (e) => {
        // e.preventDefault();
        const formData = new FormData(searchForm);
        fetch("http://localhost:3000/search", {
            method: "post",
            body: formData,
        })
            .then((res) => res.json())
            .then(async (data) => {
                url += "search";
                location.reload();
                await populateSection(url, jobs);
            });
    };

    await populateSection(url, jobs);
};

async function populateSection(url, sectionName) {
    try {
        const data = await fetch(url);
        let results = await data.json();
        if (results.length) {
            const jobsData = results.map((obj) => {
                return {
                    jobTitle: obj.title,
                    companyName: obj.company.display_name,
                    location: obj.location.display_name,
                    jobURL: obj.redirect_url,
                    description: obj.description.slice(0, 160) + "...",
                };
            });

            jobsData.map((job) => {
                const article = createArticle(job);
                sectionName.append(article);
            });
        }
    } catch (err) {
        console.log(err);
    }
}

function createArticle(job) {
    const article = document.createElement("article");
    article.classList.add("jobPost");

    let h2 = document.createElement("h2");
    h2.textContent = job.jobTitle;
    h2.classList.add("jobTitle");

    let div = document.createElement("div");
    div.classList.add("jobContent");

    let companyName = document.createElement("h4");
    companyName.textContent = job.companyName;
    companyName.classList.add("companyName");

    let location = document.createElement("div");
    location.textContent = job.location;
    location.classList.add("location");

    let description = document.createElement("p");
    description.textContent = job.description;
    description.classList.add("description");

    let jobURL = document.createElement("a");
    jobURL.textContent = "View Full Job Post";
    jobURL.setAttribute("href", job.jobURL);
    jobURL.classList.add("jobURL");

    article.append(h2);
    div.append(companyName);
    div.append(location);
    div.append(description);
    div.append(jobURL);
    article.append(div);
    return article;
}
