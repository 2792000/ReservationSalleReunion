const salleModel=require('../models/salle.model')
const resModel=require('../models/reservation.model')


exports.getAllSallesController=(req,res,next)=>{

    salleModel.getAllSalles().then(salles=>{
        
        res.render('salles',{salles:salles,verifUser:req.session.userId})
    })


}

exports.getOnSalleDetailsController=(req,res,next)=>{
    let id=req.params.id
    salleModel.getOneSalleDetails(id).then(resSalle=>{
        resModel.getReservationSalle(resSalle._id).then(allResSalle=>{
            res.render('details',
            {salle:resSalle,reservations:allResSalle,verifUser:req.session.userId}
            )
        })
       
    })


}

exports.getOneSalleDetailsController = (req, res, next) => {
    let id = req.params.id;
    

    salleModel.getOneSalleDetails(id).then(resSalle => {
        resModel.getReservationSalle(resSalle._id).then(dates => {
            console.log(dates)
            const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

            res.render('details', {
                salle: resSalle,
                dates: dates,
                days: days,
                verifUser: req.session.userId
            });
        }).catch(err => {
            // Gérer les erreurs ici
            console.error(err);
            next(err);
        });
    }).catch(err => {
        // Gérer les erreurs ici
        console.error(err);
        next(err);
    });
};

exports.getAddSalleController =(req,res,next)=>{
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    res.render('addSalle',{verifUser:req.session.userId,Smessage:req.flash('Successmessage')[0],Emessage:req.flash('Errormessage')[0],days: days})

}

exports.postAddSalleController=(req,res,next)=>{
    console.log(req.body)
    console.log(req.file.filename)
    console.log(req.body.availability)
   
    salleModel.postDataSalleModel(req.body.name,   req.body.capacity,     req.body.prix_heure,     req.body.facilities,   req.file.filename, req.body.availability).then((msg)=>{
      
        req.flash('Successmessage',msg)
        res.redirect('/addSalle')
    }).catch((err)=>{
        req.flash('Errormessage',err)
        res.redirect('/addSalle')
    })

}

exports.getMySallesPage=(req,res,next)=>{
    salleModel.getmySalles(req.session.userId).then((salles)=>{
        // console.log(req.session.userId)
        // console.log(books)
        res.render('mysalles',{
            verifUser:req.session.userId,
            mysalles:salles})

    })
    
}
exports.deletesalleController=(req,res,next)=>{
    let id=req.params.id
    
    salleModel.deletesalle(id).then((verif)=>{
        res.redirect('/mysalles')
    }).catch((err)=>{
        console.log(err)
    })
}

exports.getMySalleUpdatePage=(req,res,next)=>{
    let id=req.params.id
    salleModel.getPageUpdateSalleModel(id).then((salle)=>{
        console.log(salle)
        res.render('updateSalle',{SalleUpdate:salle,verifUser:req.session.userId,Smessage:req.flash('Successmessage')[0],Emessage:req.flash('Errormessage')[0]})
    })

   

}

exports.postUpdateSalleContoller=async (req,res,next)=>{
        if(req.file){
           await salleModel.postUpdateSalleModel(req.body.salleId,req.body.name,req.body.availability,req.body.capacity,req.body.prix_heure,req.file.filename,req.body.facilities).then((msg)=>{
                req.flash('Successmessage',msg)
                res.redirect(`/mysalles`)
            }).catch((err)=>{
                req.flash('Errormessage',err)
                res.redirect(`/mysalles/update/${req.body.salleId}`)
            })
        }else{
            console.log(req.body)
           await salleModel.postUpdateSalleModel(req.body.salleId,req.body.name,req.body.availability,req.body.capacity,req.body.prix_heure,req.body.oldImage,req.body.facilities).then((msg)=>{
                req.flash('Successmessage',msg)
                res.redirect(`/mysalles`)
            }).catch((err)=>{
                req.flash('Errormessage',err)
                res.redirect(`/mysalles/update/${req.body.salleId}`)
            })
        }
       

    


}

// console.log(req.file.filename)
