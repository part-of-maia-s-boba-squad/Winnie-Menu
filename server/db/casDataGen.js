// CREATE TABLE Restaurants (
//   id INT,
//   res_name TEXT,
//   top_tags TEXT,
//   cuisine TEXT,
//   review_count TEXT,
//   menus SET<FROZEN <SET <SET <SET <TEXT>>>>>,
//   PRIMARY KEY ((res_name), id)
// );

// menus SET <FROZEN <SET <SET <SET <TEXT>>>>>,
// PRIMARY KEY ((menus, res_name), id)

const fs = require('fs');
const faker = require('faker');
const csvWriter = require('csv-write-stream');
const zlib = require('zlib');

const topTags = ['Good For A Date', 'Special Occasion', 'Authentic', 'Most Festive', 'Most Romantic', 'Great For Brunch', 'Casual', 'Neighborhood Gem', 'Great for Infants', 'Great for Groups', 'Fit For Foodies', 'Hole in the Wall', 'Tasting Menu', 'Quiet Conversation', 'Fancy'];

const cuisines = ['Chinese', 'Mexican', 'Italian', 'Mediterranean', 'Japanese', 'Korean', 'Fast Food', 'French', 'Indian', 'American', 'Asian Fusion', 'BBQ'];

const menuTypes = ['Breakfast', 'Lunch', 'Dinner', 'Happy Hour'];

const subMenu = ['Appetizers', 'Lunch', 'Dinner', 'Brunch', 'Dessert', 'Drinks', 'Sides'];

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const resNameArr = [];
for (let i = 0; i < 1000; i++) {
  resNameArr.push(faker.company.companyName());
}

const resInfoArr = [];
for (let j = 0; j < 1000; j++) {
  resInfoArr.push(faker.lorem.paragraphs());
}

const dishesInfoArr = [];
for (let k = 0; k < 1000; k++) {
  dishesInfoArr.push(faker.lorem.sentence());
}

const dishesName = [];
for (let l = 0; l < 1000; l++) {
  dishesName.push(faker.lorem.words());
}

const resData = async (limit) => {
  const writer = csvWriter()
};

resData(5);