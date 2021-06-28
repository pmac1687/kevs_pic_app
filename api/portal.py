# importing the flask library files
from flask import Flask
import json
from flask_cors import CORS
import csv
import psycopg2
import keys

#create flask web app object
app = Flask(__name__)
CORS(app)

@app.route("/add_row/<slug>")
def add_row(slug):
    name = slug.split('&')[0]
    occ = slug.split('&')[1]
    tags = slug.split('&')[2]
    date = slug.split('&')[3]
    fileType = slug.split('&')[4]
    location = slug.split('&')[5]
    conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
    cur = conn.cursor()
    #cur.execute(f"select * from master_ticker_list limit 5;")
    try:
        cur.execute(f"""insert into kevspics(name, type, date, tags, location, event ) values('{name}','{fileType}','{date}','{tags}','{location}','{occ}') """)
    except Exception as e:
        print(e)
    conn.commit()
    conn.close()

    return json.dumps('hello')

@app.route("/get_rows")
def get_rows():
    conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
    cur = conn.cursor()
    #cur.execute(f"select * from master_ticker_list limit 5;")
    try:
        cur.execute(f"""select * from kevspics; """)
    except Exception as e:
        print(e)
    conn.commit()
    conn.close()




#run the app
if __name__ == "__main__":
    app.run(debug=True)