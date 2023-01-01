window.onload = async () => {
  const { rapidAPIKey } = await import("./api-keys.js");
  const jobs = document.querySelector("#jobs");
  const url = "https://linkedin-jobs-search.p.rapidapi.com/";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": rapidAPIKey,
      "X-RapidAPI-Host": "linkedin-jobs-search.p.rapidapi.com",
    },
    body: '{"search_terms":"frontend developer","location":"30301","page":"1"}',
  };

  const data = await getData(url, options);
  const jobsData = data.map((obj) => {
    return {
      job_title: obj.job_title,
      posted_date: obj.posted_date,
      company_name: obj.company_name,
      company_url: obj.company_url,
      job_url: obj.job_url,
    };
  });

  jobsData.map((job) => {
    const article = createArticle(job);
    jobs.append(article);
  });
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
  h2.textContent = job.job_title;

  let postedDate = document.createElement("p");
  postedDate.textContent = job.posted_date;

  let companyName = document.createElement("p");
  companyName.textContent = job.company_name;

  let companyURL = document.createElement("a");
  companyURL.textContent = job.company_url;

  let jobURL = document.createElement("a");
  jobURL.textContent = job.job_url;

  article.append(h2);
  article.append(postedDate);
  article.append(companyName);
  article.append(companyURL);
  article.append(jobURL);
  return article;
}
