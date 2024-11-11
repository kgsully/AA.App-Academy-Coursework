from flask import Flask
from config import Config

app = Flask(__name__)

# Good - Use app.config configuration method to set values directly:
# app.config["greeting"] = 'Hey there, humans!'

# Better - Use app.config configuration with a config class to set values from the import
app.config.from_object(Config)

# Best - environment overrides config
# Test value of variable that may or may not come from the environment
print("SECRET KEY IS: ", app.config["SECRET_KEY"])

@app.route('/')
def hello():

    # # Return HTML:
    # return '<h1>Hello, World!</h1>'

    # Using app.config configuration method:
    # return f'<h1>{app.config["greeting"]}</h1>'

    # Use configuration variable:
    return f'<h1>{app.config["GREETING"]}</h1>'
