#library imports
from flask import Flask, request, Response, make_response, Blueprint
import simplejson

#custom imports
from database import dbPool
 
confRoutes = Blueprint("confRoutes", __name__)

def changeConfInfo(content,confId):
    db = dbPool.connect().connection
    cursor = db.cursor(dictionary=True)
    stat_json = {"status": 401}
    
    #Checking source
    query = "SELECT permissions FROM users WHERE email = %s"
    cursor.execute(query, (content["source"],))
    result = cursor.fetchone()
    #checking the permission
    query = "SELECT permission_name FROM permissions WHERE permission_id = %s"
    cursor.execute(query, (result["permissions"],))
    result = cursor.fetchone()

    if result["permission_name"] == "adm" or result["permission_name"] == "xhb":
        db.close()
        return stat_json, stat_json["status"]
    else:
        query = "SELECT conference_name, start_date,end_date,location,logo_url FROM conference where conference_id = %s"
        cursor.execute(query, (confId,))
        result = cursor.fetchone()
        
        #check if conference is valid
        if result is None:
            stat_json["status"] = 404
            db.close() 
            return stat_json, stat_json["status"]
        for key in content["fields"].keys():
            result[key] = content["fields"][key] 
        query = "UPDATE conference SET conference_name = %s, start_date=%s, end_date=%s, location=%s, logo_url=%s WHERE conference_id =%s"   
        cursor.execute(query,(result["conference_name"], result["start_date"], result["end_date"], result["location"], result["logo_url"],confId,))
        db.commit()       
        stat_json["status"] = 200

        db.close()
        return stat_json, stat_json["status"]
    
    
   
    

@confRoutes.route("/edit/conference/<string:confId>", methods=["PATCH"])
def patchConference(confId):
    if request.method == "PATCH":
        Objectjson, status = changeConfInfo(request.json,confId)
        jsonObj = simplejson.dumps(Objectjson)
        return Response(jsonObj, mimetype="application/json"), status   


