const express = require('express');
const router = express.Router()
const { registerUser, loginUser, allUsers,logoutUser, singleUser, updateUser, deleteUser, deleteUserById, userStats, loggedInUser,resetPw } = require('../controllers/userControllers');
const { admin } = require('../middlewares/admin');
const auth = require('../middlewares/auth')

//register user
router.post('/register',registerUser);

//login user
router.post('/login',loginUser)

//logged in user info
router.get('/me',auth,loggedInUser)

//logout user
router.get('/logout' ,auth , logoutUser)

//update user profile
router.put('/update' ,auth , updateUser)

//reset pw
router.put('/reset',auth,resetPw)

//delete user profile
router.delete('/delete' ,auth , deleteUser)


////////admin/////////
//get all users
router.get('/all' ,auth, admin, allUsers)

//single user by id
router.get('/:id' ,auth , admin, singleUser)

//delete user by id
router.delete('/:id' ,auth , admin, deleteUserById)

//user stats
router.get('/stats',auth, admin, userStats)

module.exports = router