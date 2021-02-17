const express = require ('express');
const router = express.Router();

router.get ('/', (req,res,next)=>{
    res.status(200).json({
        message: "GET books"
    });
});
//POST Route for /books
router.post ('/', (req,res,next)=>{
    const book = {
        title: req.body.title,
        author: req.body.author
    }
    res.status(200).json({
        message: "POST books",
        createdBook: book,
    });
});

//GET Route for /books
router.get ('/:bookId', (req,res,next)=>{
    const id = req.params.bookId
    res.status(200).json({
        message: "GET book by ID",
        id:id
    });
});

//PUT Route for /books/id
router.put ('/:bookId', (req,res,next)=>{
    const book = {
        title: req.body.title,
        author: req.body.author
    }
    const id = req.params.bookId
    res.status(200).json({
        message: "PUT books by ID",
        id: id,
        updatedBook: book
    });
});

//Delete Route for /books/id
router.delete ('/:bookId', (req,res,next)=>{
    const id = req.params.bookId
    res.status(200).json({
        message: "DELETE books by ID",
        id: id
    });
});


module.exports = router;