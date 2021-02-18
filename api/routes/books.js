const express = require ('express');
const router = express.Router();
const Book = require ('../models/books');
const mongoose = require ('mongoose');

//GET Route for /books
router.get ('/', async (req,res,next)=>{
    await Book.find()
    .select("_id title author")
    .exec()
    .then(docs =>{
        console.log("GET "+docs.length+" BOOKS")
        res.status(200).json(docs)
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
  
});
//POST Route for /books
router.post ('/', async (req,res,next)=>{
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author
    });

    await book
    .save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
        message: "New Book Added",
        book: result,
    });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});

//GET Route for /books
router.get ('/:bookId', async (req,res,next)=>{
    const id = req.params.bookId
    await Book.findById(id)
    .select("_id title author")
    .exec()
    .then(doc=>{
        console.log(doc)
        if (doc){
            res.status(200).json(doc);
        }else {
            res.status(404).json({message: "No entry for provided ID"})
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err})
    });
 
});

//PUT Route for /books/id
router.put ('/:bookId', async (req,res,next)=>{
    const id = req.params.bookId;
    const updateOptions = {};
    // const requestBody= Object.entries(req.body);
    for (const options of req.body){
        updateOptions[options.key]=options.value;
    }
    await Book.updateOne({_id:id}, {$set: updateOptions})
    .exec()
    .then(result=>{
        console.log("Updated Successfully");
        res.status(200).json({
            message : "Updated Successfully"
        });
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        });
    });
});

//Delete Route for /books/id
router.delete ('/:bookId', async (req,res,next)=>{
    const id = req.params.bookId
    await Book.remove({_id:id})
    .exec()
    .then(result =>{
        console.log("Successfully Deleted")
        res.status(200).json( {
            message: "Book Deleted"
        } )
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
});


module.exports = router;