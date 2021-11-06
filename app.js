const express = require('express');
const db = require("./db");
var cors = require('cors')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

/** Show JSON on instructor */

app.get("/addslap", async function (req, res, next) {
  const results = await db.query(`SELECT slap FROM shouldIslaptable`);
  let number = results.rows[0].slap; 
  number++ ;
  await db.query(`UPDATE shouldIslaptable SET slap=${number} WHERE id = 1`); 
  return res.json({message: 'updated successfully'});
});



app.get("/slap", async function (req, res, next) {
  const results = await db.query(`SELECT slap FROM shouldIslaptable`);
  let number = results.rows[0].slap; 
  if(number !== 0){
    number--;
    await db.query(`UPDATE shouldIslaptable SET slap=${number} WHERE id = 1`); 
  }
  return res.json(results.rows[0].slap);
});

app.get('/', function(req, res) {
  return res.send('hey');
});

app.listen(process.env.PORT, function () {
  console.log('App on port 3000');
});