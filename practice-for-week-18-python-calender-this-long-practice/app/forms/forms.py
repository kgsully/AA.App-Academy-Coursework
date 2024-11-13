from datetime import datetime
from flask_wtf import FlaskForm
from wtforms import (
    BooleanField, DateField, StringField, SubmitField, TextAreaField, TimeField)
from wtforms.validators import DataRequired, ValidationError

class AppointmentForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    start_date = DateField("Start Date", validators=[DataRequired()])
    start_time = TimeField("Start Time", validators=[DataRequired()])
    end_date = DateField("End Date", validators=[DataRequired()])
    end_time = TimeField("End Time", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired()])
    private = BooleanField("Private")
    submit = SubmitField("Submit")

    # One-off custom validator for end-date field
    def validate_end_date(form, field):
        start = datetime.combine(form.start_date.data, form.start_time.data)
        end = datetime.combine(field.data, form.end_time.data)
        if start >= end:
            msg = "End date/time must come after start date/time"
            raise ValidationError(msg)
        if form.start_date.data > field.data or form.start_date.data < field.data:
            msg = "Start date and End date must be the same day"
            raise ValidationError(msg)
