
const apiKey = 'abc4d66c0e92c7f699f91893e7f22a15'; 
// Функция для выполнения запроса к TMDB API.
async function fetchMoviesByGenre(genre) {
    const tmdbURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}`;
    
    try {
        const response = await fetch(tmdbURL);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Ошибка при выполнении запроса к TMDB API:', error);
        return [];
    }
}

// Функция для отображения фильмов в контейнере.
function displayMovies(movies) {
    const moviesContainer = document.getElementById('moviesContainer');
    moviesContainer.innerHTML = "";

    movies.forEach(movie => {
        const movieBlock = document.createElement('div');
        movieBlock.classList.add('movie-list-item', 'fade-in-out');
        movieBlock.innerHTML = `
            <img class="movie-list-item-img" src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt="${movie.title} постер">
        `;
        movieBlock.addEventListener('click', function () {
            // Обработка клика по блоку фильма 
            window.location.href = `https://www.youtube.com/results?search_query=${movie.title} trailer`;
        });
        moviesContainer.appendChild(movieBlock);
    });
}

// Функция для обработки клика по категории.
function showCategory(genre) {
    const moviesContainer = document.getElementById('moviesContainer');
    moviesContainer.classList.remove('fade-in-out'); // Убрать анимацию при исчезновении

    // Добавить задержку перед изменением контента, чтобы исчезновение прошло полностью
    setTimeout(() => {
        fetchMoviesByGenre(genre)
            .then(movies => {
                moviesContainer.classList.add('fade-in-out'); // Добавить анимацию при появлении
                displayMovies(movies);
            })
            .catch(error => {
                console.error('Ошибка при получении фильмов по жанру:', error);
            });
    }, 500); // Задержка в 0.5 секунды 
}

// Обработчики для кнопок различных категорий

document.querySelector('.category-button[data-category="History"]').addEventListener('click', function () {
    showCategory(36); // 36 - идентификатор жанра "History" в TMDB API
});

document.querySelector('.category-button[data-category="Horror"]').addEventListener('click', function () {
    showCategory(27); // 27 - идентификатор жанра "Horror" в TMDB API
});

document.querySelector('.category-button[data-category="Comedies"]').addEventListener('click', function () {
    showCategory(35); // 35 - идентификатор жанра "Comedy" в TMDB API
});

document.querySelector('.category-button[data-category="Lovestory"]').addEventListener('click', function () {
    showCategory(10749); // 10749 - идентификатор жанра "Romance" в TMDB API
});

document.querySelector('.category-button[data-category="Epic"]').addEventListener('click', function () {
    showCategory(12); // 12 - идентификатор жанра "Adventure" в TMDB API
});
