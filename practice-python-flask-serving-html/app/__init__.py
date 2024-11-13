from flask import (Flask, render_template, redirect)
# Load configuration class
from app.config import Config
# Import form class
from app.sample_form import SampleForm


app = Flask(__name__)
# Apply configuration from class
app.config.from_object(Config)


@app.route('/')
def index():
    # Keep sample simple with just a link to the form
    return '<h1>Sample App</h1><a href="/form">Form</a>'

@app.route('/form')
# @app.route('/form', methods=['GET', 'POST'])  # Current lesson states leave it as "Method Not Allowed"
def form():
    # Instantiate the form
    form = SampleForm()
    # if form.validate_on_submit(): # Upon successful form validation, redirect to index or '/'
    #     return redirect('/')
    # Send form to Jinja template (with form=form)
    return render_template('form.html', form=form)
