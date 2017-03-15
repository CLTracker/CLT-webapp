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

# body: auth0 token
# does : if(token.user_id is in database)
#         token.user_metadata = db.get(user)
#       else:
#           create user 
#           send token
#return token



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
#GET
#does: if(id is in database)
#           send db.get(id)
#      else
#           sendStatus(404)

#PATCH
# body: auth0 token
# does: replaces db entry
# return: status(200 or 400)

