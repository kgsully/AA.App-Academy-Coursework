from flask import Blueprint, render_template
from flask_login import login_required
from sqlalchemy import func
from ..forms import AssignForm
from ..models import Employee, Table, Order

bp = Blueprint("orders", __name__, url_prefix="")


@bp.route("/")
@login_required
def index():
    # Get all tables and open orders
    # (if using list comprehension syntax to determine occupied table ids, do not execute the query with .all())
    tables = Table.query.order_by(Table.number).all()
    open_orders = Order.query.filter(Order.finished == False).all()

    # Determine occupied tables
    occupied_table_ids = [order.table_id for order in open_orders]
    # # A list comprehension can be used in order to execute queries and then loop over the rows returned as it is iterable
    # occupied_table_ids = [order.table_id for order in open_orders]

    # Determine open tables
    open_tables = [table for table in tables if table.id not in occupied_table_ids]

    servers = Employee.query.order_by(Employee.name).all()
    print(servers[1].orders)

    # Generate assignment form
    assign_form = AssignForm()
    assign_form.tables.choices = [(table.id, f"Table {table.number}") for table in open_tables]
    assign_form.servers.choices = [(server.id, f"{server.name} ({len(server.orders)})") for server in servers]




    return render_template("orders.html", assign_form=assign_form)
