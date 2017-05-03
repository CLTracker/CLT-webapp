#library imports
from flask import Flask, request, Response, make_response, Blueprint
import simplejson
import json
import configparser
import requests
import base64

#custom imports
from database import dbPool

imgRoutes = Blueprint("imgRoutes", __name__)

# looked at this for example 
# http://blog.tankorsmash.com/?p=249

def getPin(client_id, client_secret):
    
    resp = "pin"
    #can be any string at all
    state = "anything"
    url = r"https://api.imgur.com/oauth2/authorize?client_id={cid}&response_type={resp}&state={app_state}"

    pin_url = url.format(cid=client_id,resp= resp, app_state=state)
    return pin_url

def getToken(client_id,client_secret, pin):
    """takes the client_id and client_secret from the registered application URL,
    along with the pin returned from `getPin()`, and return an access_token and a
    refresh_token""" 
 
    #the query parameters you'll send along with the POST request
    params ={ "client_id" :client_id,
             "client_secret" : client_secret,
             "grant_type" : "pin",
             "pin": pin}
 
    url = r"https://api.imgur.com/oauth2/token/"
 
    #make sure the data is sent with the POST request, along with disabling the
    # SSL verification, potential security warning
    r = requests.post(url, data = params, verify=False)
    
    j= r.json()
    access_token= j['access_token']
    refresh_token= j['refresh_token'] 
    return (access_token, refresh_token)

def upload_image(access_token,image_url):
    headers = {"authorization":"Bearer " + access_token}

    upload_url = r'https://api.imgur.com/3/upload'
 
    #encode image file for transfer
    binary_data = image_url 
    b64image = base64.b64encode(binary_data)
 
    #this is the data we'll POST to the api's URL
    payload = {'image' : b64image}
 
    #make the upload, ensuring that the data, headers are included, and
    # make sure to disable the verification of the SSL. Potential insecurty though
    r = requests.post(upload_url, data=payload, headers=headers, verify=False)
    j = r.json()
    print(j)
    uploaded_url = j['data']['link']
    return uploaded_url

def refreshtoken(refresh_token, client_id, client_secret):
    url = "https://api.imgur.com/oauth2/token"

    payload = {'refresh_token' : refresh_token, 
               'client_id' : client_id,
               'client_secret' : client_secret,
               'grant_type' : 'refresh_token'}
    r = requests.post(url,data=payload)
    j= r.json()
    return j['access_token'],j['refresh_token']
 

@imgRoutes.route("/img", methods=["POST"])
def uploadimage():
    if request.method == "POST":
        config = configparser.ConfigParser()
        config.read("image_key")
        client_id = config.get('img', 'Client-Id')
        client_secret = config.get('img', 'Client-Secret')
        refresh_token = config.get('img', 'refresh_token')
        #access_token = config.get('img', 'access_token')
        #4/25/217:access_token expires in 30 days
        #pin_url = getPin(client_id,client_secret)
        access_token, refresh_token = refreshtoken(refresh_token,client_id,client_secret)
        data = request.data
        req = upload_image(access_token,data)

        empty_json = {} 
        empty_json["link"]=req
        result = simplejson.dumps(empty_json)
        return Response(result, mimetype="application/json")


