from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

db_url = "postgresql://sqlalchemy_test:password@localhost/sqlalchemy_test"
engine = create_engine(db_url)

SessionFactory = sessionmaker(bind=engine)

session = SessionFactory()

# Do stuff with the session

with engine.connect() as connection:
    query = text("""
            SELECT o.first_name, o.last_name, p.name
            FROM owners o
            JOIN ponies p ON (o.id = p.owner_id)
            """)

    result = connection.execute(query)

    for row in result:
        row_as_dict = row._mapping  # Need to add this as sqlalchemy will return a tuple
        print(row_as_dict["first_name"], row_as_dict["last_name"], "owns", row_as_dict["name"])

engine.dispose()
