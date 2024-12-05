from app import app

from flask.cli import FlaskGroup

cli = FlaskGroup(app)

if __name__ == "__main__":
    cli()

# if __name__ == "__main__":
#     app.run(host='0.0.0.0', port=5000, debug=True)
