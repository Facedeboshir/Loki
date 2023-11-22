document.addEventListener("DOMContentLoaded", function () {
    var releaseDate1;
    var releaseDate2;

    // Запрос к TMDb API для получения списка фильмов в ожидании
    $.ajax({
        url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=abc4d66c0e92c7f699f91893e7f22a15&language=ru&page=1',
        method: 'GET',
        success: function (data) {
            // Фильтруем только будущие фильмы
            var upcomingMovies = data.results.filter(function (movie) {
                return moment(movie.release_date).isAfter(moment());
            });

            // Выбираем первый фильм из списка
            if (upcomingMovies.length >= 2) {
                releaseDate1 = moment.utc(upcomingMovies[0].release_date);
                releaseDate2 = moment.utc(upcomingMovies[1].release_date);

                // Обновляем таймеры и постеры каждую секунду
                setInterval(function () {
                    updateMovieData(1, releaseDate1, "timer1", upcomingMovies[0].title, upcomingMovies[0].id);
                    updateMovieData(2, releaseDate2, "timer2", upcomingMovies[1].title, upcomingMovies[1].id);
                }, 1000);
            } else {
                console.error('Not enough upcoming movies found.');
            }
        },
        error: function (error) {
            console.error('Error fetching upcoming movies data:', error);
        }
    });

    function updateMovieData(movieIndex, releaseDate, timerId, movieName, movieId) {
        var currentDate = moment.utc();
        var timeDifference = moment.duration(releaseDate.diff(currentDate));

        // Получаем оставшееся время в днях, часах, минутах и секундах
        var daysRemaining = timeDifference.days();
        var hoursRemaining = timeDifference.hours();
        var minutesRemaining = timeDifference.minutes();
        var secondsRemaining = timeDifference.seconds();

        // Обновляем элемент с id=timer на странице
        document.getElementById(timerId).innerHTML = daysRemaining + " days " +
            hoursRemaining + " hours " +
            minutesRemaining + " minutes " +
            secondsRemaining + " seconds";

        // Запрос к TMDb API для получения информации о фильме
        $.ajax({
            url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=abc4d66c0e92c7f699f91893e7f22a15&language=ru`,
            method: 'GET',
            success: function (movieData) {
                // Обновляем изображение фильма и альтернативный текст
                var movieImage = document.getElementById(`movie${movieIndex}`);
                movieImage.src = `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`;
                movieImage.alt = `Постер ${movieName}`;
            },
            error: function (error) {
                console.error('Error fetching movie data:', error);
            }
        });
    }
});
