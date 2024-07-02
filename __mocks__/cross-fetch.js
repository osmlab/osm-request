module.exports = (url, opts) => {
  if (url && url.includes("notfound")) {
    return Promise.resolve({ status: 404, statusText: "Not Found", text: () => Promise.resolve("Mock cross-fetch error") });
  } else {
    return Promise.resolve({ status: 200, statusText: "OK", text: () => Promise.resolve("Mock cross-fetch success") });
  }
};
