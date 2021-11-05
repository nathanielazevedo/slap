/** Database setup for users. */

const { Client } = require("pg");

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///slap";
} else {
  DB_URI = "postgresql:///slap";
}

let db = new Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;