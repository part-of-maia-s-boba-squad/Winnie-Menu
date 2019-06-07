CREATE TABLE Restaurants (
  id INT PRIMARY KEY,
  res_name TEXT,
  top_tags TEXT,
  cuisine TEXT,
  review_count INT,
  res_info TEXT
);

CREATE TABLE Menu (
  id INT PRIMARY KEY,
  type TEXT
);

CREATE TABLE Dishes (
  id INT PRIMARY KEY,
  res_id INT,
  menu_id INT,
  dish_name TEXT,
  dish_info TEXT,
  price TEXT,
  subMenu_type TEXT,
  FOREIGN KEY (res_id) REFERENCES Restaurants(id),
  FOREIGN KEY (menu_id) REFERENCES Menu(id)
);
