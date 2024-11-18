from os import environ

class Config:
    SQLALCHEMY_DATABASE_URI = environ.get("DATABASE_URL") or \
        "postgresql://sqlalchemy_test:password@localhost/sqlalchemy_test"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
