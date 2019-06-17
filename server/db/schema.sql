CREATE TABLE Restaurants
(
  id INT PRIMARY KEY,
  res_name TEXT,
  top_tags TEXT,
  cuisine TEXT,
  review_count TEXT,
  res_info TEXT
);

CREATE TABLE Menu
(
  id INT PRIMARY KEY,
  type TEXT
);

CREATE TABLE Dishes
(
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

-- COPY Restaurants (id, res_name, top_tags, cuisine, review_count, res_info) FROM '/home/ec2-user/psqlResData.csv' DELIMITER ',' CSV HEADER;

-- scp -i psql-resDishes.pem /Users/winnie/Documents/hrsf116/textDetails_module/data/psqlDishesData.csv ec2-user@ec2-100-24-31-219.compute-1.amazonaws.com:~/

-- COPY Dishes (id, res_id, menu_id, dish_name, dish_info, price, subMenu_type) FROM '/home/ec2-user/psqlDishesData.csv' DELIMITER ',' CSV HEADER;

-- COPY Menu (id, type) FROM '/home/ec2-user/psqlMenuData.csv' DELIMITER ',' CSV HEADER;

-- scp -i psql-resDishes.pem /Users/winnie/Documents/hrsf116/textDetails_module/data/psqlMenuData.csv ec2-user@ec2-100-24-31-219.compute-1.amazonaws.com:~/