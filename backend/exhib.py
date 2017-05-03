#library imports
from flask import Flask, request, Response, make_response, Blueprint
import simplejson

#custom imports
from database import dbPool
 
exhibRoutes = Blueprint("exhibRoutes", __name__)


def editExhib(db, content, confId):
    retObj = {"status":400}
    cursor = db.cursor()

    #Checking to make sure user actually exists
    query = "SELECT * FROM users WHERE email = %s"
    cursor.execute(query, (content["email"],))
    result = cursor.fetchone()
    if result is None:
        return retObj, retObj["status"]
    
    exhQuery = "UPDATE exhibitors SET company_name=%s, logo_url=%s, bio=%s WHERE exhibitor_email=%s"
    userQuery = "UPDATE users SET name=%s WHERE email=%s"

    #exhibitor query
    cursor.execute(exhQuery, (content["company_name"], content["logo_url"], content["bio"],content["email"]))
    cursor.execute(userQuery, (content["name"], content["email"]))
    db.commit()
    retObj = {"status":200}

    return retObj, retObj["status"]

def edit_exhib(db, content, confId):
    
    json_status = {"status": 401}
    cursor = db.cursor(dictionary=True)
    
    #Checking source
    query = "SELECT permissions FROM users WHERE email = %s"
    cursor.execute(query, (content["source"],))
    result = cursor.fetchone()
    if result is None:
        return json_status, json_status["status"]
         
    else:
        query = "SELECT permission_name FROM permissions WHERE permission_id = %s"
        cursor.execute(query, (result["permissions"],))
        result = cursor.fetchone()
       
        # 1 == xhib
        # 2 == admin
        # 3 == org
        if result["permission_name"] == "adm" or result["permission_name"] == "xhb":
            return json_status, json_status["status"]
        else:
            
            #get conference_id
            query = "SELECT conference FROM organizers WHERE organizer_email = %s"
            cursor.execute(query, (content["source"],))
            result=cursor.fetchone()
            orgConf = str(result["conference"])
                
            
            #check if confId and conference_id of organizer match
            if orgConf != confId: 
                return json_status, json_status["status"]
           
            #check if they are in users table
            query = "SELECT email FROM users WHERE email = %s"
            cursor.execute(query, (content["email"],))
            result = cursor.fetchone()
            if result is None:
                #create new user
                query = "INSERT INTO users(email,user_id, permissions) VALUES(%s, %s, %s)"
                cursor.execute(query, (content["email"],content["email"], 1,))
                db.commit()

            #check if they are already on permitted_exhibitors    
            query = "SELECT exhibitor_email,conference_id FROM permitted_exhibitors WHERE exhibitor_email = %s"
            cursor.execute(query, (content["email"],))
            result = cursor.fetchone()    

            if result is None:
                #add email to list
                query = "INSERT INTO permitted_exhibitors(exhibitor_email,conference_id) VALUES (%s,%s)"
                cursor.execute(query,(content["email"],orgConf,))
                db.commit()
      
            json_status["status"] = 200    
            return json_status, json_status["status"]

def get_all_exhib(db,confid,exhib):
    #want email: string, name: string, company: string 
    return_json = []
    cursor = db.cursor(dictionary=True) 

    #grab the exhibitors from permitted_exhibitors
    if(exhib == ""):
        query = "SELECT exhibitor_email FROM permitted_exhibitors WHERE conference_id = %s"
        cursor.execute(query, (confid,))
        permitted_results = cursor.fetchall()
    else:
        permitted_results = [{"exhibitor_email":exhib}]

    #check if they are in exhibitors table
    for row in permitted_results:
        empty_dict = {}
        query = "SELECT company_name, bio, logo_url FROM exhibitors WHERE conference = %s AND exhibitor_email = %s"
        cursor.execute(query,(confid, row["exhibitor_email"],))
        result = cursor.fetchone()

        query = "SELECT name,user_id FROM users WHERE email = %s"
        cursor.execute(query,(row["exhibitor_email"],))
        name_result= cursor.fetchone()

        #not it is not exhibitors table and company_name is empty
        if result is None:
            empty_dict["company"]=""

        #they are in the exhibitor table       
        else:
            empty_dict["company"]= result["company_name"]               

        #putting info into dic and appending to array    
        empty_dict["name"]= name_result["name"]
        empty_dict["bio"]= result["bio"]
        empty_dict["userId"]= name_result["user_id"]
        empty_dict["permissions"] = 1
        empty_dict["userType"] = "xhb"
        empty_dict["logo_url"]= result["logo_url"]
        empty_dict["email"]=row["exhibitor_email"]
        return_json.append(empty_dict)
    
    if(exhib != ""):
        return_json = return_json[0]
    return return_json,200
           
    
        
        
@exhibRoutes.route("/edit/exhibitors/<string:confid>", methods=["POST"])
def exhib_list_edit(confid):
    if request.method == "POST":
        db = dbPool.connect().connection
        status_json,status = edit_exhib(db,request.json,confid)
        jsonObject = simplejson.dumps(status_json)
        db.close()
        return Response(jsonObject, mimetype="application/json"), status

@exhibRoutes.route("/edit/exhibitor/<string:confId>", methods=["PATCH"])
def editExhibRoute(confId):
    if request.method == "PATCH":
        db = dbPool.connect().connection
        status_json,status = editExhib(db, request.json, confId)
        jsonObject = simplejson.dumps(status_json)
        db.close()
        return Response(jsonObject, mimetype="application/json"), status

@exhibRoutes.route("/user/exhibitors/<string:confid>", methods=["GET"])
def getallexhib(confid):
    if request.method == "GET":
        db= dbPool.connect().connection
        jsonOb,status = get_all_exhib(db,confid,"")
        jsonObject = simplejson.dumps(jsonOb)
        db.close()
        return Response(jsonObject, mimetype="application/json"),status

@exhibRoutes.route("/exhibitors/<string:confId>", methods=["GET"])
def exhbitors(confId):
    if request.method == "GET":
        db= dbPool.connect().connection
        jsonOb,status = get_all_exhib(db,confid,"")
        jsonObject = simplejson.dumps(jsonOb)
        db.close()
        return Response(jsonObject, mimetype="application/json"),status

@exhibRoutes.route("/exhibitors/<string:confid>/<string:exhibId>", methods=["GET"])
def getexhib(confid,exhibId):
    if request.method == "GET":
        db= dbPool.connect().connection
        jsonOb,status = get_all_exhib(db,confid,exhibId)
        jsonObject = simplejson.dumps(jsonOb)
        db.close()
        return Response(jsonObject, mimetype="application/json"),status
