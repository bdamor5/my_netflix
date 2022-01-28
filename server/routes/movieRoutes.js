const express = require('express');
const router = express.Router()
const { createMovie, updateMovie, deleteMovie,allMovie, displayMovie } = require('../controllers/movieControllers.js');
const { admin } = require('../middlewares/admin');
const auth = require('../middlewares/auth')

//display random movie
router.get('/random', displayMovie)

//all movies & series
router.get('/all', allMovie)

////////////admin////////////

// //new movie
// router.post('/new', auth, admin, createMovie)

// //all movies
// router.post('/new', auth, admin, allMovie)

// //update movie
// router.put('/:id', auth, admin, updateMovie)

// //delete movie
// router.delete('/:id', auth, admin, deleteMovie)

module.exports = router