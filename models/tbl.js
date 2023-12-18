const mongoose = require('mongoose');

const crudSchema = mongoose.Schema({
    name: {
        type: 'string',
        require: true,
    },
    publishedyear: {
        type: 'string',
        require: true,
    },
    authorname: {
        type: 'string',
        require: true,
    },
    bookpages: {
        type: 'string',
        require: true,
    },
    price: {
        type: 'string',
        require: true,
    }
})
const booktbl = mongoose.model('crud', crudSchema);
module.exports = booktbl;