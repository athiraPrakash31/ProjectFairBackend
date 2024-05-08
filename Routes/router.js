// 1. import express
const express = require('express')

const userController = require('../Controllers/userController')
const projectController = require("../Controllers/projectController")
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
// 2. create router object of express to define path
const router = express.Router()

// 3. Register api call
 router.post('/register',userController.register)

// 4. login ap call
 router.post('/login',userController.login)

 router.post('/project/add-project',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)
//  get all project
  router.get('/projects/allProjects',projectController.allProjects )
//   get a particular project
router.get('/project/viewProject',jwtMiddleware,projectController.viewProject)

// get 3 projects display on the homepage
router.get('/project/homeProject',projectController.homeProject)

// delete a particular project of a user
router.delete('/project/delete/:pid',jwtMiddleware,projectController.deleteUserProject)

// update user project
router.put('/project/update-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.updateUserProject)
 
module.exports = router