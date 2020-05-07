from flask import Flask, render_template, request
import json
import get_data as gd
import get_initial_data as gid

app = Flask(__name__)

@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/get_initial_data.py', methods=['POST'])
def data():
    response = gid.get_initial_data()
    return response

@app.route('/get_data.py', methods=['POST'])
def ajx():
  
    city = request.form['city']
    neigh = request.form['neighborhood']
    year = int(request.form['year'])
    month = int(request.form['month'])
    day = int((request.form['day']))

    response = gd.search_data(city, neigh, year, month, day)
    
    return json.dumps(response)

if __name__ == "__main__":
    app.run(debug=True)