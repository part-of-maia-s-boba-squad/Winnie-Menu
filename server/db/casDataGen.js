const fs = require('fs');
const faker = require('faker');

const topTags = ['Good For A Date', 'Special Occasion', 'Authentic', 'Most Festive', 'Most Romantic', 'Great For Brunch', 'Casual', 'Neighborhood Gem', 'Great for Infants', 'Great for Groups', 'Fit For Foodies', 'Hole in the Wall', 'Tasting Menu', 'Quiet Conversation', 'Fancy'];

const cuisines = ['Chinese', 'Mexican', 'Italian', 'Mediterranean', 'Japanese', 'Korean', 'Fast Food', 'French', 'Indian', 'American', 'Asian Fusion', 'BBQ'];

const menuTypes = ['Breakfast', 'Lunch', 'Dinner', 'Happy Hour'];

const subMenu = ['Appetizers', 'Lunch', 'Dinner', 'Brunch', 'Dessert', 'Drinks', 'Sides'];

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const resNameArr = [];
const resInfoArr = [];
const dishesInfoArr = [];
const dishesName = [];
for (let i = 0; i < 1000; i++) {
  resNameArr.push(faker.company.companyName());
  resInfoArr.push(faker.lorem.sentence());
  dishesInfoArr.push(faker.lorem.sentence());
  dishesName.push(faker.lorem.words());
}

const dishGenerator = () => {
  let dish = {};
  for (let dishes = 0; dishes <= random(10, 20); dishes++) {
    dish[[dishesName[Math.floor(Math.random() * dishesName.length)]]] = {
      price: Number(random(5, 50).toFixed(2)),
      dish_info: dishesInfoArr[Math.floor(Math.random() * dishesInfoArr.length)]
    };
  }
  return dish;
};

const menuGenerator = () => {
  let result = {};
  for (let menuCount = 1; menuCount <= random(1, 4); menuCount++) {
    let menuType = '';

    if (menuCount === 1) {
      menuType = menuTypes[0];
    } else if (menuCount === 2) {
      menuType = menuTypes[1];
    } else if (menuCount === 3) {
      menuType = menuTypes[2];
    } else if (menuCount === 4) {
      menuType = menuTypes[3];
    }

    result[[menuType]] = {
      [subMenu[Math.floor(Math.random() * subMenu.length)]]: dishGenerator()
    }
  }
  return JSON.stringify(result);
};

const resData = async (limit) => {
  const writer = fs.createWriteStream('cqlshResData.csv');
  let count = 1;

  writer.write('id' + '|' + 'cuisine' + '|' + 'menus' + '|' + 'res_info' + '|' + 'res_name' + '|' + 'review_count' + '|' + 'top_tags' + '\n');

  for (let i = 1; i <= limit; i++) {
    if (i === limit) {
      const ableToWrite = writer.write(
        count++ + '|' + cuisines[Math.floor(Math.random() * cuisines.length)] + '|' + menuGenerator() + '|' + resInfoArr[Math.floor(Math.random() * resInfoArr.length)] + '|' + resNameArr[Math.floor(Math.random() * resNameArr.length)] + '|' + Math.floor(Math.random() * 600).toString() + '|' + topTags[Math.floor(Math.random() * topTags.length)]
      );

      if (!ableToWrite) {
        await new Promise(resolve => {
          writer.once('drain', resolve);
        });
      }
    } else {
      const ableToWrite = writer.write(
        count++ + '|' + cuisines[Math.floor(Math.random() * cuisines.length)] + '|' + menuGenerator() + '|' + resInfoArr[Math.floor(Math.random() * resInfoArr.length)] + '|' + resNameArr[Math.floor(Math.random() * resNameArr.length)] + '|' + Math.floor(Math.random() * 600).toString() + '|' + topTags[Math.floor(Math.random() * topTags.length)] + '\n'
      );

      if (!ableToWrite) {
        await new Promise(resolve => {
          writer.once('drain', resolve);
        });
      }
    }
  }
  writer.end();
};

resData(10000000);

// CREATE TABLE restaurants(
//   id INT PRIMARY KEY,
//   cuisine TEXT,
//   menus TEXT,
//   res_info TEXT,
//   res_name TEXT,
//   review_count TEXT,
//   top_tags TEXT
// );

// CREATE TABLE restaurants(
//   id INT PRIMARY KEY,
//   res_name TEXT,
//   top_tags TEXT,
//   cuisine TEXT,
//   review_count TEXT,
//   res_info TEXT,
//   menus SET<FROZEN <SET <TEXT>>>
// );

// CREATE TABLE restaurants(
//   id INT PRIMARY KEY,
//   res_name TEXT,
//   top_tags TEXT,
//   cuisine TEXT,
//   review_count TEXT,
//   res_info TEXT,
//   menus TEXT
// );

// CREATE TYPE menu(
//   menu_type SET <FROZEN <dishes>>
// );

// CREATE TYPE dishes(
//   dish SET <FROZEN <dish>>
// );

// CREATE TYPE dish(
//   id INT,
//   dish_name TEXT,
//   dish_info TEXT,
//   price TEXT
// );

// CREATE KEYSPACE restaurant_menu WITH REPLICATION = {
//    'class' : 'SimpleStrategy',
//    'replication_factor' : 1
//   };

// COPY restaurants (id, cuisine, menus, res_info, res_name, review_count, top_tags) FROM 'cqlshResData.csv' with header=true and delimiter ='|' and MINBATCHSIZE = 1 and MAXBATCHSIZE = 1;