#library imports
from flask import Flask, request, Response, make_response, Blueprint
import simplejson

#custom imports
from database import dbPool
 
exhibRoutes = Blueprint("exhibRoutes", __name__)

def edit_exhib(db, content, confId):
    
    json_status = {"status": 401}
    cursor = db.cursor(dictionary=True)
    
    #Checking source
    query = "SELECT permissions FROM users WHERE user_id = %s"
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
           
            #check if they are in users
            query = "SELECT email FROM users WHERE email = %s"
            cursor.execute(query, (content["email"],))
            result = cursor.fetchone()
            if result is None:
                #crate new user
                query = "INSERT INTO users(email,user_id, permissions) VALUES(%s, %s, %s)"
                cursor.execute(query, (content["email"],content["email"], 1,))
                db.commit()

            query = "SELECT exhibitor_email FROM permitted_exhibitors WHERE exhibitor_email = %s"
            cursor.execute(query, (content["email"],))
            result = cursor.fetchone()    

            if result is None:
                #add email to list
                query = "INSERT INTO permitted_exhibitors(exhibitor_email) VALUES (%s)"
                cursor.execute(query,(content["email"],))
                db.commit()

            json_status["status"] = 200
            return json_status, json_status["status"]

        
        
@exhibRoutes.route("/edit/exhibitors/<string:confid>", methods=["POST"])
def exhib_list_edit(confid):
    if request.method == "POST":
        db = dbPool.connect().connection
        status_json,status = edit_exhib(db,request.json,confid)
        jsonObject = simplejson.dumps(status_json)
        db.close()
        return Response(jsonObject, mimetype="application/json"), status
        