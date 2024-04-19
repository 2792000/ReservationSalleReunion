const salleController=require('../controllers/salle.controller')
const route = require('./auth.route')
const router=require('express').Router()
const GuardAuth=require('./guardAuth')
const multer=require('multer')



router.get('/',GuardAuth.isAuth,salleController.getAllSallesController)
router.get('/:id',GuardAuth.isAuth,salleController.getOneSalleDetailsController)

route.get('/addsalle',GuardAuth.isAuth,salleController.getAddSalleController)
route.post('/addsalle',multer({
storage:multer.diskStorage({
    destination:function (req, file, cb) {
            cb(null, 'assets/uploads')  
      },
    filename:function (req, file, cb) {
            cb(null, Date.now()+'-'+ file.originalname )      
    }
})
}).single('image'),
GuardAuth.isAuth,salleController.postAddSalleController)



module.exports=router


