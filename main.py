import random

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials


class Track:
    def __init__(self, genre_track, song_track):
        self.genre_track = genre_track
        self.song_track = song_track


sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())

with open('genres.txt') as file:
    genres_list = [line.rstrip() for line in file]

tracks_list = []

for genre in genres_list:
    total = sp.search(genre, limit=1)['tracks']['total']
    offset = random.randint(0, total)
    items = sp.search(genre, limit=1, offset=offset)['tracks']['items']
    if len(items) > 0:
        song = items[0]['preview_url']
        tracks_list.append(Track(genre, song))

a = 0
