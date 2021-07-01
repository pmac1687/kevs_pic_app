# importing the flask library files
from flask import Flask, request
import json
from flask_cors import CORS
import csv
import psycopg2
import keys
import datetime

#create flask web app object
app = Flask(__name__)
CORS(app)

@app.route("/login", methods=['POST'])
def login():
    username = json.loads(request.data)['data']['username']
    password = json.loads(request.data)['data']['password']
    print(username, password)
    conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
    cur = conn.cursor()
    #cur.execute(f"select * from master_ticker_list limit 5;")
    try:
        cur.execute(f"""select * from kevspasswords where username='{username}' and password='{password}' """)
        res = cur.fetchone()
        print(res)
        conn.commit()
        conn.close()
        return json.dumps(res[1])
    
    except Exception as e:
        print(e)
        conn.commit()
        conn.close()
        return None



@app.route("/add_row/<slug>")
def add_row(slug):
    name = slug.split('&')[0]
    occ = slug.split('&')[1]
    tags = slug.split('&')[2]
    date = slug.split('&')[3]
    fileType = slug.split('&')[4]
    location = slug.split('&')[5]
    img_type = slug.split('&')[6]
    conn = psycopg2.connect(database="postgres", user=keys.user, password=keys.password, host=keys.host, port="5432")
    cur = conn.cursor()
    #cur.execute(f"select * from master_ticker_list limit 5;")
    try:
        cur.execute(f"""insert into kevspics(name, type, date, tags, location, event, img_type ) values('{name}','{fileType}','{date}','{tags}','{location}','{occ}', '{img_type}') """)
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
        data = cur.fetchall()
        print(data)
    except Exception as e:
        print(e)

    new_list = [y.strftime("%m-%d-%Y") if type(y) == datetime.date else y for x in data for y in x  ]  
    arr = []
    for lst in data:
        arr2 = []
        for item in lst:
            if type(item) == datetime.date:
                print(item)
                item = item.strftime("%m-%d-%Y")
                arr2.append(item)
            else:
                arr2.append(item)

            if item == lst[-1]:
                arr.append(arr2)

    print(new_list)          #if x[1] not in to_be_removed]
    conn.commit()
    conn.close()

    return json.dumps(arr)




#run the app
if __name__ == "__main__":
    app.run(debug=True)