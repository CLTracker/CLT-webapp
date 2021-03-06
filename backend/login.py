#library imports
from flask import Flask, request, Response, make_response, Blueprint
import simplejson

#custom imports
from database import dbPool
 
loginRoutes = Blueprint("loginRoutes", __name__)

def getUserData(userId):
    db = dbPool.connect().connection
    cursor = db.cursor(dictionary=True)
    result = {}
    status = 403
    
    query = "SELECT user_id, name, email, permissions FROM users WHERE email = %s"
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
    if(permRow["permission_name"] == "adm"):
        row.update({"accountStatus":"notNewlyAdded"})
        result = row
        result.update({"userType":"adm"})
        status = 200
        return simplejson.dumps(result), status
    
    elif(permRow["permission_name"] == "org"):
        query="SELECT organizer_email, conference FROM organizers WHERE organizer_email = %s"
        cursor.execute(query, (row["email"],))
        orgRow = cursor.fetchone()
        if(orgRow):
            row.update({"userType":"org"})
            row.update({"accountStatus":"notNewlyAdded"})
            status=200
            db.close()
            return simplejson.dumps(row), status
        else:
            row.update({"accountStatus":"newlyAdded"})
            status = 200
            db.close()
            return simplejson.dumps(row), status
    else:
        query = "SELECT company_name, logo_url FROM exhibitors WHERE exhibitor_email = %s" 
        cursor.execute(query, (row["email"],))
        exhibRow = cursor.fetchone()
        if(exhibRow):
            row.update(exhibRow)
            row.update({"userType":"xhb"})
            row.update({"accountStatus":"notNewlyAdded"})
            status=200
            db.close()
            return simplejson.dumps(row), status
        else:
            row.update({"accountStatus":"newlyAdded"})
            status = 200
            db.close()
            return simplejson.dumps(row), status



def userLoginOrCreate(content):
    email = content["email"]
    userInfo, status = getUserData(email)

    userInfo = simplejson.loads(str(userInfo))
    db = dbPool.connect().connection
    cursor = db.cursor(dictionary=True)
    
    #if getUserData returned 403, either someone not in database attempted to login,
    #or this is the users first time logging in
    if(status == 403):
        userInfo.update({"accountStatus":"newlyAdded"})
    
    #need to check if the user is permitted
    email = content["email"]
    checkExhibQ = "SELECT exhibitor_email FROM permitted_exhibitors WHERE exhibitor_email = %s"
    checkOrgQ = "SELECT organizer_email FROM permitted_organizers WHERE organizer_email = %s"
    
    if(content["loginType"] == "xhb"):
        cursor.execute(checkExhibQ, (email,))
        authCheck = cursor.fetchone()
        if(not authCheck):
            db.close()
            return {}, 403
        elif(userInfo["accountStatus"] == "notNewlyAdded"):
            db.close()
            return userInfo, 200
        else:
            #insert a mostly blank entry into exhibitors table
            userQ = "INSERT INTO users(email, user_id, name, permissions) VALUES(%s, %s, %s, 1)"
            insertQ = "INSERT INTO exhibitors(exhibitor_email, conference) VALUES(%s, 1)"
            cursor.execute(userQ, (email, content["user_id"], content["name"]))
            cursor.execute(insertQ, (email,))
            db.commit()
            db.close()
            return userInfo, 200
    elif(content["loginType"] == "org"):
        cursor.execute(checkOrgQ, (email,))
        authCheck = cursor.fetchone()
        if(not authCheck):
            db.close()
            return {}, 403
        elif(userInfo["accountStatus"] == "notNewlyAdded"):
            db.close()
            return userInfo, 200
        else:
            #insert a mostly blank entry into organizers table
            userQ = "INSERT INTO users(email, user_id, name, permissions) VALUES(%s, %s, %s, 3)"
            insertQ = "INSERT INTO organizers(organizer_email, conference) VALUES(%s, 1)"
            cursor.execute(userQ, (email, content["user_id"], content["name"]))
            cursor.execute(insertQ, (email,))
            db.commit()
            db.close()
            return userInfo, 200


def updateUserData(userId, content):
    #update stuff in database where stuff bound to "userId" user

    #content contains auth0 token and metadata
    need_update_metadata = content['metadata']
    print(need_update_metadata)
    stat = 200
    return stat

@loginRoutes.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        jsonObject, status = userLoginOrCreate(request.json)
        jsonObject = simplejson.dumps(jsonObject)
        return Response(jsonObject, mimetype="application/json"), status
        
@loginRoutes.route("/user/<string:userId>", methods=["GET", "PATCH"])
def userInfo(userId):
    if request.method == "GET":
        #GET USER DATA GIVEN "email"
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
