window.onload = async () => {
    const jobs = document.querySelector("#jobs");
    const searchForm = document.querySelector("#searchForm");
    let url = "https://frontend-jobs-api.cyclic.app/";
    // let url = "http://localhost:3000/"; //for developers
    searchForm.onsubmit = async (e) => {
        // e.preventDefault();
        const formData = new FormData(searchForm);
        fetch(url + "search", {
            method: "post",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                // await populateSection(localURL, jobs);
                console.log(data);
            });
    };

    await populateSection(url, jobs);
};

async function getData(url) {
    try {
        const data = await fetch(url);
        let results = await data.json();
        return results;
    } catch (err) {
        console.log(err);
    }
}

async function populateSection(url, sectionName) {
    try {
        const results = await getData(url);
        if (results.length) {
            const jobsData = results.map((obj) => {
                return {
                    jobTitle: obj.title,
                    companyName: obj.company.display_name,
                    location: obj.location.display_name,
                    jobURL: obj.redirect_url,
                    description: obj.description.slice(0, 160) + "...",
                    minSalary: obj.salary_min,
                    maxSalary: obj.salary_max,
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

    let jobHeading = document.createElement("div");
    jobHeading.classList.add("jobHeading");

    let icon = document.createElement("img");
    icon.src = "images/free-logoa.png";
    icon.classList.add("jobLogo");

    let jobTitleText = document.createElement("div");
    jobTitleText.classList.add("jobText");

    let h2 = document.createElement("h2");
    h2.textContent = job.jobTitle;
    h2.classList.add("jobTitle");

    let jobContent = document.createElement("div");
    jobContent.classList.add("jobContent");

    let companyName = document.createElement("h4");
    companyName.textContent = job.companyName;
    // companyName.classList.add("companyName");

    let location = document.createElement("div");
    location.textContent = job.location;
    location.classList.add("location");

    let description = document.createElement("p");
    description.textContent = job.description;
    description.classList.add("description");

    let jobSalary = document.createElement("div");
    jobSalary.classList.add("jobSalary");

    let moneyIcon = document.createElement("img");
    moneyIcon.src = "images/icons8-coins-48.png";
    moneyIcon.classList.add("moneyIconLogo");

    let salaryRange = document.createElement("p");

    if (job.minSalary != job.maxSalary) {
        salaryRange.textContent = `${Math.round(
            job.minSalary / 1000
        )}k-${Math.round(job.maxSalary / 1000)}k`;
    } else if (job.minSalary == job.maxSalary) {
        salaryRange.textContent = `${Math.round(job.minSalary / 1000)}k`;
    }

    jobHeading.append(icon);
    jobTitleText.append(h2);
    jobTitleText.append(companyName);
    jobHeading.append(jobTitleText);
    jobContent.append(description);
    jobContent.append(location);
    jobSalary.append(moneyIcon, salaryRange);
    article.append(jobHeading);
    article.append(jobContent);
    article.append(jobSalary);
    return article;
}
