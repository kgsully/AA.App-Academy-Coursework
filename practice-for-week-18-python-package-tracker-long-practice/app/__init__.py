from flask import Flask, redirect, render_template, url_for
from flask_migrate import Migrate
from .config import Config
from .forms import ShippingForm
from .models import Package, db
from map.map import map as map_graph

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)


@app.route('/', methods=["GET"])
def index():
    packages = Package.query.all()

    return render_template("package_status.html", packages=packages)

@app.route('/new_package', methods=["GET", "POST"])
def new_package():
    shipping_form = ShippingForm()

    if shipping_form.validate_on_submit():
        # print(shipping_form.data)
        data = shipping_form.data
        new_package = Package(sender=data["sender"],
                              recipient=data["recipient"],
                              origin=data["origin"],
                              destination=data["destination"],
                              location=data["origin"])
        db.session.add(new_package)
        db.session.commit()

        new_package.advance_all_locations()

        return redirect(url_for(".index"))

    return render_template("shipping_request.html", shipping_form=shipping_form)
