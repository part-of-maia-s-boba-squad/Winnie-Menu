const fs = require('fs');
const faker = require('faker');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

const topTags = ['Good For A Date', 'Special Occasion', 'Authentic', 'Most Festive', 'Most Romantic', 'Great For Brunch',
  'Casual', 'Neighborhood Gem', 'Great for Infant', 'Great for Group', 'Fit For Foodies', 'Hole in the Wall',
  'Tasting Menu', 'Quiet Conversation'
];

const cuisines = ['Chinese', 'Mexican', 'Italian', 'Mediterranean', 'Japanese', 'Korean', 'Fast Food', 'French', 'Indian'];

const dataGen = () => {
  writer.pipe(fs.createWriteStream('data.csv'));
  for (var i = 1; i <= 10000; i++) {
    writer.write({
      id: i,
      res_name: faker.company.companyName(),
      top_tags: topTags.filter((tag) => Math.random() < 0.13),
      cuisine: cuisines[Math.floor(Math.random() * cuisines.length)],
      review_count: Math.floor(Math.random() * 600),
      res_info: faker.lorem.paragraphs()
    });
  }
};

dataGen();