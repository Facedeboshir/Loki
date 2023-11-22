function fetchFilmDetails(tmdbId) {
    fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=abc4d66c0e92c7f699f91893e7f22a15&language=ru`)
        .then(response => response.json())
        .then(data => {
            // Обработка данных о фильме
            console.log(data);
            const moviesContainer = document.getElementById('moviesContainer');
            const filmItem = document.createElement('div');
            filmItem.classList.add('film-item');
            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
            img.alt = data.title;
            const p = document.createElement('p');
            p.textContent = data.title;
            filmItem.appendChild(img);
            filmItem.appendChild(p);
            moviesContainer.appendChild(filmItem);
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', function () {
    const filmIds = [670292, 2, 3];

    // Отправка запросов к TMDb API для каждого id фильма
    filmIds.forEach(tmdbId => {
        fetchFilmDetails(tmdbId);
    });
});
