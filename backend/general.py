#library imports
from flask import Flask, request, Response, make_response, Blueprint
import simplejson

#custom imports
from database import dbPool

genRoutes = Blueprint("genRoutes", __name__)

def getConfInfo(db, confId):
    #want conf name, startdate, enddate, location
    cursor = db.cursor(dictionary=True)
    query = "SELECT conference_name, start_date, end_date, location FROM conference WHERE conference_id = %s"
    cursor.execute(query, (confId,))
    result = cursor.fetchone()
    result["start_date"] = str(result["start_date"])
    result["end_date"] = str(result["end_date"])
    return result, 200


def getExInfo(db, confId):
    #want title, logo_url, text
    cursor = db.cursor(dictionary=True)
    query = "SELECT conference, company_name, exhibitors.logo_url from exhibitors, conference where conference_id = %s"
    cursor.execute(query, (confId,))
    results = cursor.fetchall()
    return results, 200

    

@genRoutes.route("/info/<string:confId>", methods=["GET"])
def info(confId):
    if request.method == "GET":
        db = dbPool.connect().connection
        result, status = getConfInfo(db, confId)
        result = simplejson.dumps(result)
        db.close()
        return Response(result, mimetype="application/json"), status

@genRoutes.route("/exhibitors/<string:confId>", methods=["GET"])
def exhbitors(confId):
    if request.method == "GET":
        db = dbPool.connect().connection
        result, status = getExInfo(db, confId)
        result = simplejson.dumps(result)
        db.close()
        return Response(result, mimetype="application/json"), status

        
