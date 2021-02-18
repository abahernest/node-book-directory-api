const express = require ('express');
const router = express.Router();
const User = require ('../models/user');
const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');

router.post ('/signup', async (req,res,next)=>{
    await User.find({email: req.body.email})
    .exec()
    .then(user=>{
        if (user.length>=1){
            return res.status(409).json({
                message: "User already exists"
            });
        }else {

    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if (err) {
            return res.status(500).json({
                error:err
            });
        } else {
            const user = new User ({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });
            user.save()
            .then(result=>{
                console.log(result)
                res.status(201).json({
                    message: "Signed Up"
                })
            }) 
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                    error:err
                });
            });
        }
    });

        }
    })
    .catch(err=>{
        return res.status(500).json({
            error:err
        })
    });

});


router.get ('/', async (req,res,next)=>{
    await User.find()
    .select("_id email")
    .exec()
    .then(users =>{
        console.log("GET "+users.length+" USERS")
        res.status(200).json(users)
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
  
});


router.post ('/login', async (req,res,next)=>{
    await User.findOne({email:req.body.email})
    .exec()
    .then(user=>{
        if (user){
            bcrypt.compare(req.body.password,user.password, (err,response)=>{
                if(err){
                    return res.status(401).json({
                        message:'Auth Error'
                    });
                } 
                if (response){
                    const token = jwt.sign({
                        email:user.email,
                        userId: user._id,
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    });                    
                    return res.status(200).json({
                        message: 'Login successful',
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Incorrect Password"
                })
            })
        }else {
            return res.status(401).json({
                message: "User doesn't exist"
            });
        }
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
});


module.exports = router;