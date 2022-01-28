const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary')
const path = require('path')

//production env
if(process.env.NODE_ENV !== "PRODUCTION"){
    const dotenv = require('dotenv').config()
}

//db connection
const conn = require('./models/connection')
conn();
const errorMiddleware = require('./middlewares/errorMiddleware')

//cloudinary
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

//middlewares
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileUpload())

//routes
const users = require('./routes/userRoutes')
const movies = require('./routes/movieRoutes')
const list = require('./routes/listRoutes')

app.use('/api/user',users)
app.use('/api/movies',movies)
app.use('/api/lists',list)

app.use(errorMiddleware);

app.use(express.static(path.join(__dirname , '../client/build')))

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
})

app.listen(process.env.PORT,()=>console.log(`Server is running on PORT : ${process.env.PORT}`));


