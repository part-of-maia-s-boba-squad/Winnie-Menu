const request = require('request');
const Promise = require('bluebird');
const fs = require('fs');


// change batch Number 
var batchN = 20;

function add2Restaurant(data) {
  var restaruantList = [];
  data = data["restaurants"];
  for (let i = 0; i < data.length; i++) {
    var apiKey = data[i]["apiKey"];
    restaruantList.push(apiKey);
  }
  return restaruantList;
}


// #########
// #  options // https://developers.eatstreet.com/endpoint/restaurant-menu
// ########
var options = {
  url: 'https://eatstreet.com/publicapi/v1/restaurant/search?method=both&pickup-radius=50&street-address=44+Tehama+St,+San+Francisco,+SF,+CA',
  headers: {
    'User-Agent': 'request',
    'X-Access-Token': '986bf3d501c24722'
  }
};

var optionsMENU = function (apiKey) {
  return {
    url: 'https://eatstreet.com/publicapi/v1/restaurant/' + apiKey.toString() + '/menu?includeCustomizations=false',
    headers: {
      'User-Agent': 'request',
      'X-Access-Token': '986bf3d501c24722'
    }
  };
}

// sleeper function https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function getAPI(error, response, data) {
  if (!error && response.statusCode == 200) {
    try {
      data = JSON.parse(data);
      console.log(data)

      var restaruantList = add2Restaurant(data);
      fs.writeFile('res44Tehama' + batchN + '.js', 'var resData =  ', (err, success) => {
        if (err) {
          throw err;
        } else {
          fs.appendFile('res44Tehama' + batchN + '.js', JSON.stringify(data["restaurants"]), function (err) {
            if (err) throw err;
            fs.appendFile('res44Tehama' + batchN + '.js', '; module.exports = resData', function (err) {
              if (err) throw err;
            })
          });
        }
      });
      console.log('finished saving')

      var menuPromise = [];
      for (let j = batchN * 10; j < batchN * 10 + 10; j++) {
        sleep(200);
        // console.log('hi')
        var apiKey = restaruantList[j];
        var callback = function (resolve, reject, apiKey) {
          return (error, response, data) => {
            if (!error) {
              resolve([data, apiKey]);
            } else {
              reject(error);
            }
          }
        }

        var p = new Promise((resolve, reject) => {
          request.get(optionsMENU(apiKey), callback(resolve, reject, apiKey));
        }).then((arr) => {
          var apiKey = arr[1];
          var data = arr[0];
          data = JSON.parse(data);
          console.log(Array.isArray(data));
          // data is an array 
          for (let j = 0; j < data.length; j++) {
            data[j]['resAPI'] = apiKey;
          }
          return JSON.stringify(data);
        })
        menuPromise.push(p);
      }
      console.log('whattttt')
      Promise.all(menuPromise).then(data2 => {
        // fs.writeFile('menus44Tehama.json', data);
        fs.writeFile('menu44Tehama' + batchN + '.js', 'var menuData = [ ', (err, success) => {
          if (err) {
            throw err;
          } else {
            fs.appendFile('menu44Tehama' + batchN + '.js', data2, function (err) {
              if (err) throw err;
              fs.appendFile('menu44Tehama' + batchN + '.js', ']; module.exports = menuData', function (err) {
                if (err) throw err;
              })
            });
          }
        });
      }).catch(e => { console.log(e) });
    } catch (err) {
      throw err;
    }
  }
}

request.get(options, getAPI);