import mysql from "mysql2"

export const mysqldb = mysql.createConnection({
  host:"localhost",
  user:"root",
  password: "Karachi#2022",
  database:"watersun"
})