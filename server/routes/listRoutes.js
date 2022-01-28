const express = require('express');
const router = express.Router()
const { newList,getList,deleteList } = require('../controllers/listControllers.js');
const { admin } = require('../middlewares/admin');
const auth = require('../middlewares/auth')

//new list
router.post('/new',auth, admin, newList)

//delete list
router.delete('/:id',auth,admin,deleteList)

//all lists
router.get('/:id',auth,getList)

module.exports = router