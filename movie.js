const movieContainer = document.querySelector(".movie_cont");


async function showMovieInfo(movieID)
{
    const response = await fetch(`http://www.omdbapi.com/?apikey=45dff8d5&i=${movieID}&plot=full`);
    const data = await response.json();

    let movieHTML = `
    <div class="movie_pic">
    <button ><a href="index.html">Go Back</a></button>
    <img src="${data.Poster}" alt="" >
    </div>

    <div class="divider"></div>

    <div class="movie_info">
        <h3 class="title ">${data.Title}</h3>

        <div class="time_genre">
            <h3 class="duration">${data.Runtime}</h3>
            <h3>${data.Genre}</h3>
        </div>

        <h3 class="released">${data.Released}</h3>

        <div>
            <h3 class="summary">Summary:</h3>
            <p class="plot">${data.Plot}</p>
        </div>
        

        <div class="watch_movie">
            <h3 class="rating">Rating: ${data.imdbRating}/10</h3>

            <div class="btns">
                <button>Watch Now</button>
                <button>Trailer</button>
            </div>
        </div>
        
    </div>
    `

    movieContainer.innerHTML = movieHTML;
}


showMovieInfo(localStorage.getItem("movieId"))


/* ############## burger menu functions #################*/
function openMenu() {
    document.body.classList += " menu--open"
}


function closeMenu() {
    document.body.classList.remove("menu--open")
}