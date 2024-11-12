from flask import Flask

app = Flask(__name__)

# NOTE: decorator @app.before_first_request has been deprecated. Need to push context manually to app
# @app.before_first_request
# def before_first_function():
#     print("before_first_request runs only once")

with app.app_context():
    print("Manually push context to app - this happens only once")

# Alternative ways to replicate the before_first_request functionality:
# https://stackoverflow.com/questions/73570041/flask-deprecated-before-first-request-how-to-update

@app.before_request
def before_request_function():
    print("before_request is running")

@app.after_request
def after_request_function(response):
    print("after_request is running")
    return response

@app.route('/')
@app.route('/home')
def home():
    return '<h1>Home</h1>'

@app.route('/about')
def about():
    return '<h1>About</h1>'

@app.route('/item/<int:id>')
def item(id):
    return f'item {id}'
