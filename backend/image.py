#library imports
from flask import Flask, request, Response, make_response, Blueprint
import simplejson
import json
import configparser
#import requests
import base64

#custom imports
from database import dbPool

imgRoutes = Blueprint("imgRoutes", __name__)

# looked at this for example 
# http://blog.tankorsmash.com/?p=249

@imgRoutes.route("/img", methods=["POST"])
def uploadimage():
    if request.method == "POST":
        config = configparser.ConfigParser()
        config.read("image_key")
        api_key = config.get('img', 'Client-Id')

        #upload url
        upload_url = "https://api.imgur.com/3/upload"

        #full image path
        image_path = '1.png'
        f=open(image_path, 'rb')
        binary_data=f.read()
        b64image = base64.b64encode(binary_data)

        payload = {"key" : api_key, "image": b64image, "title": "apitest",}
        r = requests.post(upload_url, data=payload)

        j = json.loads(r.text)
        print(j)
