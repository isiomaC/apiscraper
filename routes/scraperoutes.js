const express = require('express');
const router = express.Router();

const genericResponses = require('../utils/genericResponses')

const ScrapeRouteController = require("../controller/scrapeRouteController")

// const { check } = require('express-validator');
// const { auth } =  require('../middleware/auth-service')

//Multer
// const multer = require('multer')
// const memStorgae = multer.memoryStorage()
// var upload = multer({storage: memStorgae, limits: {paths: 2, fieldSize: 6000000 , fields: 2, files: 10 }}).fields([{name:'previews'}])

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

// @route GET /projects
// @desc Get all projects..
router.get('/scrape', ScrapeRouteController.getSelector)

// @route POST /projects
// @desc Post a project with preview images... imagelimit: 10
router.post('/scrape', ScrapeRouteController.postSelector)


module.exports = router;