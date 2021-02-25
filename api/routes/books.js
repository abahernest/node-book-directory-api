const express = require ('express');
const router = express.Router();
const Book = require ('../models/books');
const mongoose = require ('mongoose');
const Authenticate = require ('../middleware/authentication');
const Sequel = require('../models/sequel');


//GET Route for /books
router.get ('/', async (req,res,next)=>{
    await Book.aggregate([{$lookup:{
            from:'sequels',
            localField:'sequel',
            foreignField:'_id',
            as : 'sequel'
    }},
    {$project: {title:1,author:1,'sequel._id':1,'sequel.title':1}}
    ])
    .exec()
    .then((docs)=>{
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
        author: req.body.author,
        sequel: req.body.sequel
    });
    
        await Sequel.findById(book.sequel)
        .exec()
        .then(async doc=>{
            if (doc===null){
                const message="Sequel ID not found"
                console.log(message);
                return res.status(404).json({message:message})
            }else{
                //validate book field data
                await Book.findOne({title:book.title,author:book.author})
                .exec()
                .then(async doc=>{
                    if (doc===null){
                        await book
                        .save()
                        .then(result =>{
                            console.log(result);
                            return res.status(201).json({
                            message: "New Book Added",
                            book: result,
                        });
                        })
                        .catch(err => {
                            console.log(err.message);
                            res.status(500).json({
                                error:err._message
                            })
                        });
                    }else{
                        return res.status(409).json({
                            message: "Item already exist"
                        })
                    }
                })
                .catch(err=>{
                    console.log("Error finding book")
                    return res.status(500).json({error:err._message})
                    
                });
            }
        })
        .catch(err=>{
            console.log("Error finding sequel id")
            return res.status(500).json({error:err._message})
        });

});

//GET Route for /books
router.get ('/:bookId',Authenticate, async (req,res,next)=>{
    const id = req.params.bookId

    await Book.findById(id).populate('sequel')
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
        console.log(err.message);
        res.status(500).json({error:err.message})
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
    Sequel.findById(updateOptions.sequel)
    .exec()
    .then(doc=>{
        if(doc===null){
            const message="sequel ID not found";
            console.log(message);
            return res.status(404).json({message:message});
        }else{
            Book.findByIdAndUpdate({_id:id}, {$set: updateOptions},{new: true},(err,doc)=>{
            if (err){
                console.log(err.message);
                return res.status(500).json({error:err.message});
            }
            if (doc){
                console.log("Updated Successfully");
                return res.status(200).json(doc);
            }
            else {
                console.log("Book ID not Found");
                return res.status(404).json({
                    message:"Book ID not Found"
                });
            }
        }).populate('sequel')    
        }
    })
    .catch(err=>{
        console.log("Error finding sequel id\n",err.message);
        return res.status(500).json({error:err.message})
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
        console.log(err.message)
        res.status(500).json({
            message:"Invalid ID"
        });
    });
});

router.delete ('/:bookId/sequel',Authenticate, (req,res,next)=>{
    const id = req.params.bookId
    Book.findByIdAndUpdate(id,{sequel:"60371c8dd4eaa22d3c514851"},{new:true},(err,doc)=>{
        if (err){
            console.log(err.message);
            return res.status(500).json({error:err.message});
        }
        else if (doc){
            console.log("Removed from Sequel");
            return res.status(200).json(doc);
        }
        else {
            console.log("ID not Found");
            return res.status(404).json({
                message:"ID not Found"
            });
        }
    }).populate('sequel')
})


module.exports = router;