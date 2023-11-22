import requests

url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNWRjMDA1YTE2YTZmMTk4NzVkMTE1NWFjNmIyZjY3MyIsInN1YiI6IjY1NWQxYzA3MDgxNmM3MDBjM2RlZDcxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cZflOmHmj2pCWI_xK76NfWx5lkhl3QLYrakPY4bDySo"
}
response = requests.get(url, headers=headers)
data = response.json()
movies = data.get('results', [])

print(response.text)