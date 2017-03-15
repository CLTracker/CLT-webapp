#!/usr/bin/env python3
# Shebang ^ for anyone running server on linux system 

#library imports
from flask import Flask
from flask_cors import CORS

#custom imports
from login import loginRoutes
from event import eventRoutes
from infoedit import infoRoutes
from attendee import attendeeRoutes



# For reference
#from sample import sampleRoutes
#app.register_blueprint(sampleRoutes)


app = Flask(__name__)
CORS(app)

#Registering of routes relating to user management
app.register_blueprint(loginRoutes)
app.register_blueprint(eventRoutes)
app.register_blueprint(infoRoutes)
app.register_blueprint(attendeeRoutes)

if __name__ == "__main__":
    app.run(host="192.168.1.7", debug=True, port = 8080, threaded=True)
    print("Running dev server on port 8080")
