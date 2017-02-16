"""All the database related entities are in this module."""


from flask_security import SQLAlchemyUserDatastore
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

user_datastore = SQLAlchemyUserDatastore(db, User, Role)
