import os
import psycopg2
from datetime import datetime, timedelta
from flask import Blueprint, render_template, redirect, url_for
from app.forms.forms import AppointmentForm

bp = Blueprint('main', __name__, '/')

CONNECTION_PARAMETERS = {
    'user': os.environ.get('DB_USER'),
    'password': os.environ.get('DB_PASS'),
    'dbname': os.environ.get('DB_NAME'),
    'host': os.environ.get('DB_HOST'),
}


@bp.route('/', methods=['GET', 'POST'])
def main():
    current_datetime = datetime.now()
    daily_url = url_for('.daily', year=current_datetime.year, month=current_datetime.month, day=current_datetime.day)
    return redirect(daily_url)

@bp.route('/<int:year>/<int:month>/<int:day>', methods=['GET', 'POST'])
def daily(year, month, day):
    form = AppointmentForm()
    if form.validate_on_submit():
        params = {
            'name': form.name.data,
            'start_datetime': datetime.combine(form.start_date.data, form.start_time.data),
            'end_datetime': datetime.combine(form.end_date.data, form.end_time.data),
            'description': form.description.data,
            'private': form.private.data,
        }

        with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
            with conn.cursor() as curs:
                curs.execute("""
                            INSERT INTO appointments (name, start_datetime, end_datetime, description, private)
                            VALUES ( %(name)s, %(start_datetime)s, %(end_datetime)s, %(description)s, %(private)s)
                            """,
                            params) # use params for all of the parameterized values as it is already a dict

        return redirect('/')

    today = datetime(year, month, day)
    next_day = today + timedelta(days=1)
    print(f'\n{today}\n{next_day}\n')
    with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
        with conn.cursor() as curs:
            curs.execute("""
                         SELECT id, name, start_datetime, end_datetime
                         FROM appointments
                         WHERE start_datetime BETWEEN %(today)s AND %(next_day)s
                         ORDER BY start_datetime;
                         """,
                         {
                             'today': today,
                             'next_day': next_day
                         })
            rows = curs.fetchall()  # this will be a list of tuples

    return render_template('main.html', rows=rows, form=form)
