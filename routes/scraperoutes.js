const express = require('express');
const router = express.Router();

const ScrapeRouteController = require("../controller/scrapeRouteController")

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

router.get('/scrape', ScrapeRouteController.getSelector)


router.post('/scrape', ScrapeRouteController.postSelector)


module.exports = router;