from flask import Flask, render_template, request
import json
import get_data as gd

app = Flask(__name__)

@app.route('/')
def hello():
    return render_template('ajax.html')

@app.route('/get_data.py', methods=['POST'])
def ajx():
  
    city = request.form['city']
    neigh = request.form['neigh']
    year = int(request.form['year'])
    month = int(request.form['month'])
    day = int((request.form['day']))

    response = gd.search_data(city, neigh, year, month, day)
    
    return json.dumps(response)

if __name__ == "__main__":
    app.run(debug=True)