#library imports
from flask import Flask, request, Response, make_response, Blueprint
import simplejson

#custom imports
from database import dbPool

eventRoutes = Blueprint("eventRoutes", __name__)


def updateEventData(eventId, content):
    #not sure if we are using exhibitor id / event id # / name of booth to edit events
    #update the event in the database
    stat = 200
    return stat

def getEvent(eventId):
    #get the event from the database
    eventObj = {"name": "event name", 
                "time": "time of event", 
                "booth": "booth name", 
                "location": "booth location"} 
    stat = 200
    return eventObj, stat


@eventRoutes.route("/exhibitor/<string:id>/eventEdit", methods=["PATCH"])
def updateEvent(eventId):
    if request.method == "PATCH":
        content = request.json
        status = updateEventData(id,content)
        return status



@eventRoutes.route("/exhibitor/<string:eventId>/triggerEvent", methods=["GET"])
def triggerEvent(eventId):
    if request.method == "GET":
        jsonObject, status = getEvent(eventId)
        return Response(jsonObject, mimetype="application/json"), status
