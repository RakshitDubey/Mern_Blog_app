
const express=require('express')
const router=express.Router()
const Post=require('../models/Post')
const User=require('../models/User')
const bcrypt=require('bcrypt')
const verifyToken = require('./verifyToken')



router.post('/create',verifyToken,async(req,res)=>{
    try {
        const newPost= new Post(req.body)
        const savedPost=await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json({ error: error.message }); // Send error message in response
        console.log(error);

        
    }
})

// update 

router.put('/:id',verifyToken,async(req,res)=>{
    try {


        const updatePost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatePost)
        
    } catch (error) {
        res.status(500).json({ error: error.message }); // Send error message in response
        console.log(error);
        
    }
})

// Delete 
router.delete('/:id',verifyToken,async(req,res)=>{
    try {
        await Post.findByIdAndDelete(req.params.id)

        
        res.status(200).json("Post is deleted")
        
        
    } catch (error) {
        res.status(500).json({ error: error.message }); // Send error message in response
        console.log(error);
    }
})

// getPost details


router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// allposts
router.get('/',async(req,res)=>{
    try {
        const query=req.query
        const searchfilter={
            title:{$regex:query.search,$options:'i'}
        }
        const posts=await Post.find(query.search?searchfilter:null)
        res.status(200).json(posts)        
    } catch (error) {
        res.status(500).json({ error: error.message }); // Send error message in response
        console.log(error);
        
    }
})
router.get('/user/:userId',async(req,res)=>{
    try {
        const posts=await Post.find({userId:req.params.userId})
        res.status(200).json(posts)

        
    } catch (error) {
        res.status(500).json({ error: error.message }); // Send error message in response
        console.log(error);
        
    }
})

// search post
// router.get('/search/:prompt',async(req,res)=>{
//     try {
//         const 
        
//     } catch (error) {
//         res.status(500).json({ error: error.message }); // Send error message in response
//         console.log(error);
        
//     }
// })
module.exports=router