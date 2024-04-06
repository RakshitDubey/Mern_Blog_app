
const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post = require('../models/Post')
const verifyToken = require('./verifyToken')

// update 
router.put('/:id',verifyToken,async(req,res)=>{
    try {
        if(req.body.password){
            req.body.password= await bcrypt.hash(req.body.password, 10);
        }

        const updateUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateUser)
        
    } catch (error) {
        res.status(500).json({ error: error.message }); // Send error message in response
        console.log(error);
        
    }
})

// Delete 
router.delete('/:id',verifyToken,async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId:req.params.id})
        res.status(200).json("User is deleted")
        
        
    } catch (error) {
        res.status(500).json({ error: error.message }); // Send error message in response
        console.log(error);
    }
})

// getuser 


router.get('/:id',async(req,res)=>{
    try {
        const user=await User.findById(req.params.id)
        const{password,...info}=user._doc
        res.status(200).json(info)
    } catch (error) {
        res.status(500).json({ error: error.message }); // Send error message in response
        console.log(error);
        
    }

})
module.exports=router