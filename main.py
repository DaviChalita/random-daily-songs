import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())

with open('genres.txt') as file:
    genres_list = [line.rstrip() for line in file]

for genre in genres_list:
    sp.search(genre)

