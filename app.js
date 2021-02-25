const express = require ('express');
const app = express();
const bookRoutes = require ('./api/routes/books');
const userRoutes = require ('./api/routes/user');
const sequelRoutes = require ('./api/routes/sequel');
const morgan = require ('morgan');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose')


//CONNECT DATABASE
mongoose.connect ("mongodb+srv://abahernest:"+
process.env.MONGO_ATLAS_PASSWORD+
"@node-book-directory.fqqmu.mongodb.net/test", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,useCreateIndex:true});


//MIDDLEWARE
app.use (morgan('dev'));
app.use (bodyParser.urlencoded({extended:false}));
app.use (bodyParser.json());
app.use ((req,res,next)=>{
    res.header ("Access-Control-Allow-Origin","*");
    res.header (
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With, Content-Type, Accept, Authorization",
    );
    if (req.method === 'OPTIONS') {
        res.header ('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//ROUTES
app.use ('/books',bookRoutes);
app.use ('/users',userRoutes);
app.use ('/sequel',sequelRoutes);


//ERROR HANDLERS
app.use ((req,res,next)=>{
    const error = new Error('Not found');
    error.status =404;
    next(error);
});
app.use ((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;