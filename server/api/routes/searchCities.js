const express = require('express');
const router = express.Router();
const winston = require('../../config/winston');
const citiesFile = require('../../data/cities.json');
const Fuse = require('fuse.js');

const options = {
    shouldSort: true,
    tokenize: true,
    includeScore: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        "name",
    ]
};

router.get('/', (req, res, next) => {
    let search = Object.values(req.query);
    let resultsPerResponse = req.query.options
    const fuse = new Fuse(citiesFile, options)
    const result = fuse.search(search[0])
    new Promise((resolve, reject) => { //create a promise to resolve async
        const topResults = result.slice(0,resultsPerResponse)
        resolve(topResults)
    }).then(resp => {
        return (res.status(200).json({
            suggestions: resp.map(i => {
                return ({
                    name: `${i.item.name}, ${i.item.subcountry}, ${i.item.country}`,
                    score: Number((i.score).toFixed(3))
                })
            }),
        }))
    }).catch(error => {
        winston.error((`${error.code} - ${error.message}`)) //log the errors to winston
        res.status(500).json({
            error: error
        })
    })
});

module.exports = router;