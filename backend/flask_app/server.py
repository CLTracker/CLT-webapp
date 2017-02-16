"""Entry point for the server application."""

import json
import logging

from flask import Response, request
from flask_security import auth_token_required, utils
from gevent.wsgi import WSGIServer

from .app_utils import html_codes
from .factory import create_app

logger = logging.getLogger(__name__)
app = create_app()


# @app.before_first_request
# def init():
    # create_user(app)

@app.route('/api/getdata', methods=['GET'])
def get_data():
    """Get dummy data returned from the server."""
    data = {'Heroes': ['Hero1', 'Hero2', 'Hero3']}
    json_response = json.dumps(data)
    return Response(json_response,
                    status=html_codes.HTTP_OK_BASIC,
                    mimetype='application/json')


def main():
    """Main entry point of the app."""
    try:
        http_server = WSGIServer(('0.0.0.0', 3030),
                                 app,
                                 log=logging,
                                 error_log=logging)

        http_server.serve_forever()
    except Exception as exc:
        logger.error(exc.message)
    finally:
        # get last entry and insert build appended if not completed
        # Do something here
        pass
