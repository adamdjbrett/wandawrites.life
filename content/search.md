---
layout: page.njk
title: Search
excerpt: Search for a page or post you're looking for
---

<label for="search">Search term:</label>
<input id="search" type="search" name="search" placeholder="e.g. About" autocomplete="off" />

<ul id="list"></ul>

<script src="/assets/js/fetch.js"></script>
<script>
  const endpoint = "/assets/search.json";
  const pages = [];

  fetch(endpoint)
    .then((blob) => blob.json())
    .then((data) => pages.push(...data));

  function findResults(termToMatch, records) {
    return records.filter((item) => {
      const regex = new RegExp(termToMatch, "gi");
      return (item.title && item.title.match(regex)) || (item.content && item.content.match(regex));
    });
  }

  function displayResults() {
    const resultsArray = findResults(this.value, pages);
    const html = resultsArray
      .map((item) => `<li><article><h4><a href="${item.url}">${item.title}</a></h4><p>${item.excerpt || ""}</p></article></li>`)
      .join("");

    resultsList.innerHTML = resultsArray.length === 0 || this.value === "" ? "<p>Sorry, nothing was found</p>" : html;
  }

  const field = document.querySelector("#search");
  const resultsList = document.querySelector("#list");

  field.addEventListener("keyup", displayResults);
  field.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  });
</script>
<noscript>Please enable JavaScript to use the search form.</noscript>
