import psycopg2

CONNECTION_PARAMETERS = {
                          'dbname': 'psycopg_test_db',
                          'user': 'psycopg_test_user',
                          'password': 'password',
                          'host': '127.0.0.1'
                        }

# with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
    # print(conn.get_dsn_parameters())
    # # Output: {'user': 'psycopg_test_user', 'dbname': 'psycopg_test_db', ...}

    # # Open a "cursor" to perform data operations
    # with conn.cursor() as curs:
    #     curs.execute("SELECT USER;")
    #     result = curs.fetchone()
    #     print(result) # 'psycopg_test_user'
    #     print(dir(curs))

    # # Use results performed from executing a SELECT statement on existing database
    # with conn.cursor() as curs:
    #     curs.execute('SELECT manu_year, make, model FROM cars;')
    #     cars = curs.fetchall()
    #     for car in cars:
    #         print(car) # (1993, 'Mazda', 'Rx7')...


# Use parameterized SQL statements to select, insert, update, and delete data
def print_all_cars():
    with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
        with conn.cursor() as curs:
            curs.execute('SELECT manu_year, make, model, owner_id FROM cars;')
            cars = curs.fetchall()
            for car in cars:
                print(car)

# print("\nPrint All Cars:")
# print_all_cars()
# Output:
# (1993, 'Mazda', 'Rx7', 1)
# ...additional cars

# The cursor will let you use parameterized SQL statements to execute your commands. Next, add a function that will return all of the cars owned by a given user.
def get_owners_cars(owner_id):
    """
    Fetch and return all cars in the cars table
    :param owner_id: <int> the id of the owner who's cars to return
    :return: <list> the results of the query
    """
    with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
        with conn.cursor() as curs:
            curs.execute("""
                         SELECT manu_year, make, model FROM cars
                         WHERE owner_id = %(owner_id)s
                         """,
                         {'owner_id': owner_id})
            results = curs.fetchall()
            return results

# print("\n Print Owner 1's cars:")
# print(get_owners_cars(1)) # [(1993, 'Mazda', 'Rx7')]

# You also need a way to add a new car into the car table. You can do that by combining the INSERT command that you are familiar with and more parameters.
def add_new_car(manu_year, make, model, owner_id):
    """
    Add the given car to the database
    :param manu_year: <int> the year the car was made
    :param make: <string> the manufacturer of the car
    :param model: <string> the model of the car
    :param owner_id: <int> the id number of the owner
    """
    with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
        with conn.cursor() as curs:
          # curs.execute(f'INSERT INTO {table}{columns} VALUES{values};')
          curs.execute("""
                       INSERT INTO cars (manu_year, make, model, owner_id)
                       VALUES (%(manu_year)s, %(make)s,
                       %(model)s, %(owner_id)s)
                       """,
                       {'manu_year': manu_year,
                        'make': make,
                        'model': model,
                        'owner_id': owner_id
                       })

# add_new_car(2000, 'Ford', 'Lightning', 2)
# add_new_car(1994, 'Toyota', 'Supra', 2)
# print('\n Added new cars, print the list again')
# print_all_cars()

# Finally, build a function to delete the record of a car.
def delete_car(car_id):
    """
    Delete the record for a car given an id for that car
    :param car_id: <int> the id of the car record to remove
    """
    with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
        with conn.cursor() as curs:
            curs.execute("""
                         DELETE FROM cars WHERE id = %(car_id)s
                         """,
                         {'car_id': car_id})


# delete_car(2)

# print_all_cars()
# Output:
# (1993, 'Mazda', 'Rx7', 1)
# (1994, 'Acura', 'Integra', 3)
# (2000, 'Ford', 'Lightning', 2)
# (1994, 'Toyota', 'Supra', 1)
