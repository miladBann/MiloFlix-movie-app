const searchResultLabel = document.querySelector(".search_result");
const movieContainer = document.querySelector(".movie_wrapper");
const input = document.querySelector(".search");
const searchIcon = document.querySelector(".fa-magnifying-glass");


/* ############## burger menu functions #################*/
function openMenu() {
    document.body.classList += " menu--open"
}


function closeMenu() {
    document.body.classList.remove("menu--open")
}

/* ######## displaying some movies for the home page #####*/

function chooseRandomWord(){
    let num = Math.floor(Math.random() * 10);
    let options = ["love", "sex", "dead", "save", "action", "wonder", "the", "fight", "jump", "fast"]
    return options[num];
}

console.log(chooseRandomWord())

async function displayFeaturedMovies()
{
    const response = await fetch(`https://www.omdbapi.com/?apikey=45dff8d5&s=${chooseRandomWord()}`);
    const data = await response.json();

    let first_8_movies = data.Search.slice(0, 8);
    
     let moviesHTML = first_8_movies.map((movie) => {
        return `
        <div class="movie" onclick="showMovie('${movie.imdbID}')">
            <figure>
                <img src=${movie.Poster} alt="movie_poster">
            </figure>

            <h4 class="title">${movie.Title}</h4>
            <h4 class="year">${movie.Year}</h4>
        </div>
        `
    }).join("");

    movieContainer.innerHTML = moviesHTML;
}

setTimeout(() => {
    displayFeaturedMovies()
});


/* ######## searching for movies and displaying them #####*/

async function displaySearchedMovies(keyword)
{
    const response = await fetch(`https://www.omdbapi.com/?apikey=45dff8d5&s=${keyword}`);
    const data = await response.json();

     let moviesHTML = data.Search.map((movie) => {
        return `
        <div class="movie" onclick="showMovie('${movie.imdbID}')">
            <figure>
                <img src=${movie.Poster} alt="movie_poster">
            </figure>

            <h4 class="title">${movie.Title}</h4>
            <h4 class="year">${movie.Year}</h4>
        </div>
        `
    }).join("");

    searchResultLabel.innerHTML = `Results for: ${keyword}`;
    movieContainer.innerHTML = moviesHTML;
}

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter")
    {
        event.preventDefault();
        displaySearchedMovies(input.value);
    }
})


searchIcon.addEventListener("click", (event) => { 
    event.preventDefault();
    displaySearchedMovies(input.value);   
})


function showMovie(id) {
    localStorage.setItem("movieId", id);
    window.location.replace("./movie.html");
}

