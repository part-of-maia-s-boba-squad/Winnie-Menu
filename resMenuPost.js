const Faker = require('faker');

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const postResMenu = (userContext, events, done) => {
  const newId = random(300000000, 400000000);
  const res_name = Faker.company.companyName();
  const top_tags = Faker.lorem.word();
  const cuisine = Faker.lorem.word();
  const review_count = random(200, 600);
  const res_info = Faker.lorem.sentence();

  const menu_id = random(1, 4);
  const dish_name = Faker.lorem.word();
  const dish_info = Faker.lorem.sentence();
  const price = random(5, 50).toFixed(2);
  const subMenu_type = Faker.lorem.word();

  userContext.vars.newId = newId;
  userContext.vars.res_name = res_name;
  userContext.vars.top_tags = top_tags;
  userContext.vars.cuisine = cuisine;
  userContext.vars.review_count = review_count;
  userContext.vars.res_info = res_info;
  userContext.vars.menu_id = menu_id;
  userContext.vars.dish_name = dish_name;
  userContext.vars.dish_info = dish_info;
  userContext.vars.price = price;
  userContext.vars.subMenu_type = subMenu_type;

  return done();
};

module.exports = {
  postResMenu
};