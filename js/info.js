    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');

    // Запрос на TMDB API для получения данных о конкретном фильме
    const apiKey = 'abc4d66c0e92c7f699f91893e7f22a15';
    const movieDetailsURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

    // Функция для обновления данных о фильме на странице
    function updateMovieDetails() {
        $.ajax({
            url: movieDetailsURL,
            method: 'GET',
            success: function (data) {
                // Добавьте код для динамического обновления контента страницы
            },
            error: function (error) {
                console.error('Error fetching movie details:', error);
            }
        });
    }

    // Вызываем функцию для обновления данных о фильме
    updateMovieDetails();

