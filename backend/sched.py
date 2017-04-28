#library imports
from flask import Flask, request, Response, make_response, Blueprint
from datetime import datetime
import simplejson

#custom imports
from database import dbPool

schedRoutes = Blueprint("schedRoutes", __name__)

def patchSchedInfo(db, confId, content):
    # Default to error, changes upon successful update
    status = 403

    # To return to front end
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

    cursor = db.cursor(dictionary=True)

    #iterate through object received
    for item in content:
        newStart = item["start"]
        #dtNewStart = datetime.strptime(newStart, "%Y-%m-%d %H:%M:%S")
        newEnd = item["end"]
        #dtNewEnd = datetime.strptime(newEnd, "%Y-%m-%d %H:%M:%S")
        eventTitle = item["title"]
        #print(eventTitle)
        
        #update query in database
        query = "UPDATE schedule,conference SET start_time=%s, end_time=%s WHERE (conference.conference_id = %s) AND (schedule.event_name LIKE %s)"
        if cursor.execute(query, (newStart,newEnd,confId,eventTitle,)):
            status = 200
    # after update, send back updated schedule table
    sendArr = []
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
    return sendArr, status

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

@schedRoutes.route("/schedule/<string:confId>", methods=["GET", "PATCH"])
def sched(confId):
    if request.method == "GET":
        db = dbPool.connect().connection
        result, status = getSchedInfo(db, confId)
        result = simplejson.dumps(result)
        db.close()
        return Response(result, mimetype="application/json"), status

    if request.method == "PATCH":
        content = request.json
        db = dbPool.connect().connection
        result, status = patchSchedInfo(db, confId, content)
        result = simplejson.dumps(result)
        db.close()
        return Response(result, mimetype="application/json"), status
