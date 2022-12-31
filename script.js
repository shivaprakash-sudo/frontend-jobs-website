window.onload = async () => {
  const jobs = document.querySelector("#jobs");
  const client_id =
    "20decdd20cd28ed967cef554a53bd9dff58443348dcc8eb482e0c762eea82a76";
  const client_secret =
    "hh5o8r3guwkq1Rwj5Fi3qzHfk2NM1T0PQxYxF70QM5zzLGB0SRaepvpu5Iohh6HJ";
  const postURL = "https://apis.indeed.com/oauth/v2/tokens";
  //   const base64Auth = buffer.Buffer.from(
  //     `${client_id}:${client_secret}`,
  //     "base64"
  //   );
  //   console.log(base64Auth);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id,
      client_secret,
    }),
  };
  const data = await getData(postURL, options);
  console.log(data);
};

function getData(url, options) {
  const data = fetch(url, options).then((res) => res.json());
  return data;
}
