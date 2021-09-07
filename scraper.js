const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { getCurrID, toFloat } = require('./helpers/purifiers');


const exchangeRateUrl = 'https://www.cbe.org.eg/en/EconomicResearch/Statistics/Pages/OfficialRatesListing.aspx';
const inflationRateUrl = 'https://www.cbe.org.eg/en/MonetaryPolicy/Pages/Inflation.aspx';
const averageRateUrl = 'https://www.cbe.org.eg/en/EconomicResearch/Statistics/Pages/ExchangeRatesListing.aspx';


//var exchangeCache = {};
//var averageCache = {};  
//var inflationCache = {};

function exchangeRate() { 
//   if(exchangeCache[exchangeToday]){
//     console.log("serving from cache");
//     return Promise.resolve(exchangeCache[exchangeToday]);
//   }

  return fetch(`${exchangeRateUrl}`)
  .then(response => response.text())
  .then(body => {
    const $ = cheerio.load(body);
    const date = $('.inner-content-inner h2').text().match(/\d+\/\d+\/\d+/)[0];
    const rates = [];

    $('.table tbody tr').each((i, element) => {
      const rate = {
          currencyID: getCurrID($(element).find('td:nth-of-type(1)').text()),
          buy: toFloat($(element).find('td:nth-of-type(2)').text()),
          sell: toFloat($(element).find('td:nth-of-type(3)').text())
      };

      rates.push(rate);

    });

    return rates;
  })
}


function averageRate() {
  return fetch(`${averageRateUrl}`)
  .then(response => response.text())
  .then(body => {
    const $ = cheerio.load(body);
    const rates = [];
    const date = $('span.date').text();

    $('.table tbody tr').each((i, element) => {
      const rate = {
          currencyID: getCurrID($(element).find('td:nth-of-type(1)').text()),
          buy: toFloat($(element).find('td:nth-of-type(2)').text()),
          sell: toFloat($(element).find('td:nth-of-type(3)').text())
      };

      rates.push(rate);
    });
    
    return(rates);
  })
}


function inflationRate() {
  return fetch(`${inflationRateUrl}`)
  .then(response => response.text())
  .then(body => {
    const $ = cheerio.load(body);
    const rates = [];

    $('.chart-values ul li').each((i, element) => {
      const rate = {
          month: $(element).find('span.month').text(),
          core: toFloat($(element).find('span.core').text()),
          headline: toFloat($(element).find('span.headline').text())
      };

      rates.push(rate);

    });
    
    return rates;   
  })
}

module.exports = {
  exchangeRate,
  inflationRate,
  averageRate
};
