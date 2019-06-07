const fs = require('fs');
const faker = require('faker');
const csvWriter = require('csv-write-stream');

const topTags = ['Good For A Date', 'Special Occasion', 'Authentic', 'Most Festive', 'Most Romantic', 'Great For Brunch', 'Casual', 'Neighborhood Gem', 'Great for Infants', 'Great for Groups', 'Fit For Foodies', 'Hole in the Wall', 'Tasting Menu', 'Quiet Conversation', 'Fancy'];

const cuisines = ['Chinese', 'Mexican', 'Italian', 'Mediterranean', 'Japanese', 'Korean', 'Fast Food', 'French', 'Indian', 'American', 'Asian Fusion', 'BBQ'];

const resNameArr = [];
for (let i = 0; i < 1000; i++) {
  resNameArr.push(faker.company.companyName());
}

const resInfoArr = [];
for (let j = 0; j < 1000; j++) {
  resInfoArr.push(faker.lorem.paragraphs());
}

const resData = async (limit) => {
  const writer = csvWriter();
  writer.pipe(fs.createWriteStream('psqlResData.csv'));
  for (let i = 1; i <= limit; i++) {
    const ableToWrite = writer.write({
      id: i,
      res_name: resNameArr[Math.floor(Math.random() * resNameArr.length)],
      top_tags: topTags[Math.floor(Math.random() * topTags.length)],
      cuisine: cuisines[Math.floor(Math.random() * cuisines.length)],
      review_count: Math.floor(Math.random() * 600),
      res_info: resInfoArr[Math.floor(Math.random() * resInfoArr.length)]
    });

    if (!ableToWrite) {
      await new Promise(resolve => {
        writer.once('drain', resolve);
      });
    }
  }
  writer.end();
};

const menuTypes = ['Breakfast', 'Lunch', 'Dinner', 'Happy Hour'];

const menuData = () => {
  const writer = csvWriter();
  writer.pipe(fs.createWriteStream('psqlMenuData.csv'));
  let counter = 1;
  for (let i = 0; i < menuTypes.length; i++) {
    writer.write({
      id: counter++,
      type: menuTypes[i]
    });
  }
  writer.end();
}

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const dishesInfoArr = [];
for (let k = 0; k < 1000; k++) {
  dishesInfoArr.push(faker.lorem.sentence());
}

const dishesName = [];
for (let l = 0; l < 1000; l++) {
  dishesName.push(faker.lorem.words());
}

const subMenu = ['Appetizers', 'Lunch', 'Dinner', 'Brunch', 'Dessert', 'Soup & Salad', 'Sandwiches', 'Noodles', 'Rice', 'Drinks', 'Sides'];

const dishesData = async (limit) => {
  const writer = csvWriter();
  let count = 1;
  writer.pipe(fs.createWriteStream('psqlDishesData.csv'));

  for (let dishes = 0; dishes < Math.floor(Math.random() * dishes) + 1; dishes++) {
    for (let i = 1; i <= limit; i++) {
      for (let menuCount = 1; menuCount <= random(1, 4); menuCount++) {
        for (let dishes = 0; dishes < random(10, 20); dishes++) {
          const ableToWrite = writer.write({
            id: count++,
            res_id: i,
            menu_id: menuCount,
            dish_name: dishesName[Math.floor(Math.random() * dishesName.length)],
            dish_info: dishesInfoArr[Math.floor(Math.random() * dishesInfoArr.length)],
            price: random(5, 50).toFixed(2),
            subMenu_type: subMenu[Math.floor(Math.random() * subMenu.length)],
          });

          if (!ableToWrite) {
            await new Promise(resolve => {
              writer.once('drain', resolve);
            });
          }
        }
      }
    }
  }

  writer.end();
}

resData(10000000);
menuData();
dishesData(10000000);