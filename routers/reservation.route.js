const ReservationController=require('../controllers/reservation.controller')
const route = require('./auth.route')
const router=require('express').Router()
const GuardAuth=require('./guardAuth')
const multer=require('multer')



router.get('/',GuardAuth.isAuth,ReservationController.getAllReservationsController)
router.get('/:id',GuardAuth.isAuth,ReservationController.getOneReservationDetailsController)

router.get('/addReservation/:salleId/:name',GuardAuth.isAuth,ReservationController.getAddReservationController)
router.post('/addReservation/:salleId',multer({
    storage:multer.diskStorage({
        destination:function (req, file, cb) {
                cb(null, 'assets/uploads')  
          },
        filename:function (req, file, cb) {
                cb(null, Date.now()+'-'+ file.originalname )      
        }
    })
    }).single('image'),GuardAuth.isAuth,ReservationController.postAddReservationController)




module.exports=router