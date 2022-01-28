const asyncHandler = require('../middlewares/asyncErrorMiddleware')
const ErrorHandler = require('../utils/errorHandler')
const List = require('../models/listSchema')

//new list
exports.newList = asyncHandler(async(req,res,next)=>{
    const list = new List(req.body);

    await list.save();

    res.status(201).json({success:true, list})
})

//delete list
exports.deleteList = asyncHandler(async(req,res,next)=>{
    
    await List.findByIdAndDelete(req.params.id);

    res.status(201).json({success:true, message : "List Deleted"})
})

//get all lists
exports.getList = asyncHandler(async(req,res,next)=>{
    const typeQuery = req.query.type; //movies or series
    const genreQuery = req.query.genre //like comedy , horror

    var list = []
    
    //if there's a type of 'movies' or 'series' , requested by user by clicking
    if(typeQuery){ 

        //if user also requested for a genre
        if(genreQuery){
            //will get type of movie or series and with genre
            list = await List.aggregate([
                {$sample : {size : 10}},
                {$match : {type : typeQuery, genre : genreQuery}}
            ])
        }else{
            //will get type of movie or series and no genre
            list = await List.aggregate([
                {$sample : {size : 10}},
                {$match : {type : typeQuery}}
            ])
        }

    }else{ 
    //else will show a random 10 lists 

        list = await List.aggregate([
          {  $sample: {size:10} }
        ])
    }

    res.status(201).json({success:true, list})
})
