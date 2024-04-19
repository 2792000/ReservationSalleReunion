const TableController=require('../controllers/table.controller')
const router=require('express').Router()


router.get('/',TableController.tableController)






module.exports=router