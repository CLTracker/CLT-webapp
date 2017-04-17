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
    query = "SELECT permissions FROM users WHERE user_id = %s"
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
       # print(content["fields"].keys())
       # for key in content["fields"].keys():
            #replace each item individually 
       #     query = "UPDATE conference SET %s=%s WHERE conference_id = %s"
       #     cursor.execute(query, (key,content["fields"][key],confId,))
       #     db.commit()

        stat_json["status"] = 200
      
        #Check
        #query = "SELECT conference_name, start_date,end_date,location,logo_url FROM conference where conference_id = %s"
        #cursor.execute(query, (confId,))
        #result = cursor.fetchone()
        #stat_json.update(result)
        #print(result)


        db.close()
        return stat_json, stat_json["status"]
    
    
   
    

@confRoutes.route("/edit/conference/<string:confId>", methods=["PATCH"])
def patchConference(confId):
    if request.method == "PATCH":
        Objectjson, status = changeConfInfo(request.json,confId)
        jsonObj = simplejson.dumps(Objectjson)
        return Response(jsonObj, mimetype="application/json"), status   


