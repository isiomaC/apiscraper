const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScrapeRequestSchema = new Schema({
    webUrl:{
        type: String
    },
    elementToSearch: {
        type: String
    },
    snapShot:[{
        type: String
    }],
    date:{
        type: Date,
        default: Date.now
    }
})

const ScrapeRequest = mongoose.model('ScrapeRequest', ScrapeRequestSchema);

module.exports = ScrapeRequest