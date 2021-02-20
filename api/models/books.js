const mongoose = require ('mongoose');

const bookSchema = mongoose.Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type:String, required:true,lowercase:true},
    author: {type:String, required:true,lowercase:true},
});

module.exports = mongoose.model('Book',bookSchema);