from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class Employee(db.Model, UserMixin):
    __tablename__ = "employees"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    employee_number = db.Column(db.Integer, unique=True, nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


# Menu has a one-to-many relationship with named items to the MenuItem objects
# A menu can have many items, but each item is assigned to a particular menu
class Menu(db.Model):
    __tablename__ = "menus"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)

    items = db.relationship("MenuItem", back_populates="menu", cascade="all, delete-orphan")


# MenuItem has a many-to-one relationship with Menu, and a many-to-one relationship with MenuItemType
# Many menu items can be part of a particular menu
# There are many menu items, but each item has one particular menu item type
class MenuItem(db.Model):
    __tablename__ = "menu_items"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    menu_id = db.Column(db.Integer, db.ForeignKey("menus.id"), nullable=False)
    menu_type_id = db.Column(db.Integer, db.ForeignKey("menu_item_types.id"), nullable=False)

    menu = db.relationship("Menu", back_populates="items")
    type = db.relationship("MenuItemType", back_populates="menu_item")


# MenuItemType has a many-to-one relationship with MenuItem
# Many menu items have a type (read: all menu items have a type), but each menu item can have only one type
class MenuItemType(db.Model):
    __tablename__ = "menu_item_types"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)

    menu_item = db.relationship("MenuItem", back_populates="type", cascade="all, delete-orphan")
