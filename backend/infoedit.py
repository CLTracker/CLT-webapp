#library imports
from flask import Flask, request, Response, make_response, Blueprint
import simplejson

#custom imports
from database import dbPool

infoRoutes = Blueprint("infoRoutes", __name__)


def updateConventionData(name, content):
    #uses name or id to edit info about convention
    #update the data in the database
    stat = 200
    return stat

def updateCompanyInfo(name, content):
    #uses name or id to edit info about company
    #update the data in the database
    stat = 200
    return stat

def getEvent(id):
    #get the event from the database
    eventObj = {"name": "event name", "time": "time of event", "booth": "booth name", "location": "booth location"} 
    stat = 200
    return 


@infoRoutes.route("/organizer/<string:Name>/edit", methods=["PATCH"])
def organizerEdit(name):
    if request.method == "PATCH":
        content = request.json
        status = updateConventionData(name,content)
        return status



@infoRoutes.route("/exhibitor/<string:id>/edit", methods=["PATCH"])
def companyEdit(id):
       if request.method == "PATCH":
        content = request.json
        status = updateCompanyInfo(id,content)
        return status
