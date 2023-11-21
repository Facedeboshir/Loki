
const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });

  console.log(Math.floor(window.innerWidth / 270));
});

//TOGGLE

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});




// Запрос на TMDB API для получения популярных фильмов
const apiKey = 'abc4d66c0e92c7f699f91893e7f22a15'; 
const popularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

// Функция для обработки ответа от API и обновления изображений на странице
function updateMovieImages() {
    $.ajax({
        url: popularMoviesURL,
        method: 'GET',
        success: function (data) {
            const movies = data.results;
            const movieItems = document.querySelectorAll(".movie-list-item-img");

            movieItems.forEach((item, index) => {
                const movieId = movies[index].id;
                const posterPath = movies[index].poster_path;
                const imageUrl = `https://image.tmdb.org/t/p/w500/${posterPath}`;

                item.src = imageUrl;
                item.dataset.movieId = movieId;
            });
        },
        error: function (error) {
            console.error('Error fetching movie data:', error);
        }
    });
}

// Вызываем функцию для первоначального обновления изображений
updateMovieImages();

// Обработчик события для кнопок "WATCH"
document.querySelectorAll('.watch-button').forEach(button => {
  button.addEventListener('click', function () {
      const movieId = this.dataset.movieId;
      window.location.href = `info.html?movieId=${movieId}`;
  });
});
