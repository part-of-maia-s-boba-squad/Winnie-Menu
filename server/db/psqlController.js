const { Pool } = require('pg');

const pool = new Pool({
  user: null,
  host: 'localhost',
  database: 'restaurant_menu',
  password: null,
  port: 5432,
});

pool.connect();

// select * from restaurants left join dishes on restaurants.id = dishes.res_id and restaurants.id = 10000005;

getResData = (q, cb) => pool.query(`select * from dishes inner join restaurants on dishes.res_id = restaurants.id and dishes.res_id = ${q}`, (err, result) => {
  if (err) {
    console.log('Error executing query', err.stack);
    cb(err.stack);
  } else {
    cb(null, result.rows);
  }
});

postResData = (cb) => pool.query("insert into restaurants (id, res_name, top_tags, cuisine, review_count, res_info) values (nextval('res_id_seq'), 'Kicking Crab', 'Casual', 'Cajun', '347', 'gdfgfdfgggfdegre hergregergregre erwhewhehew eewhtwhewk gfehjkerhgkj')", (err, result) => {
  if (err) {
    cb(err);
  } else {
    cb(null, result);
  }
});

updateResData = (q, cb) => pool.query(`update restaurants set res_name = 'Kinjo', cuisine = 'Japanese' where id = ${q}`, (err, result) => {
  if (err) {
    cb(err);
  } else {
    cb(null, result);
  }
});

deleteResData = (q, cb) => pool.query(`delete from restaurants where id = ${q}`, (err, result) => {
  if (err) {
    cb(err);
  } else {
    cb(null, result);
  }
});

// delete dishes, restaurants from dishes inner join restaurants on dishes.res_id = restaurants.id where restaurants.id = 10000006;

module.exports = {
  getResData,
  postResData,
  updateResData,
  deleteResData
};