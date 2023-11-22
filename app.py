from flask import Flask, render_template
import requests


app = Flask(__name__)

TMDB_API_KEY = '35dc005a16a6f19875d1155ac6b2f673'; 
TMDB_API_URL = f"https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1";

@app.route('/login', methods=('POST', "GET"))
def login():
    return render_template('login.html')

@app.route('/register', methods=('POST', "GET"))
def register():
    return render_template('register.html')

@app.route('/')
def index():

    url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNWRjMDA1YTE2YTZmMTk4NzVkMTE1NWFjNmIyZjY3MyIsInN1YiI6IjY1NWQxYzA3MDgxNmM3MDBjM2RlZDcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cZflOmHmj2pCWI_xK76NfWx5lkhl3QLYrakPY4bDySo"
    }
    response = requests.get(url, headers=headers)
    data = response.json()
    movies = data.get('results', [])


    url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
    response = requests.get(url, headers=headers)
    data = response.json()
    top_rates = data.get('results', [])

    url = "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1"
    response = requests.get(url, headers=headers)
    data = response.json()
    popular_shows = data.get('results', [])

    return render_template('index.html', movies=movies, top_rates = top_rates, popular_shows = popular_shows)

@app.route('/categories')
def categories():
    return render_template('categories.html')

@app.route('/calendar')
def calendar():
    url = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"

    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNWRjMDA1YTE2YTZmMTk4NzVkMTE1NWFjNmIyZjY3MyIsInN1YiI6IjY1NWQxYzA3MDgxNmM3MDBjM2RlZDcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cZflOmHmj2pCWI_xK76NfWx5lkhl3QLYrakPY4bDySo"
    }

    response = requests.get(url, headers=headers)



    return render_template('calendar.html')

@app.route('/change_password')
def change_password():
    return render_template('change_password.html')

@app.route('/show/<show_id>')
def movie_detail(show_id):
    url = f"https://api.themoviedb.org/3/movie/{show_id}?language=en-US"
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNWRjMDA1YTE2YTZmMTk4NzVkMTE1NWFjNmIyZjY3MyIsInN1YiI6IjY1NWQxYzA3MDgxNmM3MDBjM2RlZDcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cZflOmHmj2pCWI_xK76NfWx5lkhl3QLYrakPY4bDySo"
    }

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return render_template('movie_data.html', movie=response.json())
    else:
        # Обработка ошибок, например, если не удалось получить данные
        return ('Failed to fetch movie data')


if __name__ == '__main__':
    app.run(debug=True)
