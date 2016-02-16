const express = require('express');
const nunjucks = require('nunjucks');
const request = require('request');
const cheerio = require('cheerio');
const AERO_API_KEY = require('./config').api_key;

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.get('/', function(req, res){
  res.render('index.html');
});

app.get('/search_city/', function(req, res){
  const city = req.query.term;
  request(`https://airport.api.aero/airport/match/${city}?user_key=${AERO_API_KEY}`, function(error, response, body){
    if(!error && response.statusCode === 200){
      try{
        jsonResponse = JSON.parse(body.split('callback(')[1].split(')')[0]);
        var currentAirports = []
        var airports = jsonResponse.airports;
        for(var i = 0; i < airports.length; i++){
          var airportInfo = airports[i].code + ' - ' + airports[i].city + ' - ' + airports[i].country;
          currentAirports.push(airportInfo);
        }
      } catch(e){
        res.send([]);
      }
      res.send(currentAirports);
    }
  });
});

app.get('/:from/:where', function(req, res){
  const from = req.params.from;
  const where = req.params.where;
  request(`http://www.despegar.cl/vuelos/${from}/${where}/`, function(error, response, body){
    if(!error && response.statusCode === 200){
      const $ = cheerio.load(body);
      var prices = [];
      var pricesSelector = $('.fare-container .fare-detail .fare-price .item-price .price-currency.CLP .amount');
      if( pricesSelector.length == 0 ){
        res.send(body);
        return false;
      }
      pricesSelector.each(function(){
        prices.push($(this).html());
      });
      res.send(prices.join(' - '));
    }
    else{
      res.send(res.statusCode);
    }
  })
});

app.listen(port, function(){
  console.log('Node server running...');
});
