module.exports = (url, opts) => {
  return Promise.resolve({ status: 200, text: () => Promise.resolve("OK") });
};
