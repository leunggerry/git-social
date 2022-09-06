module.exports = {
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },

  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }
    return word;
  },

  format_url: (url) => {
    //replace returns the modified string, chain methods
    return url
      .replace("http://", "")
      .replace("https://", "")
      .replace("www.", "")
      .split("/")[0]
      .split("?")[0];
  },

  check_document_location: (currentPage) => {
    currentPage = document.location.pathname;
    if (currentPage === "/login") {
      return true;
    }
    return currentPage;
  },

  getGithubUsername: (url) => {
    const username = url.split("/")[url.split("/").length - 1];

    return username;
};
