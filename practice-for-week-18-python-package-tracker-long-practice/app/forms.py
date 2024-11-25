from flask_wtf import FlaskForm
from wtforms import BooleanField, SelectField, StringField, SubmitField
from wtforms.validators import DataRequired

from map.map import map as map_graph


class ShippingForm(FlaskForm):

    city_choices = list(zip(range(1,11), list(map_graph.keys())))

    sender = StringField("Sender Name", validators=[DataRequired()])
    recipient = StringField("Recipient Name", validators=[DataRequired()])
    origin = SelectField("Origin",
                         choices = city_choices,
                         validators=[DataRequired()])
    destination = SelectField("Destination",
                              choices = city_choices,
                              validators=[DataRequired()])
    express_req = BooleanField("Express Shipping Desired")
    add_pkg = SubmitField("Add New Package")
