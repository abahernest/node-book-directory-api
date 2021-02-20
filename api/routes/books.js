const express = require ('express');
const router = express.Router();
const Book = require ('../models/books');
const mongoose = require ('mongoose');
const Authenticate = require ('../middleware/authentication');

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
router.post ('/',Authenticate, async (req,res,next)=>{
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author
    });
    await Book.findOne({title:book.title,author:book.author})
    .exec()
    .then(async doc=>{
        if (doc===null){
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
        }else{
            return res.status(409).json({
                message: "Item already exist"
            })
        }
    })
    
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
router.put ('/:bookId',Authenticate, (req,res,next)=>{
    const id = req.params.bookId;
    const updateOptions = {};
    // const requestBody= Object.entries(req.body);
    for (const options of req.body){
        updateOptions[options.key]=options.value;
    }
    Book.findByIdAndUpdate({_id:id}, {$set: updateOptions},{new: true},(err,doc)=>{
            if (err){
                console.log("Invalid ID");
                return res.status(500).json({
                    message: "Invalid ID"
                });
            }
            if (doc){
                console.log("Updated Successfully");
                return res.status(200).json(doc);
            }
            else {
                console.log("ID not Found");
                return res.status(404).json({
                    message:"ID not Found"
                });
            }
        })
});

//Delete Route for /books/id
router.delete ('/:bookId',Authenticate, async (req,res,next)=>{
    const id = req.params.bookId
    await Book.findByIdAndRemove({_id:id})
    .exec()
    .then(book =>{
        if (book){
            console.log("Successfully Deleted")
            res.status(200).json( {
                message: "Book Deleted"
            } )
        }else{
            console.log("ID not Found");
            res.status(404).json({
                message:"No object with that ID"
            });
        }   
    })
    .catch(err=>{
        res.status(500).json({
            message:"Invalid ID"
        });
    });
});


module.exports = router;