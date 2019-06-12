const { Pool } = require('pg');

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'restaurant_menu',
  password: 'password',
  port: 5432,
});

pool.connect()

getResData = (q, cb) => pool.query(`select * from dishes inner join restaurants on dishes.res_id = restaurants.id and dishes.res_id = ${q}`, (err, result) => {
  if (err) {
    console.log('Error executing query', err.stack);
    cb(err.stack);
  } else {
    cb(null, result.rows);
  }
});

module.exports = {
  getResData
};