#library imports
from flask import Flask, request, Response, make_response, Blueprint
import simplejson

from sqlalchemy import inspect
from sqlalchemy import select
from sqlalchemy.orm import sessionmaker
from sqlalchemy import MetaData, Column, Table, ForeignKey, DateTime, Binary,Integer,String

#custom imports
from database import dbPool
 
loginRoutes = Blueprint("loginRoutes", __name__)

def getUserData(userId):
    db = dbPool.connect().connection
    cursor = db.cursor(dictionary=True)
    result = {}
    status = 403
    
    query = "SELECT user_id, name, email, permissions FROM users WHERE user_id = %s"
    cursor.execute(query, (userId,))
    row = cursor.fetchone()
    if(not row):
        return result, status
   
    '''
    print("\n\n"+str(row)+"\n\n")
    row["gender"] = row["gender"].decode()
    row["last_login"] = str(row["last_login"])
    if(row["gender"] == "1"):
        row["gender"] = "Male"
    else:
        row["gender"] = "Female"
    '''

    personType = row["permissions"]
    query = "SELECT permission_name FROM permissions WHERE permission_id =%s" %(personType)
    cursor.execute(query)
    permRow = cursor.fetchone()
    if(permRow["permission_name"] == "adm" or permRow["permission_name"] == "org"):
        result = row
        status = 200
        return simplejson.dumps(result), status

    query = "SELECT company_name, logo_url FROM exhibitors WHERE exhibitor_id = %s" %(row["user_id"])
    cursor.execute(query)
    exhibRow = cursor.fetchone()
    row.update(exhibRow)
    status=200
    db.close()

    return simplejson.dumps(row), status


def updateUserData(userId, content):
    #update stuff in database where stuff bound to "userId" user

    #content contains auth0 token and metadata
    need_update_metadata = content['metadata']
    print(need_update_metadata)
    stat = 200
    return stat

def userLoginOrCreate(content):
    userId = content["user_id"]
    userInfo, status = getUserData(userId)
    cursor = dbPool.connect().connection.cursor(dictionary=True)

    if len(userInfo) == 0:
        #need to check if the user is permitted
        email = content["email"]
        checkExhibQ = "SELECT exhibitor_email FROM permitted_exhibitors WHERE exhibitor_email = %s"
        checkOrgQ = "SELECT organizer_email FROM permitted_organizers WHERE organizer_email = %s"
        
        if(content["loginType"] == "xhb"):
            cursor.execute(checkExhibQ, (email,))
            authCheck = cursor.fetchone()
            if(not authCheck):
                  return {}, 403
            else:
                #insert a mostly blank entry into exhibitors table
                insertQ = "INSERT INTO exhibitors(exhibitor_email) VALUES(%s)"
                cursor.execute(insertQ, (email))
                return userInfo, 200
        elif(content["loginType"] == "org"):
            cursor.execute(checkOrgQ, (email,))
            authCheck = cursor.fetchone()
            print(authCheck)
            if(not authCheck):
                return {}, 403
            else:
                #insert a mostly blank entry into organizers table
                insertQ = "INSERT INTO organizers(organizer_email) VALUES(%s)"
                cursor.execute(insertQ, (email))
                return userInfo, 200

    else:
        #user is already permitted
        print(userInfo)
        return userInfo, 200

@loginRoutes.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        jsonObject, status = userLoginOrCreate(request.json)
        jsonObject = simplejson.dumps(jsonObject)
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
        print(request.json)
        #status = updateUserData(userId, content)
        status = 200
        return status
#GET
#does: if(id is in database)
#           send db.get(id)
#      else
#           sendStatus(404)

#PATCH
# body: auth0 token
# does: replaces db entry
# return: status(200 or 400)"
