#library imports
from flask import Flask, request, Response, make_response, Blueprint
import simplejson

#custom imports
from database import dbPool

schedRoutes = Blueprint("schedRoutes", __name__)

def getSchedInfo(db, confId):
    #want title, logo_url, text
    sendObj = {
        "title": None, 
        "start": None,
        "end": None, 
        "color": {
            "primary": None,
            "secondary": None,
        },
        "resizable": {
            "beforeStart": True,
            "afterEnd": True,
        },
        "draggable": True
    }
    sendArr = []
    cursor = db.cursor(dictionary=True)
    query = "SELECT event_name, schedule.start_time, schedule.end_time, primary_color, secondary_color FROM schedule, conference WHERE conference_id = %s"
    cursor.execute(query, (confId,))
    results = cursor.fetchall()
    for row in results:
            sendObj["title"] = row["event_name"]
            sendObj["start"] = str(row["start_time"])
            sendObj["end"] = str(row["end_time"])
            sendObj["color"]["primary"] = row["primary_color"]
            sendObj["color"]["secondary"] = row["secondary_color"]
            sendArr.append(sendObj.copy())
    return sendArr, 200

@schedRoutes.route("/schedule/<string:confId>", methods=["GET"])
def sched(confId):
    if request.method == "GET":
        db = dbPool.connect().connection
        result, status = getSchedInfo(db, confId)
        result = simplejson.dumps(result)
        db.close()
        return Response(result, mimetype="application/json"), status
