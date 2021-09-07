const express = require ('express'); 
const cors = require('cors');
const scraper = require('./scraper');

const app = express();

app.use(cors());
app.get('/', (req, res) => {
    res.json({
        message : 'Scrapping is Fun!'
    });
});


app.get('/exchange', (req, res) => {
    scraper
        .exchangeRate()
        .then(rates => {
            res.json(rates);
        });
});


app.get('/inflation', (req, res) => {
    scraper
        .inflationRate()
        .then(rates => {
            res.json(rates);
        });
});


app.get('/average', (req, res) => {
    scraper
        .averageRate()
        .then(rates => {
            res.json(rates);
        });

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);

});
