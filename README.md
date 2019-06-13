# Open Grub

> A user can search for a restaurant based on location, cuisine, or restaurant’s name and visit the restaurant’s page to get an overview of what the restaurant has to offer like photos of their dishes, their menu options, customers’ reviews, and be able to make a reservation.

## Related Projects

  - Reservation: https://github.com/part-of-maia-s-boba-squad/reservations_module
  - Restaurant Info & Menu: https://github.com/part-of-maia-s-boba-squad/Winnie-Menu
  - Restaurant Photos: https://github.com/part-of-maia-s-boba-squad/Photos
  - Reviews: https://github.com/part-of-maia-s-boba-squad/reviews_service

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#Development)
1. [Usage](#Usage)

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

Seeding Database:
  - For Postgres: `npm run psqlDataGen`
    1. Start Postgres: `brew services start postgres`
    3. If database restaurant_menu exists: `dropdb restaurant_menu`
    2. Run the following commands:
        ```sh
        createdb restaurant_menu
        $ psql restaurant_menu
        ```
    3. Run the schema file: `restaurant_menu=# \i server/db/schema.sql`
    4. Check out tables: `restaurant_menu=# \dt`
    5. Run seed:
        ```sh
        \COPY Menu (id, type) FROM 'psqlMenuData.csv' DELIMITER ',' CSV HEADER;

        \COPY Restaurants (id, res_name, top_tags, cuisine, review_count, res_info) FROM 'psqlResData.csv' DELIMITER ',' CSV HEADER;

        \COPY Dishes (id, res_id, menu_id, dish_name, dish_info, price, subMenu_type) FROM 'psqlDishesData.csv' DELIMITER ',' CSV HEADER;

        CREATE INDEX res_id_index ON dishes(res_id);

        CREATE INDEX menu_id_index ON dishes(menu_id);

        SELECT MAX(id)+1 FROM restaurants;
        - Change MINVALUE to above output's number
        CREATE SEQUENCE res_id_seq MINVALUE 10000001;
        ALTER TABLE restaurants ALTER id SET DEFAULT nextval('res_id_seq');
        ALTER SEQUENCE res_id_seq OWNED BY restaurants.id;

        SELECT MAX(id)+1 FROM menu;
        -- Change MINVALUE to above output's number
        CREATE SEQUENCE menu_id_seq MINVALUE 5;
        ALTER TABLE menu ALTER id SET DEFAULT nextval('menu_id_seq');
        ALTER SEQUENCE menu_id_seq OWNED BY menu.id;

        SELECT MAX(id)+1 FROM dishes;
        -- Change MINVALUE to above output's number
        CREATE SEQUENCE dishes_id_seq MINVALUE 285160524;
        ALTER TABLE dishes ALTER id SET DEFAULT nextval('dishes_id_seq');
        ALTER SEQUENCE dishes_id_seq OWNED BY dishes.id;

        -If Sequence already exists but is off...
        ALTER SEQUENCE START and RESTART to match max
        ALTER SEQUENCE res_id_seq RESTART WITH 10000001;
        ```
    6. Check tables if seeded successfully:

        Choose an id from 1 - 10 million for restaurants and dishes, id 1 - 4 for menus
        ```sh
        $ psql restaurant_menu
        restaurant_menu=# select * from restaurants where id = 1;
        restaurant_menu=# select * from menu where id = 1;
        restaurant_menu=# select * from dishes where id = 1;
        ```

  - For Cassandra: `npm run casDataGen`
    1. Start Cassandra in terminal: `cqlsh`
    2. If keyspace restaurant_menu exists: `DROP KEYSPACE restaurant_menu`
    3. Run the following commands:
        ```sh
        CREATE KEYSPACE restaurant_menu WITH REPLICATION = {
          'class' : 'SimpleStrategy',
          'replication_factor' : 1
        };

        USE restaurant_menu;

        CREATE TABLE restaurants(
          id INT PRIMARY KEY,
          cuisine TEXT,
          menus TEXT,
          res_info TEXT,
          res_name TEXT,
          review_count TEXT,
          top_tags TEXT
        );

        COPY restaurants (id, cuisine, menus, res_info, res_name, review_count, top_tags) FROM 'cqlshResData.csv' with header=true and delimiter ='|' and MINBATCHSIZE = 1 and MAXBATCHSIZE = 1;
        ```
    4. Check if restaurants table has seeded successfully:

        Choose an id from 1 - 10 million
        ```sh
        SELECT * FROM restaurants WHERE id = 1;
        ```

## API CRUD:

| Endpoints            | Type   | Input                                | Output                               | Description                   |
| -------------------- |------| ------------------------------------| ------------------------------------| -----------------------------|
| /API/restaurant/:id  | GET    | restaurant id                        | object of menu and restaurant info; status code: 200 | Gets restaurant info and menu |
| /API/restaurant/     | POST   | object of menu and restaurant info | status code: 201                     | Create a restaurant document  |
| /API/restaurant/:id  | PUT    | restaurant id                        | status code: 200                     | Update a restaurant document  |
| /API/restaurant/:id  | DELETE | restaurant id                        | status code: 200                     | Delete a restaurant document  |

### Usage

From within the root directory:

```sh
npm install
npm run react-dev
npm start
```
In a browser, go to localhost:3003/restaurant/100
- 100 is min and can go to max of 478
