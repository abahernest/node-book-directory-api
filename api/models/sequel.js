const mongoose = require ('mongoose');

const sequelSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type:String,required:true,lowercase:true, unique:true,trim:true}
})

module.exports = mongoose.model('Sequel',sequelSchema)