CREATE TABLE Restaurants (
  id INT PRIMARY KEY,
  name TEXT,
  top_tags TEXT[],
  cuisine TEXT,
  review_count INT,
  res_info TEXT,
  join_id INT
);

CREATE TABLE Menu (
  id INT PRIMARY KEY,
  type TEXT,
  join_id INT
);

CREATE TABLE Dishes (
  id INT PRIMARY KEY,
  res_id INT REFERENCES Restaurant(id),
  menu_id INT REFERENCES Menu(id),
  dish_name TEXT,
  dish_info TEXT,
  price INT,
  subMenu_type TEXT
);
