window.onload = async () => {
  const jobs = document.querySelector("#jobs");
  const url = "https://frontend-jobs-api.cyclic.app";

  try {
    const data = await fetch(url);
    const results = await data.json();
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
  } catch (err) {
    console.log(err);
  }
};

function createArticle(job) {
  const article = document.createElement("article");

  let h2 = document.createElement("h2");
  h2.textContent = job.jobTitle;

  let postedDate = document.createElement("p");
  postedDate.textContent = job.postedDate;

  let companyName = document.createElement("h4");
  companyName.textContent = job.companyName;

  let location = document.createElement("div");
  location.textContent = job.location;

  let description = document.createElement("p");
  description.textContent = job.description;

  let jobURL = document.createElement("a");
  jobURL.textContent = "Full job post";
  jobURL.setAttribute("href", job.jobURL);

  article.append(h2);
  article.append(companyName);
  article.append(postedDate);
  article.append(location);
  article.append(description);
  article.append(jobURL);
  return article;
}
