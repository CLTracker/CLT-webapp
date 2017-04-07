#library imports
from flask import Flask, request, Response, make_response, Blueprint
import simplejson

#custom imports
from database import dbPool
 
exhibRoutes = Blueprint("exhibRoutes", __name__)

def edit_exhib(db, content, confId):
    status = 401
    cursor = db.cursor(dictionary=True)
   
    #Checking source
    query = "SELECT permissions FROM users WHERE user_id = %s"
    cursor.execute(query, (content["source"],))
    result = cursor.fetchone()
    print(result)
    
    query = "SELECT permission_name FROM permissions WHERE permission_id = %s"
    cursor.execute(query, (result["permissions"],))
    result = cursor.fetchone()
    print(result)
    # 1 == xhib
    # 2 == admin
    # 3 == org
    if result["permission_name"] == "adm" or result["permission_name"] == "xhb":
        return status
    else:
        #add email to list
        query = "INSERT INTO permitted_exhibitors(exhibitor_email) VALUES (%s)"
        cursor.execute(query,(content["email"],))
        #check
        query = "SELECT exhibitor_email FROM permitted_exhibitors WHERE exhibitor_email = %s"
        cursor.execute(query, (content["email"],))
        result = cursor.fetchone()
        print(result)

        return 200

@exhibRoutes.route("/edit/exhibitors/<string:confid>", methods=["POST"])
def exhib_list_edit(confid):
    if request.method == "POST":
        db = dbPool.connect().connection
        status = edit_exhib(db,request.json,confid)
        jsonObject = simplejson.dumps(request.json)
        db.close()
        return Response(jsonObject, mimetype="application/json"), status
        