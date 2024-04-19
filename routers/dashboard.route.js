const dashboardController=require('../controllers/dashboard.controller')
const route = require('./auth.route')
const router=require('express').Router()
const GuardAuth=require('./guardAuth')
const multer=require('multer')

router.get('/',GuardAuth.isAuth,dashboardController.getAllReservationsVController)
module.exports=router