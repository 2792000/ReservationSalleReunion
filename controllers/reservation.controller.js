const { errorMonitor } = require('nodemailer/lib/xoauth2');
const resModel=require('../models/reservation.model')
const nodemailer = require('nodemailer');

exports.getAllReservationsController=(req,res,next)=>{

    resModel.getAllReservations().then(Reservations=>{
        console.log(req.session.userId)
        res.render('Reservations',{Reservations:Reservations,verifUser:req.session.userId})
    })


}
exports.getOneReservationDetailsController=(req,res,next)=>{
    let id=req.params.id
    resModel.getOneReservationDetails(id).then(reservation=>{
        res.render('detailsRes',
        {Reservation:reservation,verifUser:req.session.userId}
        )
    })


}
exports.getAddReservationController =(req,res,next)=>{
    let id=req.params.salleId
    let name=req.params.name
    res.render('addReservation',{salleId:id,name:name,verifUser:req.session.userId,Smessage:req.flash('Successmessage')[0],Emessage:req.flash('Errormessage')[0]})

}
exports.postAddReservationController=(req,res,next)=>{
 
    console.log("the time is ",typeof(req.body.heureDebut),req.body.heureFin)
    let v=0;
    const now = new Date();
    // Obtenir les composants de la date
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Le mois est basé sur zéro, donc +1
    const day = String(now.getDate()).padStart(2, '0');

  // Formater la date dans le format souhaité
    const dateDeRse = `${year}-${month}-${day}`;
    console.log("the time is ",dateDeRse,"fff",req.body.dateARse)
    resModel.getReservationSalle(req.params.salleId).then((resSalle)=>{
            for (let i in resSalle){
                console.log(resSalle)
                if (i.dateARes==req.body.dateARes){
                    if (i.heureDebut==req.body.heureDebut && i.heureFin==req.body.heureFin){
                       v=1
                    }
                }else{
                    req.flash('Errormessage',err)
                    res.redirect('/reservation/addReservation')
                }
            }
    }).catch((err)=>{
        req.flash('Errormessage',err)
        res.redirect('/reservation/addReservation')
    })
    console.log(v)
    resModel.postDataReservationModel(req.session.userId,req.params.salleId,dateDeRse,req.body.dateARse,req.body.heureDebut,req.body.heureFin).then((msg)=>{
        req.flash('Successmessage',msg)
        res.redirect('/myReservation')
    }).catch((err)=>{
        req.flash('Errormessage',err)
        res.redirect('/reservation/addReservation')
    })

   
    

}
exports.getMyReservationsPage=(req,res,next)=>{
    resModel.getmyReservations(req.session.userId).then((reservations)=>{
        // console.log(req.session.userId)
        // console.log(books)
        res.render('myReservations',{
            verifUser:req.session.userId,
            myReservations:reservations})

    })
    
}
exports.deleteReservationController=(req,res,next)=>{
    let id=req.params.id
    
    resModel.deleteReservation(id).then((verif)=>{
        res.redirect('/myReservation')
    }).catch((err)=>{
        console.log(err)
    })
}

exports.getMyReservationUpdatePage=(req,res,next)=>{
    let id=req.params.id
    console.log("res id",id)
    resModel.getPageUpdateReservationModel(id).then((reservation)=>{
        console.log(reservation)
        res.render('updateReservation',{reservationUpdate:reservation,verifUser:req.session.userId,Smessage:req.flash('Successmessage')[0],Emessage:req.flash('Errormessage')[0]})
    })

    

}

exports.postUpdateReservationContoller=(req,res,next)=>{
        if(req.file){
            console.log('fds',res.body)
            resModel.postUpdateReservationModel(req.body.reservationId,req.body.userId,req.body.salleId,req.body.dateDeRse,req.body.dateARes,req.body.heureDebut,req.body.heureFin,0).then((msg)=>{
                req.flash('Successmessage',msg)
                res.redirect(`/myReservation/update/${req.body.reservationId}`)
            }).catch((err)=>{
                req.flash('Errormessage',err)
                res.redirect(`/myReservation/update/${req.body.reservationId}`)
            })
        }else{
            console.log("else",req.body)
            console.log("sallle id ",req.body.salleId)
            resModel.postUpdateReservationModel(req.body.reservationId,req.body.userId,req.body.salleId,req.body.dateDeRse,req.body.dateARes,req.body.heureDebut,req.body.heureFin,0).then((msg)=>{
                req.flash('Successmessage',msg)
                res.redirect(`/myReservation/update/${req.body.reservationId}`)
            }).catch((err)=>{
                req.flash('Errormessage',err)
                res.redirect(`/myReservation/update/${req.body.reservationId}`)
            })
        }
       

    


}
async function sendEmailToUser(reservation) {
    // Créer un transporteur SMTP
  
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mohamedhlel321@gmail.com', // Votre adresse e-mail Gmail
            pass: 'vysn mitm vyld loev' // Votre mot de passe Gmail
        }
    });
    // Configurer le mail
    let mailOptions = {
        from: '"Votre Nom" Reservation salle de reunion",',
        to: reservation.userId.email, // adresse e-mail de l'utilisateur
        subject: 'Votre réservation a été validée',
        text: `Bonjour ${reservation.userId.name}, Votre réservation a été validée.`,
        html: `<p>Bonjour ${reservation.userId.name},</p><p>Votre réservation a été validée.</p>`
    };

    // Envoyer l'e-mail
    let info = await transporter.sendMail(mailOptions);

    console.log('E-mail envoyé : %s', info.messageId);
}
exports.getMyReservationValider = (req, res, next) => {
    let id = req.params.id;

    resModel.validerReservation(id).then((reservation) => {
        // Envoyer un e-mail à l'utilisateur
        sendEmailToUser(reservation).then(async () => {
          
           await resModel.postUpdateReservationModel(reservation._id,reservation.userId,reservation.salleId,reservation.dateDeRse,reservation.dateARse,reservation.heureDebut,reservation.heureFin,1).then((msg)=>{
                req.flash('Successmessage',msg)
                res.redirect('/reservation');
            }).catch((err)=>{
                req.flash('Errormessage',err)

            })
            res.redirect('/reservation');
        }).catch((err) => {
            console.error('Erreur lors de l\'envoi de l\'e-mail :', err);
            // Gérer les erreurs d'envoi d'e-mail
        });
    }).catch((err) => {
        console.log(err);
        // Gérer les erreurs lors de la récupération de la réservation
    });
};