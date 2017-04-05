#library imports
from flask import Flask, request, Response, make_response, Blueprint
import simplejson

#custom imports
from database import dbPool
 
infoRoutes = Blueprint("infoRoutes", __name__)

def getConf(confId):
    
    db = dbPool.connect().connection
    cursor = db.cursor(dictionary=True)
    result = {}
    stat = 403
    query = "SELECT conference_name, start_date, end_date, location FROM conference where conference_id = %s"
    cursor.execute(query, (confId,))
    row = cursor.fetchone()
    if( row == None):
        return result, stat 

    row["start_date"] = str(row["start_date"])
    row["end_date"] = str(row["end_date"])
    
    stat =200;
    result = row
    db.close();
    
    return simplejson.dumps(result), stat



@infoRoutes.route("/info/<string:confId>", methods=["GET"])
def getConference(confId):
    if request.method == "GET":
        jsonObject, status = getConf(confId)
        return Response(jsonObject, mimetype="application/json"), status
    


