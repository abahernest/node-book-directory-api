const mongoose = require ('mongoose');


const bookSchema = mongoose.Schema ({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type:String, required:true,lowercase:true,trim:true},
    author: {type:String, required:true,lowercase:true,trim:true},
    sequel: {type:mongoose.Schema.Types.ObjectId, ref:'Sequel',default:'60371c8dd4eaa22d3c514851'}
});

module.exports = mongoose.model('Book',bookSchema);