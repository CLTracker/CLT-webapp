#library imports
from flask import Flask, request, Response, make_response, Blueprint
import simplejson

#custom imports
from database import dbPool

attendeeRoutes = Blueprint("attendeeRoutes", __name__)

def getBoothData(name):
    #get booth info from database
    stat = 200
    sampleObj = {"name":"name", "bio":"bio", "location": "booth location"}
    return sampleObj, stat

@attendeeRoutes.route("/viewbooth/<string:name>", methods=["GET"])
def getBoothInfo(name):
    if request.method == "GET":
        jsonObject,status = getBoothData(name)
        return Response(jsonObject, mimetype="application/jason"),status



        


