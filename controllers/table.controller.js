const salleModel=require('../models/salle.model')
const userModel=require('../models/auth.model')


exports.tableController=async (req,res,next)=>{
    salles=[]
    users=[]
    try{salles= await salleModel.getAllSalles()}catch( err){}
    try{users= await userModel.getAllUsers()}catch( err){}
  
        res.render('tables',{salles:salles,users:users})

}