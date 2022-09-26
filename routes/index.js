const scrapeRoutes = require('./scraperoutes')

const wrapRoutes = (app) => {
    app.use('/api/v1', scrapeRoutes)
}

module.exports = wrapRoutes