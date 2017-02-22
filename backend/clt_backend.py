#!/usr/bin/env python3
# Shebang ^ for anyone running server on linux system 

from flask import Flask, request, Response, make_response
from flask_cors import CORS
import mysql.connector
import configparser
import simplejson
import sqlalchemy.pool as pool
from sqlalchemy import create_engine




'''
None of these are needed yet, but better to have them here now

#Getting config information for mysql login
#Reading config information for mysql from file in order to 
#avoid having sensitive info in shared source code. Will require
#dev credentials for local developement, and production credentials
#for deployment. These can be in any file, as long as they are in correct
#format. 
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

def nameJson(name):
	try:
		passBack = {"greeting":"hello", "name": None}
		passBack["name"] = name
		return simplejson.dumps(passBack),200
	except:
		#NEVER CATCH ALL EXCEPTIONS IN PRACTICE
		return(simplejson.dumps({"result":"fail"})), 500

app = Flask(__name__)
CORS(app)


#example default route
@app.route("/", methods=["GET"])
def hello():
	if request.method == "GET":
		return Response("hello world")

#example route that takes in a string variable from url,
#and returns a json string
@app.route("/hello/<string:name>", methods=["GET"])
def helloSirOrMadam(name):
	if request.method == "GET":
		#most of the time, will call a function that returns json object
		nameFunJson, status  = nameJson(name)
		return Response(nameFunJson, mimetype="application/json"), status

if __name__ == "__main__":
	app.run(debug=True, port = 8080, threaded=True)
	print("Running dev server on port 8080")
