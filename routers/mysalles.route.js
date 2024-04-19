const router=require('express').Router()
const salleController=require('../controllers/salle.controller')
const multer=require('multer')
const GuardAuth=require('./guardAuth')
router.get('/',salleController.getMySallesPage)
router.post('/delete/:id',salleController.deletesalleController)
router.get('/delete/:id',salleController.deletesalleController)

router.get('/update/:id',salleController.getMySalleUpdatePage)


router.post('/update', multer({
    storage:multer.diskStorage({
        destination:function (req, file, cb) {  
          cb(null, 'assets/uploads')          
          },
        filename:function (req, file, cb) { 
                cb(null, Date.now()+'-'+ file.originalname )  
        }
    })
    }).single('image'),salleController.postUpdateSalleContoller)


module.exports=router