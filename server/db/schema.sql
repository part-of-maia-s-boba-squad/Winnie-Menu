CREATE TABLE Restaurant
(
  id INT PRIMARY KEY,
  name TEXT,
  top_tags TEXT[],
  cuisine TEXT,
  review_count INT,
  res_info TEXT,
  join_id INT
);

  CREATE TABLE Menu
  (
    id INT PRIMARY KEY,
    menu_type TEXT,
    sub_menu TEXT,
    dish_name TEXT,
    dish_info TEXT,
    price INT,
    res_id INT REFERENCES Restaurant(id),
    join_id INT
  );

  CREATE TABLE Restaurant_Menu
  (
    id INT PRIMARY KEY,
    restaurant_id INT REFERENCES Restaurant(id),
    menu_id INT REFERENCES Menu(id)
  );
