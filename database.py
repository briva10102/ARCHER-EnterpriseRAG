import psycopg2

conn = psycopg2.connect(
    host="localhost",
    database="solar_db",
    user="postgres",
    password="Briva@789"
)

cursor = conn.cursor()

