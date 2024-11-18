from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from mappings import Owner, Pony

db_url = "postgresql://sqlalchemy_test:password@localhost/sqlalchemy_test"
engine = create_engine(db_url)

SessionFactory = sessionmaker(bind=engine)

session = SessionFactory()

# Do stuff with the session

# # Create values to insert using mapping classes that were created in mappings.py
you = Owner(first_name="neu",
            last_name="kenio",
            email="neukenio@nope.com")

your_pony = Pony(name="Pon Pon",
                 birth_year=2020,
                 breed="Horsie",
                 owner=you)

# print(you.id)           # > None
# print(your_pony.id)     # > None

# # Original code to query and check DB connection and proper data within the tables
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

# ---------------------------------------------------------------------------------------------------------------------------------------
# Session code to perform C-UD actions against DB tables using objects created from session classes in mappings.py
# The Session object has already been created and bound to the engine.
# ---------------------------------------------------------------------------------------------------------------------------------------

# CREATE operation
session.add(you)      # Connects you and your_pony objects
session.commit()      # Saves data to the database

print(you.id)         # > 4 (or whatever the new id is)
print(your_pony.id)   # > 4 (or whatever the new id is)

print(your_pony.birth_year)    # > 2020

# UPDATE prior to commit
your_pony.birth_year = 2019
print(your_pony.birth_year)    # > 2019

session.commit()

print(your_pony.birth_year)    # > 2019

# UPDATE operation AFTER first commit
your_pony.name = "Mr. Fancy Pants"
your_pony.birth_year = 1896
print(your_pony.name)          # > Mr. Fancy Pants
print(your_pony.birth_year)    # > 1896

# Showing rollback() functionality
session.rollback()
print(your_pony.name)          # > your pony's original name
print(your_pony.birth_year)    # > 2019

# DELETE operation
session.delete(you)
session.commit()

# ---------------------------------------------------------------------------------------------------------------------------------------
# Queries
# ---------------------------------------------------------------------------------------------------------------------------------------

# QUERY operation
pony_query = session.query(Pony)
print(f'\nPony Query:\n{pony_query}')       # This prints the SQL query object that is generated, which is an instance of the Query class. NOTE: It DOES NOT EXECUTE the query at this point
# Query that gets generated as a result of calling session.query on the Pony object
# SELECT ponies.id AS ponies_id,
#        ponies.name AS ponies_name,
#        ponies.birth_year AS ponies_birth_year,
#        ponies.breed AS ponies_breed,
#        ponies.owner_id AS ponies_owner_id
# FROM ponies

# If all you want is a single record because you have its primary key, use the get method.
# The following is an example of getting the Pony object with the associated record that has 4 as its primary key.
# If no record exists with the provided primary key value, then the method returns None.
# pony_id_3_query = session.query(Pony).get(3) Query.get is now depricated, use session.get instead
pony_id_3_query = session.get(Pony, 3)
print(f'\nPony ID 3 Query:\nName: {pony_id_3_query.name}\nBirth Year: {pony_id_3_query.birth_year}\netc....')

# Querying certain attributes - If you don't want SQLAlchemy to get all of the attributes for an entity, you can tell it to just get the ones that you want.
owner_query = session.query(Owner.first_name, Owner.last_name)
print(f'\nOwner Query:\n{owner_query}')

# Ordering Results - The Query object has a method named order_by on it. You pass the mapped attribute that you want to order by to it.
owner_query_order_by = session.query(Owner.first_name, Owner.last_name).order_by(Owner.last_name)
print(f'\nOwner Order-By Query:\n{owner_query_order_by}')

# Filtering results - Like using a WHERE. You can use multiple filters AND-ed together by just adding another .filter()
pony_query_filtered = session.query(Pony).filter(Pony.name.ilike("%u")).filter(Pony.birth_year < 2015)
print(f'\nPony Query - Filtered:\n{pony_query_filtered}')

# ---------------------------------------------------------------------------------------------------------------------------------------
# EXECUTING QUERIES:
# ---------------------------------------------------------------------------------------------------------------------------------------

#There are four common methods that you will use on a Query object to get the records associated with the query.

#     all: returns a list: This will return all of the records that the query matches.
#     first: returns a single object: This will return only the first of the records that the query matches.
#     one: returns a single object or raises an exception:
#         If the query matches one and only one record in the database, then you will get that one record back.
#         If it matches zero or two or more records, this method raises an error.
#     one_or_none: returns a single object or None:
#         If the query matches no record, returns None
#         If the query matches one record, return that record
#         If the query matches more than one record, raises an exception


# ALL METHOD:
ponies = pony_query.all()
print("\nPony Query - ALL method:")
for pony in ponies:
    print(pony.name)

# NOTE: By default, the all method is called when the Query object is turned into something list-like. For example, the above code can be rewritten as the following
# for pony in pony_query:  # Implicit call to .all()
#     print(pony.name)

# COUNTING RECORDS:
# Changes the query to contain the COUNT SQL function instead of a column name.
print(f'\nCounting Records - Pony Query All Method:\n{pony_query.count()}')


session.close()
engine.dispose()
