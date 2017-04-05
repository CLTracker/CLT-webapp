#!/usr/bin/env python3
# Shebang ^ for anyone running server on linux system 

#library imports
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

#custom imports
from login import loginRoutes
from general import genRoutes


app = Flask(__name__)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', 'http://localhost:8080')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response

#Registering of routes relating to user management
app.register_blueprint(loginRoutes)
app.register_blueprint(genRoutes)

'''
@app.route('/img', methods=['POST'])
def image_upload():
    print(request.headers)
    return jsonify('working')
'''


if __name__ == "__main__":
    app.run(host= "0.0.0.0", debug=True, port = 5000, threaded=True)
    print("Running dev server on port 5000")
