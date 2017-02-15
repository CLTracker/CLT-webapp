#!/usr/bin/env python3
# Shebang ^ for anyone running server on linux system 

from flask import Flask, request, Response, make_response
from flask_cors import CORS
import mysql.connector
import configparser
import simplejson
import sqlalchemy.pool as pool
from sqlalchemy import create_engine



app = Flask(__name__)
CORS(app)

'''
#Getting config informationf for mysql login
config = configparser.ConfigParser()
config.read("devcfg")
my_host = config.get('test', 'mysql_host')
my_user = config.get('test', 'mysql_user')
my_pwd = config.get('test', 'mysql_pwd')
my_db = config.get('test', 'mysql_db')

#Initial database pool creation
#using pool so a new database connection isnt established everytime any request is made
conString = "mysql+mysqlconnector://%s:%s@%s/%s" %(my_user, my_pwd, my_host, my_db)
dbPool = create_engine(conString, poolclass=pool.QueuePool, pool_recycle=28800, pool_size=20)
'''

@app.route("/", methods=["GET"])
def hello():
	if request.method == "GET":
		return Response("hello world")

if __name__ == "__main__":
	app.run(debug=True, port = 8080, threaded=True)
	print("Running dev server on port 8080")
