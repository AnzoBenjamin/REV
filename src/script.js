const API_URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=6a06f6cef3d768e50f7cebabd4d86561";
const API_IMG = "https://image.tmdb.org/t/p/w500";
let movieParameter = "&sort_by=popularity.desc&page=1";
let moviedb = API_URL + movieParameter;
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=6a06f6cef3d768e50f7cebabd4d86561&query=";

const popularMovie = document.querySelector(".popular__movies");
const discover = document.querySelector(".discover-container");
const selected = document.querySelector(".select");
const form = document.querySelector(".input-form");
const searchItem = document.querySelector(".input");
let dropdownValue = 0;

fetchMovies(moviedb);

selected.addEventListener("change", (e) => {
  e.preventDefault();
  dropdownValue = e.target.value;
  if (dropdownValue == 1) {
    moviedb= API_URL + "&sort_by=vote_count.desc&page=1";
  }
  else if(dropdownValue == 2) {
    moviedb = API_URL + "&sort_by=popularity.desc&page=1";
  }
  else if(dropdownValue == 3) {
    moviedb = API_URL + "&sort_by=vote_average.desc&page=1";
  }
  else if(dropdownValue == 4) {
    moviedb = API_URL + "&sort_by=original_title.asc&page=1";
  }
  else if(dropdownValue == 5) {
    moviedb = API_URL + "&sort_by=release_date.desc&page=1";
  }
  fetch(moviedb)
    .then((response) => response.json())
    .then((data) => {
      discover.innerHTML = "";
      showMovies(data.results);
    });
});

form.addEventListener("submit", (e)=>{
  e.preventDefault();
  const searchInput = (searchItem.value);
  fetchMovies(SEARCH_URL+searchInput);
})

async function fetchMovies(url) {
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    discover.innerHTML = "";
    showMovies(data.results);
  });
}

function showMovies(movies) {
  movies.forEach((movie, index) => {
    const { title, overview, poster_path, vote_average } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("discover__movie-container");
    movieEl.innerHTML = `
    <div class="discover__movie-container">
            <div class="movie-container__front">
                <img src="${API_IMG + poster_path}" alt="" />
                <p class="text-lg movie-container__front-title">
                ${title}
                </p>
            </div>
            <div class="movie-container__back hidden">
                <p>${overview}</p>
                <span>${vote_average}</span>
            </div>
          </div>`;
    discover.appendChild(movieEl);
  });
}
fetch(moviedb)
  .then((response) => response.json())
  .then((response) => response.results)
  .then((response) => response.slice(0, 5))
  .then((response) => {
    response.forEach((movie, index) => {
      console.log(`slide${index + 1}`);
      popularMovie.innerHTML += `
    <div id="item${index + 1}" class= "carousel-item w-full">
    <div class="popular__image-container">
    <img src="${API_IMG + movie.poster_path}" class="w-full" alt="" />
    </div>
    <div class="popular__movie-info p-4">
    <h3 class="text-lg mb-4">${movie.title}</h3>
    <p class="text-sm mb-2">${movie.overview}
    </p>
    <span>${movie.vote_average}</span>
    </div>
    </div>
    `;
    });
  });
