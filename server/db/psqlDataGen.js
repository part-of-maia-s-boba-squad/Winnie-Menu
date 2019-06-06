const fs = require('fs');
const faker = require('faker');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

const topTags = ['Good For A Date', 'Special Occasion', 'Authentic', 'Most Festive', 'Most Romantic', 'Great For Brunch', 'Casual', 'Neighborhood Gem', 'Great for Infant', 'Great for Group', 'Fit For Foodies', 'Hole in the Wall', 'Tasting Menu', 'Quiet Conversation'];

const cuisines = ['Chinese', 'Mexican', 'Italian', 'Mediterranean', 'Japanese', 'Korean', 'Fast Food', 'French', 'Indian'];

const resNameArr = [];
for (var i = 0; i < 1000; i++) {
  resNameArr.push(faker.company.companyName());
}

const resInfoArr = [];
for (var i = 0; i < 1000; i++) {
  resInfoArr.push(faker.lorem.paragraphs());
}

// const resData = async (limit) => {
//   writer.pipe(fs.createWriteStream('pslResData.csv'));
//   for (let i = 1; i <= limit; i++) {
//     const ableToWrite = writer.write({
//       id: i,
//       res_name: resNameArr[Math.floor(Math.random() * resNameArr.length)],
//       top_tags: topTags.filter((tag) => Math.random() < 0.13),
//       cuisine: cuisines[Math.floor(Math.random() * cuisines.length)],
//       review_count: Math.floor(Math.random() * 600),
//       res_info: resInfoArr[Math.floor(Math.random() * resInfoArr.length)]
//     });

//     if (!ableToWrite) {
//       await new Promise(resolve => {
//         writer.once('drain', resolve);
//       });
//     }
//   }
//   writer.end();
// };

// resData(10000000);

const menuTypes = ['Breakfast', 'Lunch', 'Dinner', 'Happy Hour'];

const menuData = async () => {
  writer.pipe(fs.createWriteStream('pslMenuData.csv'));
  let counter = 1;
  for (let i = 0; i < menuTypes.length; i++) {
    writer.write({
      id: counter++,
      type: menuTypes[i]
    });
  }
  writer.end();
}

menuData();