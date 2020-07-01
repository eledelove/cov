from flask import Flask, render_template, request
import json
import get_data as gd
import get_initial_data as gid
import get_by_date as gbd

app = Flask(__name__)

@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/get_initial_data.py', methods=['GET'])
def data():
    
    response = gid.get_initial_data()

    return response

@app.route('/get_by_date.py', methods=['POST'])
def by_date():
    year = int(request.form['year'])
    month = int(request.form['month'])
    day = int((request.form['day']))

    response = gbd.get_data_by_date(year, month, day)

    return response

@app.route('/get_data.py', methods=['POST'])
def ajx():
  
    city = request.form['city']
    neigh = request.form['neighborhood']
    locality = request.form['locality']
    year = int(request.form['year'])
    month = int(request.form['month'])
    day = int((request.form['day']))

    response = gd.search_data(city, neigh, locality, year, month, day)
    
    return json.dumps(response)

if __name__ == "__main__":
    app.run(debug=True)
