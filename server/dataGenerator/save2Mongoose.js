const faker = require('faker');
const fs = require('fs');
const mongoose = require('mongoose'); // mongod --config /usr/local/etc/mongod.conf
mongoose.connect('mongodb://localhost/fetcher2');
var resDesData = require('./res44Tehama.js');
resDesData = resDesData[0].map((i) => {
  delete i.apiKey
  delete i.minFreeDelivery
  delete i.url
  delete i.API
  return i;
});
// TODO -- https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder
var resMenuData15 = require('./menu44Tehama15.js');
var resMenuData16 = require('./menu44Tehama16.js');
var resMenuData17 = require('./menu44Tehama17.js');
var resMenuData18 = require('./menu44Tehama18.js');
var resMenuData19 = require('./menu44Tehama19.js');
var resMenuData20 = require('./menu44Tehama20.js');
var resMenuData21 = require('./menu44Tehama21.js');
var resMenuData22 = require('./menu44Tehama22.js');
var resMenuData = [resMenuData15, resMenuData16, resMenuData17, resMenuData18, resMenuData19, resMenuData20, resMenuData21, resMenuData22].reduce((acc, curr) => {
  return acc.concat(curr);
}, [])
resMenuData = resMenuData.filter(i => i !== undefined)
for (let i = 0; i < resMenuData.length; i++) {
  for (let j = 0; j < resMenuData[i].length; j++) {
    delete resMenuData[i][j].apiKey;
    delete resMenuData[i][j].resAPI;
    for (let k = 0; k < resMenuData[i][j].items.length; k++) {
      delete resMenuData[i][j].items[k].apiKey;
    }
  }
}

function onInsert(err, docs) {
  if (err) {
    throw err;
  } else {
    console.info('%d restaurants were successfully stored.', docs.length);
  }
}

var menu = ['Lunch', 'Breakfast', 'Dinner', 'Seasonal Menu', 'Bar', 'Spring Menu', 'Winter Menu', 'Special', 'Today"s Special',
  'Late Night', 'Take Out', 'Brunch', 'Afternoon Tea', 'Happy Hour', 'Dessert']


var MenuSchema = mongoose.Schema({
  name: String,
  description: String,
  menus: [{
    name: String,
    description: String,
    items: [{
      name: String,
      description: String,
      basePrice: Number,
      modifiers: [{
        name: String,
        price: Number,
      }]
    }],
  }]
});

function menuSeed() {
  var items = Math.random() > 0.6 ? Math.floor(Math.random() * 5) + 1 : Math.floor(Math.random() * 3) + 1
  var arr = new Array(items).fill(0)
  return arr.map(i => {
    return {
      name: menu[Math.floor(Math.random() * menu.length)],
      description: Math.random() > 0.8 ? faker.lorem.sentence() : "",
      menus: resMenuData[Math.floor(Math.random() * resMenuData.length)]
    }
  })
}

function modifierSeed() {
  var items = Math.floor(Math.random() * 5) + 1
  var arr = new Array(items).fill(0)
  return arr.map(i => {
    return {
      name: faker.lorem.word(),
      price: Math.floor(Math.random() * 50) / 10
    }
  })
}

for (let i = 0; i < resMenuData.length; i++) {
  if (resMenuData[i] !== undefined) {
    for (let j = 0; j < resMenuData[i].length; j++) {
      for (let k = 0; k < resMenuData[i][j].items.length; k++) {
        var itemDes = resMenuData[i][j].items[k]["name"];
        itemDes = itemDes.substring(itemDes.indexOf(". ") + 1);
        itemDes = itemDes.substring(itemDes.indexOf(".") + 1);
        itemDes = itemDes.replace("[^a-zA-Z]", "");
        resMenuData[i][j].items[k]["name"] = itemDes;
        // if (i===0 && j===0) {
        //     console.log(resMenuData[i][j].items[k]["name"].replace("[^a-zA-Z]", ""))
        //  }
        if (Math.random() > 0.88) {
          resMenuData[i][j].items[k]['modifiers'] = modifierSeed();
          // console.log(i, j, k)
        }
      }
    }
  }
}

resDesData = resDesData.map((i, idx) => {
  i.resIndex = ((idx).toString().length < 3) ? new Array(3 - idx.toString().length).fill(0).join('') + idx.toString() :
    (idx).toString();
  i.menus = menuSeed();
  var foodPics = new Array(Math.floor(Math.random() * 10) + 1).fill(0);
  foodPics = foodPics.map(i => {
    var randomSize = Math.floor(Math.random() * 100);
    var Size = 300 + randomSize;
    return "http://lorempixel.com/" + Size + '/' + Size + "/food?"
  });
  i.foodUrl = foodPics;
  if (i.neighborhood === 'South of Market') {
    i.neighborhood = 'SoMa';
  }
  i.foodR = Math.floor(Math.random() * 50) / 10;
  i.serviceR = Math.floor(Math.random() * 50) / 10;
  i.decorR = Math.floor(Math.random() * 50) / 10;
  return i;
})

var RestaurantSchema = mongoose.Schema({
  apiKey: Number,
  logoUrl: String,
  name: String,
  streetAddress: String,
  city: String,
  state: String,
  zip: String,
  foodTypes: [String],
  phone: String,
  latitude: Number,
  longitude: Number,
  acceptsCash: Boolean,
  acceptsCard: Boolean,
  offersPickup: Boolean,
  offersDelivery: Boolean,
  isTestRestaurant: Boolean,
  minWaitTime: String,
  maxWaitTime: String,
  open: Boolean,
  url: String,
  hours: String,
  timezone: String,
  API: String,
  star: Number,
  reviewCount: Number,
  priceLevel: Number,
  cuisine: String,
  topTags: [String],
  description: String,
  diningStyle: String,
  website: String,
  paymentOptions: [String],
  dressCode: String,
  chef: String,
  catering: String,
  privatePartyContact: String,
  neighborhood: String,
  crossStreet: String,
  menus: [MenuSchema],
  foodUrl: [String]
});

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);
Restaurant.collection.insert(resDesData, onInsert);



