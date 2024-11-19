from flask_wtf import FlaskForm
from wtforms import PasswordField, StringField, SelectField, SubmitField
from wtforms.validators import DataRequired, ValidationError

class LoginForm(FlaskForm):
    employee_number = StringField("Employee Number", validators=[DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])
    submit = SubmitField("Login")

class AssignForm(FlaskForm):
    tables = SelectField("Open Tables")
    servers = SelectField("Servers")
    submit = SubmitField("Assign")
