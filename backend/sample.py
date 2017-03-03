#library imports
from flask import Flask, request, Response, make_response, Blueprint
import simplejson

#custom imports
from database import dbPool

sampleRoutes = Blueprint("sampleRoutes", __name__)

def nameJson(name):
    try:
            passBack = {"greeting":"hello", "name": None}
            passBack["name"] = name
            return simplejson.dumps(passBack),200
    except:
            #NEVER CATCH ALL EXCEPTIONS IN PRACTICE
            return(simplejson.dumps({"result":"fail"})), 500





#example default route
@sampleRoutes.route("/", methods=["GET"])
def hello():
    if request.method == "GET":
            return Response("hello world")


#example route that takes in a string variable from url,
#and returns a json string
@sampleRoutes.route("/hello/<string:name>", methods=["GET"])
def helloSirOrMadam(name):
    if request.method == "GET":
            #most of the time, will call a function that returns json object
            nameFunJson, status  = nameJson(name)
            return Response(nameFunJson, mimetype="application/json"), status
