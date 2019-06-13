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

getResData = (q, cb) => {
  const id = [q];
  const text = 'select * from dishes inner join restaurants on dishes.res_id = restaurants.id and dishes.res_id = $1'

  pool.query(text, id, (err, result) => {
    if (err) {
      console.log('Error executing query', err.stack);
      cb(err.stack);
    } else {
      cb(null, result.rows);
    }
  });
};

postResData = (cb) => {
  const values = ['Winnie Boba Shop', 'Casual', 'Drinks', '400', 'Delicious honey boba made fresh daily with high quality tea brewed', 1, 'Milk Tea', 'black or green tea with fresh milk', '5.00', 'Snacc'];

  const postQuery = `with new_res as (insert into restaurants (id, res_name, top_tags, cuisine, review_count, res_info) values (nextval('res_id_seq'), $1, $2, $3, $4, $5) returning id)
  insert into dishes (id, res_id, menu_id, dish_name, dish_info, price, subMenu_type) values (nextval('dishes_id_seq'), (select id from new_res), $6, $7, $8, $9, $10)`;

  pool.query(postQuery, values, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result);
    }
  });
};

updateResData = (q, cb) => {
  const values = ['Boba Guys', 'Drinks', q];
  const text = 'update restaurants set res_name = $1, cuisine = $2 where id = $3';
  pool.query(text, values, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result);
    }
  });
};

deleteResData = (q, cb) => {
  const resId = [q];
  const text = `with delete_res as (
    delete from restaurants where id = $1 returning id)
    delete from dishes where res_id = (select id from delete_res)`;

  pool.query(text, resId, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result);
    }
  });
};

module.exports = {
  getResData,
  postResData,
  updateResData,
  deleteResData
};