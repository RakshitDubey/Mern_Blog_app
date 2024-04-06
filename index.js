const express=require('express')
const { default: mongoose } = require('mongoose')
const dotenv=require('dotenv')
const app=express()
const cookieparser=require('cookie-parser')
const authRouter=require('./routes/auth')
const path=require('path')
const userRouter=require('./routes/user')
const multer=require('multer')
const postRouter=require('./routes/posts')

const cors=require('cors')

// app.get('/',(req,res)=>{
//     app.use(express.static(path.resolve(__dirname,"frontend","build")))
//     res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
// })


// const path = require('path')
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to database");
    } catch (error) {
        console.log(error);
        
    }
}

app.use('/images',express.static(path.join(__dirname,'/images')))

app.use(cors())
dotenv.config()

app.use(cookieparser())
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/posts',postRouter)

// image upload 
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"image1.png")}
    }


})

const upload=multer({storage:storage})
app.get('/hello',(req,res)=>{
    res.status(200).json({msg:"hello ji everything is running"})
})
app.post('/api/upload',upload.single("file"),(req,res)=>{
    res.status(200).json("Imgage has been uploaded")
})

app.listen(5000,()=>{
    connectDB()
    console.log("Server is running",process.env.PORT);
})
