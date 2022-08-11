from ctypes import create_string_buffer
from logging import root
from mysql.connector import connect, Error
import os
from dotenv import load_dotenv

load_dotenv( )

create_cheap_country = """
CREATE TABLE cheap_country(
    id INT AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(100),
    currency VARCHAR(100),
    currency_rate INT,
    region VARCHAR(100),
    safe_level INT,
    picture_url VARCHAR(100),
    collected_date Date
)
"""
user_name=os.getenv("User_Name")
data_password=os.getenv("MySQL_Pass")

show_table_query = "DESCRIBE cheap_country"

try:
    with connect(
        host="localhost",
        user=user_name,
        password=data_password,
        database="travel_db"
    ) as connection:
        show_db_query = "SHOW DATABASES"
        with connection.cursor(buffered=True) as cursor:
          cursor.execute(show_db_query)
          for db in cursor:
            print(db)
          # cursor.execute(create_cheap_country)
          cursor.execute(show_table_query)

          result = cursor.fetchall()
          for row in result:
            print(row)
          connection.commit()


        print(connection)
except Error as e:
    print(e)
