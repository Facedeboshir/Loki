// script.js

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const apiKey = 'abc4d66c0e92c7f699f91893e7f22a15'; // Замените YOUR_TMDB_API_KEY на свой ключ.

searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const searchTerm = searchInput.value;

    // Выполнение запроса к TMDB API.
    const tmdbURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;
    
    try {
        const response = await fetch(tmdbURL);
        const data = await response.json();

        // Очищаем предыдущие результаты перед обновлением.
        searchResults.innerHTML = "";

        // Обрабатываем каждый результат и создаем соответствующий блок.
        data.results.forEach(movie => {
            const resultBlock = document.createElement('div');
            resultBlock.classList.add('result-block');
            resultBlock.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt="${movie.title} постер">
                <p>Название фильма: ${movie.title}</p>
            `;
            resultBlock.addEventListener('click', function () {
                // Обработка клика по блоку результата (например, переход на ссылку в YouTube).
                window.location.href = `https://www.youtube.com/results?search_query=${movie.title} trailer`;
            });
            searchResults.appendChild(resultBlock);
        });

    } catch (error) {
        console.error('Ошибка при выполнении запроса к TMDB API:', error);
    }
});
