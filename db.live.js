import mysql from "mysql2"

export const mysqldb = mysql.createConnection({
  host:"localhost",
  user:"watsun",
  password: "Taha1sol@7217234",
  database:"watsun"
})