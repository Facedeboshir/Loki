    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('movieId');

    const apiKey = 'abc4d66c0e92c7f699f91893e7f22a15';
    const movieDetailsURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

    // Функция для обновления данных о фильме на странице
    function updateMovieDetails() {
        $.ajax({
            url: movieDetailsURL,
            method: 'GET',
            success: function (data) {
            },
            error: function (error) {
                console.error('Error fetching movie details:', error);
            }
        });
    }
    updateMovieDetails();

