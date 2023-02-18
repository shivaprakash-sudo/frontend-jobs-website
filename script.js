window.onload = async () => {
    const jobs = document.querySelector("#jobs");
    const searchForm = document.querySelector("#searchForm");
    let url = "https://frontend-jobs-api.cyclic.app/";
    searchForm.onsubmit = async (e) => {
        // e.preventDefault();
        const formData = new FormData(searchForm);
        fetch(url + "search", {
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
                    minSalary: obj.salary_min,
                    maxSalary: obj.salary_max
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

    let div1 = document.createElement("div");
    div1.classList.add("jobHeading");

    let icon = document.createElement("img");
    icon.src = "images/free-logoa.png";
    icon.classList.add("jobLogo");

    let div3 = document.createElement("div");
    div3.classList.add("jobText");

    let h2 = document.createElement("h2");
    h2.textContent = job.jobTitle;
    h2.classList.add("jobTitle");

    let div2 = document.createElement("div");
    div2.classList.add("jobContent");

    let companyName = document.createElement("h4");
    companyName.textContent = job.companyName;
    // companyName.classList.add("companyName");

    let location = document.createElement("div");
    location.textContent = job.location;
    location.classList.add("location");

    let description = document.createElement("p");
    description.textContent = job.description;
    description.classList.add("description");

    let div4 = document.createElement("div");
    div4.classList.add("jobSalary");

    let money = document.createElement("img");
    money.src = "images/icons8-coins-48.png";
    money.classList.add("moneyLogo");

    let salaryRange = document.createElement("p");
    if(job.minSalary=="Undisclosed"||job.minSalary<=0){
        salaryRange.textContent = "Undisclosed";
    }else if(job.minSalary!=job.maxSalary){
        salaryRange.textContent = `${Math.round(
            job.minSalary / 1000
        )}k-${Math.round(job.maxSalary / 1000)}k`;
    }else if(job.minSalary==job.maxSalary){
        salaryRange.textContent = `${Math.round(
            job.minSalary / 1000
        )}k`;
    }

    // let jobURL = document.createElement("a");
    // jobURL.textContent = "View Full Job Post";
    // jobURL.setAttribute("href", job.jobURL);
    // jobURL.classList.add("jobURL");

    div1.append(icon);
    div3.append(h2);
    div3.append(companyName);
    div2.append(description);
    div2.append(location);
    div4.append(money, salaryRange);
    // div4.append(salaryRange);
    // div.append(jobURL);
    div1.append(div3);
    article.append(div1);
    article.append(div2);
    article.append(div4);
    return article;
}
