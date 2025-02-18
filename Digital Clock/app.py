# app.py
from flask import Flask, jsonify
from datetime import datetime
import pytz

app = Flask(__name__)

@app.route('/time/<timezone>')
def get_time(timezone):
    tz = pytz.timezone(timezone)
    time = datetime.now(tz).strftime('%H:%M:%S')
    return jsonify({'time': time})

if __name__ == '__main__':
    app.run(debug=True)