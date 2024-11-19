from dotenv import load_dotenv
load_dotenv()

# Regardless of the lint error you receive, load_dotenv must run before running this
# so that the environment variables are properly loaded.
from app import app, db
from app.models import Employee, Menu, MenuItem, MenuItemType


with app.app_context():
    # Drop and create all tables
    db.drop_all()
    db.create_all()

    # Handle seed data for "employees" table
    employee = Employee(name="Margot", employee_number=1234, password="password")


    # Handle seed data for "menus", "menu_items", and "menu_item_types" tables
    beverages = MenuItemType(name="Beverages")
    entrees = MenuItemType(name="Entrees")
    sides = MenuItemType(name="Sides")

    dinner = Menu(name="Dinner")

    fries = MenuItem(name="French fries", price=3.50, type=sides, menu=dinner)
    drp = MenuItem(name="Dr. Pepper", price=1.0, type=beverages, menu=dinner)
    jambalaya = MenuItem(name="Jambalaya", price=21.98, type=entrees, menu=dinner)


    # Add data to sessions before committing
    db.session.add(employee)
    db.session.add(beverages)
    db.session.add(entrees)
    db.session.add(sides)
    db.session.add(dinner)
    db.session.add(fries)
    db.session.add(drp)
    db.session.add(jambalaya)

    # Commit data from session
    db.session.commit()
