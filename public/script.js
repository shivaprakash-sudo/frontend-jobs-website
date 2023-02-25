window.onload = async () => {
    const searchForm = document.querySelector("#searchForm");
    let url = "https://frontend-jobs-api.cyclic.app/";
    // let url = "http://localhost:3000/"; //for developers
    searchForm.onsubmit = async (e) => {
        const formData = new FormData(searchForm);
        fetch(url + "search", {
            method: "POST",
            body: formData,
        });
    };
};
