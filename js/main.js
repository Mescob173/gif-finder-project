// Handles form submission
const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const results = document.querySelector("#results");

const apiKey = "xxEQJJhqCJH4wc09nuyxwTa1abnfIFn6";

// Handles form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchTerm = input.value.trim();

  if (searchTerm === "") {
    results.innerHTML = "<p>Please type something to search.</p>";
    return;
  }

  getGifs(searchTerm);
});

function getGifs(searchTerm) {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=12&rating=g`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (giphyData) {
      displayGifs(giphyData.data);
    })
    .catch(function (error) {
      results.innerHTML = "<p>Something went wrong. Please try again.</p>";
      console.log(error);
    });
}

function displayGifs(gifs) {
  results.innerHTML = "";

  gifs.forEach(function (gif) {
    const gifCard = document.createElement("div");
    gifCard.classList.add("gif-card");

    const img = document.createElement("img");
    img.src = gif.images.fixed_height.url;
    img.alt = gif.title;

    gifCard.appendChild(img);

    results.appendChild(gifCard);

  });
}