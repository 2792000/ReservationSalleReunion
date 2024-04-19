const salleModel=require('../models/salle.model')
const resModel=require('../models/reservation.model')

exports.getAllReservationsVController=(req,res,next)=>{

    resModel.getAllReservationsV().then(Reservations=>{
        console.log(req.session.userId)
        res.render('dashboard',{Reservations:Reservations,verifUser:req.session.userId})
    })


}
exports.getAllSallesController=(req,res,next)=>{

    salleModel.getAllSalles().then(salles=>{
        
        res.render('salles',{salles:salles,verifUser:req.session.userId})
    })


}