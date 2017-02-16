"""Implicit module which returns token-expiry time from Flask-security."""

from flask_security import views
from werkzeug.datastructures import MultiDict
from flask import jsonify,  after_this_request

def _commit(response=None):
    views._datastore.commit()
    return response
