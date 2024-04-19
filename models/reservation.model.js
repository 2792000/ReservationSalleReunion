const { response } = require('express')
const mongoose=require('mongoose')


let schemaReservation=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    salleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Salle'
    },
    dateDeRse:{type:Date},
    dateARes:{type:Date},
    heureDebut:{type:String},
    heureFin:{type:String},
    valider:Number
   
})
let Res=mongoose.model('reservation',schemaReservation)
let url='mongodb+srv://amine123:azsq%402626@cluster0.ihj3uci.mongodb.net/salle_reunion?retryWrites=true&w=majority&appName=Cluster0'


exports.getAllReservations = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return Res.find({}).populate('userId', 'name').populate('salleId', 'name');
        }).then(Reservations => {
            mongoose.disconnect();
            resolve(Reservations);
        }).catch(err => reject(err));
    });
}
exports.getAllReservationsV = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return Res.find({valider:1}).populate('userId', 'name').populate('salleId', 'name');
        }).then(Reservations => {
            mongoose.disconnect();
            resolve(Reservations);
        }).catch(err => reject(err));
    });
}
 exports.getOneReservationDetails=(id)=>{
    return new Promise((resolve,reject)=>{
    
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         return Res.findById(id).populate('userId', 'name').populate('salleId', 'name');
   
       }).then(Reservation=>{
           mongoose.disconnect()
           resolve(Reservation)
   
       }).catch(err=>reject(err))
 
 
 
 
    })
 
 
 }
 exports.getReservationSalle=(idSalle)=>{
    return new Promise((resolve,reject)=>{
    
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        return Res.find({ salleId: idSalle });
   
       }).then(dates=>{
           mongoose.disconnect()
           resolve(dates)
   
       }).catch(err=>reject(err))
 
 
 
 
    })
 
 
 }
 exports.postDataReservationModel=(userId,salleId,dateDeRse="",dateARes="",heureDebut="",heureFin="")=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
           
            let res=new Res({
                userId:userId,
                salleId:salleId,
                dateDeRse:dateDeRse,
                dateARes:dateARes,
                heureDebut:heureDebut,
                heureFin:heureFin,
                valider:0
                
            })
           return res.save()


        }).then(()=>{
            mongoose.disconnect()
            resolve('Res added !')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })




 }
 exports.getmyReservations=(userId)=>{
    return new Promise((resolve,reject)=>{
    
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         return Res.find({userId:userId}).populate('userId', 'name').populate('salleId', 'name');
   
       }).then(Reservations=>{
           mongoose.disconnect()
           resolve(Reservations)
   
       }).catch(err=>reject(err))
 
 
 
 
    })
 
 
 }
 exports.deleteReservation=(id)=>{
    return new Promise((resolve,reject)=>{
    
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         return Res.deleteOne({_id:id})
   
       }).then(Reservations=>{
           mongoose.disconnect()
           resolve(true)
   
       }).catch(err=>reject(err))
 
 
 
 
    })
 
 
 }
 exports.validerReservation = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            // Trouver la réservation par ID et la mettre à jour
            Res.findByIdAndUpdate(id, { valide: true }, { new: true }).populate('userId', 'name email').populate('salleId', 'name')
                .then((reservation) => {
                    mongoose.disconnect();
                    if (reservation) {
                        resolve(reservation);
                    } else {
                        reject(new Error('Réservation non trouvée'));
                    }
                }).catch((err) => {
                    reject(err);
                });
        }).catch((err) => reject(err));
    });
};
 exports.getPageUpdateReservationModel=(id)=>{
    return new Promise((resolve,reject)=>{
    
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         return Res.findById(id).populate('userId', 'name').populate('salleId', 'name');
   
       }).then(Reservations=>{
           mongoose.disconnect()
           resolve(Reservations)
   
       }).catch(err=>reject(err))
 
 
 
 
    })
 }

 exports.postUpdateReservationModel=(resId,userId,salleId,dateDeRse,dateARes,heureDebut,heureFin,valider)=>{
//reservationId,req.session.userId,req.body.salleId,req.body.dateDebut,req.body.dateFin,req.body.nheure
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{

         return Res.updateOne({_id:resId},{userId:userId,salleId:salleId,dateDeRse:dateDeRse,dateARes:dateARes,heureDebut:heureDebut,heureFin:heureFin,valider:valider})


        }).then(()=>{
            mongoose.disconnect()
            resolve('Updated!')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })

}