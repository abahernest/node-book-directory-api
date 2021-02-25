const express = require ('express');
const router = express.Router();
const Sequel = require ('../models/sequel');
const mongoose = require ('mongoose');
const Authenticate = require ('../middleware/authentication');

//GET Route for /sequel
router.get ('/', async (req,res,next)=>{
    await Sequel.find({})
    .select("_id title")
    .exec()
    .then(docs =>{
        console.log("GET "+docs.length+" Sequel")
        res.status(200).json(docs)
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
  
});


//POST Route for /sequel
router.post ('/',Authenticate, async (req,res,next)=>{
    const sequel = new Sequel({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
    });
    await Sequel.findOne({title:sequel.title})
    .exec()
    .then(async doc=>{
            await sequel
            .save()
            .then(result =>{
                console.log(result);
                res.status(201).json({
                message: "New Sequel Added",
                sequel: {
                    _id:result._id,
                    title:result.title,
                },
            });
            })
            .catch(err => {
                if(err.code===11000){
                    return res.status(409).json({error: "MongoError: E1100 Sequel is not unique"})
                }else{
                    console.log(err);
                    res.status(500).json({error:err})
                }
                
            });
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
});


module.exports = router;