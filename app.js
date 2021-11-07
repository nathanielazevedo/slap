const express = require('express');
const db = require("./db");
var cors = require('cors')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

/** Show JSON on instructor */

app.get("/addslap/:name", async function (req, res, next) {
  let name = req.params.name;
  const results = await db.query(`INSERT INTO shouldIslaptable (name) VALUES ($1)`, [name]);
  return res.json({message: 'updated successfully'});
});



app.get("/slap", async function (req, res, next) {
  const results = await db.query(`SELECT * FROM shouldIslaptable ORDER BY id asc`);
  let nextone;
  let all = results.rows; 
  if(all.length !== 0){
    nextone = results.rows[0];
    await db.query(`DELETE FROM shouldislaptable WHERE id = $1`, [nextone.id]); 
    return res.json(nextone)
  } else{
    return res.json(0)
  }
});

app.get('/', function(req, res) {
  return res.send('hey');
});

app.listen(process.env.PORT, function () {
  console.log('App on port 3000');
});
// app.listen(3000, function () {
//   console.log('App on port 3000');
// });