import os
from flask import Flask
from app import routes

app = Flask(__name__)
# This is an alternative method to using a Config class in a config module with app.config.from_object
# The app.config.update method takes a dictionary and uses it in much the same way that app.config.from_object iterates
#    over the attributes of the object and sets the configuration from that
app.config.update({'SECRET_KEY': os.environ.get('SECRET_KEY')})
app.register_blueprint(routes.bp)
