window.onload = async () => {
  const { apiKey, apiID } = await import("./api-keys.js");
  const jobs = document.querySelector("#jobs");
  const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${apiID}&app_key=${apiKey}`;
  const options = {
    method: "GET",
    header: {
      Accept: "application/json",
    },
  };

  const data = await getData(url, options);
  const results = data.results;
  // console.log(data.results);
  if (results.length) {
    const jobsData = results.map((obj) => {
      return {
        jobTitle: obj.title,
        postedDate: obj.created,
        companyName: obj.company.display_name,
        location: obj.location.display_name,
        jobURL: obj.redirect_url,
        description: obj.description,
      };
    });

    jobsData.map((job) => {
      const article = createArticle(job);
      jobs.append(article);
    });
  }
};

function getData(url, options) {
  const data = fetch(url, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
  return data;
}

function createArticle(job) {
  const article = document.createElement("article");

  let h2 = document.createElement("h2");
  h2.textContent = job.jobTitle;

  let postedDate = document.createElement("p");
  postedDate.textContent = job.postedDate;

  let companyName = document.createElement("h4");
  companyName.textContent = job.companyName;

  let location = document.createElement("p");
  location.textContent = job.location;

  let description = document.createElement("p");
  description.textContent = job.description;

  let jobURL = document.createElement("a");
  jobURL.textContent = "Link to the job post";
  jobURL.setAttribute("href", job.jobURL);

  article.append(h2);
  article.append(companyName);
  article.append(postedDate);
  article.append(location);
  article.append(description);
  article.append(jobURL);
  return article;
}
