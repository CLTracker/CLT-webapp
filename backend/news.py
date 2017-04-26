#library imports
from flask import Flask, request, Response, make_response, Blueprint
import simplejson

#custom imports
from database import dbPool

newsRoutes = Blueprint("newsRoutes", __name__)

def getNews(db, confId):
    #any # of news with title, logo, text, author    
    cursor = db.cursor(dictionary=True)
    result = [] 
    query = "SELECT title, logo_url, text, author FROM news WHERE conference = %s"
    cursor.execute(query, (confId,))
    results = cursor.fetchall()
    for row in results:
        result.append(row)
    return result, 200    

def edit_news(db, content, confId):

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
        statJson,ta = getNews(db, confId)
        return statJson, 401
    else:
        #add news
        query = "INSERT INTO news(conference,title,logo_url,text, author) VALUES (%s,%s,%s,%s,%s)"
        cursor.execute(query,(confId,content["news_item"]["title"],content["news_item"]["logo"],content["news_item"]["text"],content["news_item"]["author"],))
        db.commit()
        statJson,ta = getNews(db, confId)
        return statJson, 200

def deleteNewsItem(db, content, confId):

    cursor = db.cursor(dictionary=True)
    titleToDelete = content["news_item"]["title"] 
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
        statJson,ta = getNews(db, confId)
        return statJson, 401
    else:
        #add news
        query = "DELETE FROM news WHERE title=%s"
        cursor.execute(query, (titleToDelete,))
        db.commit()
        statJson,ta = getNews(db, confId)
        return statJson, 200

#addes new to the database
@newsRoutes.route("/edit/news/<string:confid>", methods=["PATCH", "POST"])
def newsedit(confid):
    if request.method == "POST":
        db = dbPool.connect().connection
        jsonObject, status = edit_news(db,request.json,confid)
        jsonObj = simplejson.dumps(jsonObject)
        db.close()
        return Response(jsonObj, mimetype="application/json"), status
    elif request.method == "PATCH":
        db = dbPool.connect().connection
        jsonObject, status = deleteNewsItem(db,request.json,confid)
        jsonObj = simplejson.dumps(jsonObject)
        db.close()
        return Response(jsonObj, mimetype="application/json"), status
        

@newsRoutes.route("/news/<string:confId>", methods=["GET"])
def news(confId):
    if request.method == "GET":
        db = dbPool.connect().connection
        result, status = getNews(db, confId)
        result = simplejson.dumps(result)
        db.close()
        return Response(result, mimetype= "application/json"), status
