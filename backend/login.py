#library imports
from flask import Flask, request, Response, make_response, Blueprint
import simplejson

#custom imports
from database import dbPool

loginRoutes = Blueprint("loginRoutes", __name__)

def getUserData(userId):
    #actual complex logical database stuff
    stat = 200
    sampleObj = {"metadata":"meta"}
    return sampleObj, stat

def updateUserData(userId, content):
    #update stuff in database where stuff bound to "userId" user
    stat = 200
    return stat


@loginRoutes.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        print(request.json)
        return Response("Got it"), 200



@loginRoutes.route("/user/<string:userId>", methods=["GET", "PATCH"])
def userInfo(userId):
    if request.method == "GET":
        #GET USER DATA GIVEN "userId"
        jsonObject, status = getUserData(userId)
        return Response(jsonObject, mimetype="application/json"), status
    if request.method == "PATCH":
        #Alter user data given "userId"
        content = request.json
        status = updateUserData(userId, content)
        return status
    
