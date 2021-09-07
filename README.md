# Currency Scraper
A basic JavaScript/Node.js scraper of the Central Bank of Egypt currency and inflation rates.

## Project Detatils

The API can be checked [here!](https://cbe-scraper.vercel.app/exchange)

| Method | End Point | Description |
| :------------- | :------------- | :------------- |
| GET | /exchange | Returns a JSON array for all available CBE exchange rates for the current day |
| GET | /inflation  | Returns a JSON array for the inflation rates for the past 12 months added|
| GET | /average | Returns a JSON array for all the average exchange rates|

Shout-out to Cheerio.js library developers and [this great repository](https://github.com/Mohamed-Magid/Currency-Spidey) from which I used two helper functions!

