import json
import random

import spotipy
from flask import Flask
from flask import jsonify
from spotipy.oauth2 import SpotifyClientCredentials

app = Flask(__name__)


@app.route('/random-daily-songs/', methods=['GET'])
def execute():
    class Track:
        def __init__(self, genre_track, song_track):
            self.genre_track = genre_track
            self.song_track = song_track

        def obj_dict(obj):
            return obj.__dict__

    sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())

    with open('genres.txt') as file:
        genres_list = [line.rstrip() for line in file]

    tracks_list = []

    for genre in genres_list[:10]:
        total = sp.search(genre, limit=1)['tracks']['total']
        offset = random.randint(0, total)
        items = sp.search(genre, limit=1, offset=offset)['tracks']['items']
        if len(items) > 0:
            song = items[0]['preview_url']
            tracks_list.append(Track(genre, song))

    return json.dumps([ob.__dict__ for ob in tracks_list])


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)
