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

def check_permitted_exhibitor(userId):
    #putting here for now
    return True 

def  check_organizer(userId):
    #putting here for now
    return True     

def exhibitor_login(content):
    #exhibitor login   
  
    #check if it is in permitted_exhibitor list
    #check_exhibitors_list = check permitted_exhibitor list (true or false)
    check_exhibitors_list = check_permitted_exhibitor(content["user_id"])
    if check_exhibitors_list == True:
        #proceed as normal
        jsonObject, stat = getUserData(content["user_id"])
        return jsonObject,stat

    else:
        #prints out an error
        print("Not in permitted_exhibitor list")
        stat = 404
        return jsonObject, stat     

def organizers_login(content):
    #organizer login

    #check organizer table
    #check_organizer_table = check if id is in organizer table
    check_organizer_table = check_organizer(content["user_id"])
    if check_organizer_table == True :
        #proceed as normal
        jsonObject, stat= getUserData(content["user_id"])
        return jsonObject, stat
    else:
        #prints out an error
        print("Organizer not permitted")
        stat = 404
        return jsonObject, stat




@loginRoutes.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        print(request.json)
        #loginType is a flag to show which login they used
        if request["loginType"] == "exhibitor":
            jsonObject, status = exhibitor_login(request.json)
        if request["loginType"] == "organizers":
                jsonObject, status = organizers_login(request.json)
        return Response(jsonObject, mimetype="application/json"), status


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

