const asyncHandler = require('../middlewares/asyncErrorMiddleware')
const ErrorHandler = require('../utils/errorHandler')
const Movie = require('../models/movieSchema')

// //new movie
// exports.createMovie = asyncHandler(async(req,res,next)=>{
//     const movie = new Movie(req.body);

//     await movie.save();

//     res.status(201).json({success:true, movie})
// })

// //update movie
// exports.updateMovie = asyncHandler(async(req,res,next)=>{
//     const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
//         new : true
//     })

//     res.status(200).json({success : true, movie})
// })

// //delete movie
// exports.deleteMovie = asyncHandler(async(req,res,next)=>{
//      await Movie.findByIdAndDelete(req.params.id)

//      res.status(200).json({success : true, message: " Movie Deleted"})
// })

//display random movie in home page
exports.displayMovie = asyncHandler(async(req,res,next)=>{
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    var movie;

    if(typeQuery === 'series')
        if(genreQuery){
            movie = await Movie.aggregate([
                {$match : {isSeries : true,genre:genreQuery}}, //will match if 'isSeries' field is true for series
                {$sample : {size: 1}} //will only return 1 serie
            ])
        }else{
            //will get type of series and no genre
            movie = await Movie.aggregate([
                {$match : {isSeries : true}}, //will match if 'isSeries' field is true for series
                {$sample : {size: 1}} //will only return 1 series
            ])
        }
        
    else{
        if(genreQuery){
            movie = await Movie.aggregate([
                {$match : {isSeries : false,genre:genreQuery}}, //will match if 'isSeries' field is false for movies
                {$sample : {size: 1}} //will only return 1 movie
            ])
        }else{
            //will get type of movie or series and no genre
            movie = await Movie.aggregate([
                {$match : {isSeries : false}}, //will match if 'isSeries' field is false for movies
                {$sample : {size: 1}} //will only return 1 movie
            ])
        }
    }
    

    res.status(200).json(movie)
})

// //new movie
exports.allMovie = asyncHandler(async(req,res,next)=>{
    const movies = await Movie.find();

    res.status(200).json(movies)
})

//     res.json(200).json({success:true, movies : movies.reverse()})
//     //reverse() - to get the latest movies first
// })

