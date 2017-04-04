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

def getUserData(userId, confId):
    db = dbPool.connect().connection
    cursor = db.cursor(dictionary=True)
    result = {}
    status = 403
    
    query = "SELECT user_id, username, login_count, last_login, last_ip, email, gender, permissions FROM users WHERE user_id = %s"
    cursor.execute(query, (userId,))
    row = cursor.fetchone()
    if(len(row) == 0):
        return result, status
    
    row["gender"] = row["gender"].decode()
    row["last_login"] = str(row["last_login"])
    if(row["gender"] == "1"):
        row["gender"] = "Male"
    else:
        row["gender"] = "Female"

    personType = row["permissions"]
    query = "SELECT permission_name FROM permissions WHERE permission_id =%s" %(personType)
    cursor.execute(query)
    permRow = cursor.fetchone()
    if(permRow["permission_name"] == "adm" or permRow["permission_name"] == "org"):
        result = row
        status = 200
        return simplejson.dumps(result), status

    query = "SELECT exhibitor_name, logo_url FROM exhibitors WHERE exhibitor_id = %s" %(row["user_id"])
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

#organizer login
def organizers_login(content):
    #check if the user_id is in userTable
    
    TableMetadata = MetaData(dbPool, reflect = True)
    userTable = TableMetadata.tables['users']
    result = select([userTable.c.user_id,userTable.c.username,userTable.c.login_count,userTable.c.last_login, userTable.c.last_ip, userTable.c.email, userTable.c.gender, userTable.c.permissions]).where(userTable.c.user_id == 1)
    execute_result = dbPool.execute(result)
    if execute_result.rowcount == 0:
        #not in the userTable, crate new user
        #status = crateUser(content)
        return simplejson.dumps(content),200
    else:
        #get the metadata
        for row in execute_result:
            #check permission if organizer

            #1 == org
            #2 == admin
            #3 == exhi
            #4 == none of the above ???? just in case someone who is not any of the 3
            
            if row['permissions'] != 1:
                #not an organizer
                print("not an organizer")
                return simplejson.dumps(content),404
    """        else:
                #grab the metadata
                user_metadata= {"user_id":  row['user_id'],
                        "username": row['username'],
                        "login_count": row['login_count'],
                        "last_login": str(row['last_login']),
                        "last_ip": row['last_ip'],
                        "email": row['email'],
                        "gender": row['gender'],
                        "permissions": row['permissions']
                }
                organizerTable = TableMeta.tables['organizers']
                result = select([organizerTable.c.organizer_id, organizerTable.c.conference, organizerTable.c.organizer_name,organizerTable.c.contact_phone,organizer.c.contanct_email]).where(user_metadata['user_id'] == organizerTable.c.organizer_id) 
                execute_org_result =dbPool.execute(result)
                for row_org in execute_org_result:
                    org_metadata = {"organizer_id": row_org["organizer_id"],
                            "conference": row_org["conference_id"],
                            "organizer_name": row_org["organizer_name"],
                            "contact_phone": row_org["contact_phone"],
                            "contact_email": row_org["contact_email"]
                    }
                    user_metadata = user_metadata + org_metadata
                return simplejson.dumps(user_metadata), 200

"""
    return simplejson.dumps(content),200

@loginRoutes.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        #print(request.json)
        if request.json["loginType"] == "organizer":
            jsonObject, status = organizers_login(request.json)
            print("organizer\n")
        if request.json["loginType"] == "exhibitor":
            print("exhibitor\n")
        status = 200
        return Response(jsonObject, mimetype="application/json"), status
        
# body: auth0 token
# does : if(token.user_id is in database)
#         token.user_metadata = db.get(user)
#       else:
#           create user 
#           send token
#return token


@loginRoutes.route("/user/<string:confId>/<string:userId>", methods=["GET", "PATCH"])
def userInfo(userId, confId):
    if request.method == "GET":
        #GET USER DATA GIVEN "userId"
        jsonObject, status = getUserData(userId, confId)
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
