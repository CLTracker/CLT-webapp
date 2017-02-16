# !/usr/bin/env python
# -*- coding: utf-8 -*-
"""Docstring for module."""


import os

from flask import Flask
from flask_cors import CORS
from flask_security import Security, utils

from .app_utils import utilities
from .config import CONFIG
from .models import user_datastore


def create_app():
    """Configure the app w.r.t Flask-security, databases, loggers."""
    app = Flask(__name__)
    config_name = os.getenv('FLASK_CONFIGURATION', 'default')
    app.config.from_object(CONFIG[config_name])
    # app.secret_key = app.config['SECRET_KEY']
    utilities.setup_logger()
    db.init_app(app)
    Security(app, user_datastore)
    CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'

    return app
