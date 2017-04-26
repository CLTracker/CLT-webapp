#library imports
from flask import Flask, request, Response, make_response, Blueprint
import simplejson

#custom imports
from database import dbPool
 
newsRoutes = Blueprint("newsRoutes", __name__)

def edit_news(db, content, confId):

    statjson = { "status": 401}
    cursor = db.cursor(dictionary=True)
   
    #Checking source
    query = "SELECT permissions FROM users WHERE email = %s"
    cursor.execute(query, (content["source"],))
    result = cursor.fetchone()
    
    query = "SELECT permission_name FROM permissions WHERE permission_id = %s"
    cursor.execute(query, (result["permissions"],))
    result = cursor.fetchone()

    # 1 == xhib
    # 2 == admin
    # 3 == org
    if result["permission_name"] == "adm" or result["permission_name"] == "xhb":
        return statjson, statjson["status"]
    else:
        #add news
        query = "INSERT INTO news(conference,title,logo_url,text, author) VALUES (%s,%s,%s,%s,%s)"
        cursor.execute(query,(confId,content["news_item"]["title"],content["news_item"]["logo"],content["news_item"]["text"],content["news_item"]["author"],))
        db.commit()
        statjson["status"] = 200
        return statjson, statjson["status"]

#addes new to the database
@newsRoutes.route("/edit/news/<string:confid>", methods=["POST"])
def newsedit(confid):
    if request.method == "POST":
        db = dbPool.connect().connection
        jsonObject, status = edit_news(db,request.json,confid)
        jsonObj = simplejson.dumps(jsonObject)
        db.close()
        return Response(jsonObj, mimetype="application/json"), status

