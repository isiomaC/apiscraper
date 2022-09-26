const express = require('express');
const router = express.Router();

const genericResponses = require('../utils/genericResponses')

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
router.get('/scrape', (req, res, next) => {

    try{
        console.log("Get - Testing")
        genericResponses.sendSuccess(res, {
            message: '',
            code: 200,
            success: true
        })
    }catch(e){
        genericResponses.sendError(res, e)
    }
})

// @route POST /projects
// @desc Post a project with preview images... imagelimit: 10
router.post('/scrape', (req, res, next) => {
    try{
        console.log("Post - Testing")
        genericResponses.sendSuccess(res, {
            message: '',
            code: 200,
            success: true
        })
    }catch(e){
        genericResponses.sendError(res, e)
    }
})


module.exports = router;