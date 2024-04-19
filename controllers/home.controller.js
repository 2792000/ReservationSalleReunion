const salleModel=require('../models/salle.model')


exports.threeSallesController=(req,res,next)=>{

    salleModel.getThreeSalles().then(salles=>{
        res.render('index',{
            salles:salles,
        verifUser:req.session.userId})
    })


}




