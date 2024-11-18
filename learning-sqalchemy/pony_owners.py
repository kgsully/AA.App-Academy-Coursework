from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from mappings import Owner, Pony

db_url = "postgresql://sqlalchemy_test:password@localhost/sqlalchemy_test"
engine = create_engine(db_url)

SessionFactory = sessionmaker(bind=engine)

session = SessionFactory()

# Do stuff with the session

# # Create values to insert
you = Owner(first_name="neu",
            last_name="kenio",
            email="neukenio@nope.com")

your_pony = Pony(name="Pon Pon",
                 birth_year=2020,
                 breed="Horsie",
                 owner=you)

print(you.id)           # > None
print(your_pony.id)     # > None

# with engine.connect() as connection:
# #     Select query
#     query = text("""
#             SELECT o.first_name, o.last_name, p.name
#             FROM owners o
#             JOIN ponies p ON (o.id = p.owner_id)
#             """)

#     result = connection.execute(query)

#     for row in result:
#         row_as_dict = row._mapping  # Need to add this as sqlalchemy will return a tuple
#         print(row_as_dict["first_name"], row_as_dict["last_name"], "owns", row_as_dict["name"])

# engine.dispose()

# The Session object has already been created and bound to the engine.
session.add(you)      # Connects you and your_pony objects
session.commit()      # Saves data to the database

print(you.id)         # > 4 (or whatever the new id is)
print(your_pony.id)   # > 4 (or whatever the new id is)

print(your_pony.birth_year)    # > 2020

your_pony.birth_year = 2019
print(your_pony.birth_year)    # > 2019

session.commit()

print(your_pony.birth_year)    # > 2019

# NEW CODE BEGINS
your_pony.name = "Mr. Fancy Pants"
your_pony.birth_year = 1896
print(your_pony.name)          # > Mr. Fancy Pants
print(your_pony.birth_year)    # > 1896

session.rollback()
print(your_pony.name)          # > your pony's original name
print(your_pony.birth_year)    # > 2019
# NEW CODE ENDS

# Continuing the code from above...
session.delete(you)
session.commit()

session.close()
engine.dispose()
