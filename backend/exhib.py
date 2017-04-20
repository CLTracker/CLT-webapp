#library imports
from flask import Flask, request, Response, make_response, Blueprint
import simplejson

#custom imports
from database import dbPool
 
exhibRoutes = Blueprint("exhibRoutes", __name__)

def edit_exhib(db, content, confId):
    
    json_status = {"status": 401}
    cursor = db.cursor(dictionary=True)
    
    #Checking source
    query = "SELECT permissions FROM users WHERE email = %s"
    cursor.execute(query, (content["source"],))
    result = cursor.fetchone()
    if result is None:
        return json_status, json_status["status"]
         
    else:
        query = "SELECT permission_name FROM permissions WHERE permission_id = %s"
        cursor.execute(query, (result["permissions"],))
        result = cursor.fetchone()
       
        # 1 == xhib
        # 2 == admin
        # 3 == org
        if result["permission_name"] == "adm" or result["permission_name"] == "xhb":
            return json_status, json_status["status"]
        else:
            
            #get conference_id
            query = "SELECT conference FROM organizers WHERE organizer_email = %s"
            cursor.execute(query, (content["source"],))
            result=cursor.fetchone()
            orgConf = str(result["conference"])
                
            
            #check if confId and conference_id of organizer match
            if orgConf != confId: 
                return json_status, json_status["status"]
           
            #check if they are in users table
            query = "SELECT email FROM users WHERE email = %s"
            cursor.execute(query, (content["email"],))
            result = cursor.fetchone()
            if result is None:
                #create new user
                query = "INSERT INTO users(email,user_id, permissions) VALUES(%s, %s, %s)"
                cursor.execute(query, (content["email"],content["email"], 1,))
                db.commit()

            #check if they are already on permitted_exhibitors    
            query = "SELECT exhibitor_email,conference_id FROM permitted_exhibitors WHERE exhibitor_email = %s"
            cursor.execute(query, (content["email"],))
            result = cursor.fetchone()    

            if result is None:
                #add email to list
                query = "INSERT INTO permitted_exhibitors(exhibitor_email,conference_id) VALUES (%s,%s)"
                cursor.execute(query,(content["email"],orgConf,))
                db.commit()
      
            json_status["status"] = 200    
            return json_status, json_status["status"]

def get_all_exhib(db,confid):
    #want email: string, name: string, company: string 
    return_json = []
    cursor = db.cursor(dictionary=True) 

    #grab the exhibitors from permitted_exhibitors
    query = "SELECT exhibitor_email FROM permitted_exhibitors WHERE conference_id = %s"
    cursor.execute(query, (confid,))
    permitted_results = cursor.fetchall()

    #check if they are in exhibitors table
    for row in permitted_results:
        empty_dict = {}
        query = "SELECT company_name FROM exhibitors WHERE conference = %s AND exhibitor_email = %s"
        cursor.execute(query,(confid, row["exhibitor_email"],))
        result = cursor.fetchone()

        query = "SELECT name FROM users WHERE email = %s"
        cursor.execute(query,(row["exhibitor_email"],))
        name_result= cursor.fetchone()

        #not it is not exhibitors table and company_name is empty
        if result is None:
            empty_dict["company"]=""

        #they are in the exhibitor table       
        else:
            empty_dict["company"]= result["company_name"]               

        #putting info into dic and appending to array    
        empty_dict["name"]= name_result["name"]
        empty_dict["email"]=row["exhibitor_email"]
        return_json.append(empty_dict)
        
    return return_json,200
           
    

        
        
@exhibRoutes.route("/edit/exhibitors/<string:confid>", methods=["POST"])
def exhib_list_edit(confid):
    if request.method == "POST":
        db = dbPool.connect().connection
        status_json,status = edit_exhib(db,request.json,confid)
        jsonObject = simplejson.dumps(status_json)
        db.close()
        return Response(jsonObject, mimetype="application/json"), status

       
@exhibRoutes.route("/user/exhibitors/<string:confid>", methods=["GET"])
def getallexhib(confid):
    if request.method == "GET":
        db= dbPool.connect().connection
        jsonOb,status = get_all_exhib(db,confid)
        jsonObject = simplejson.dumps(jsonOb)
        db.close()
        return Response(jsonObject, mimetype="application/json"),status
