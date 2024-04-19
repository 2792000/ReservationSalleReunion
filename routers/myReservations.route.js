const router=require('express').Router()
const ReservationController=require('../controllers/reservation.controller')
const multer=require('multer')
const GuardAuth=require('./guardAuth')
router.get('/',ReservationController.getMyReservationsPage)
router.get('/delete/:id',ReservationController.deleteReservationController)
router.post('/delete/:id',ReservationController.deleteReservationController)

router.get('/valider/:id',ReservationController.getMyReservationValider)


router.get('/update/:id',ReservationController.getMyReservationUpdatePage)

router.post('/update', multer({
    storage:multer.diskStorage({
        destination:function (req, file, cb) {  
          cb(null, 'assets/uploads')          
          },
        filename:function (req, file, cb) { 
                cb(null, Date.now()+'-'+ file.originalname )  
        }
    })
    }).single('image'),ReservationController.postUpdateReservationContoller)




module.exports=router