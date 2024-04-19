const { response } = require('express')
const mongoose=require('mongoose')


let schemaDispo=mongoose.Schema({
    
    salleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Salle'
    },
    Day:{type:String, required:true},
    fermeture:{type:String, required:true},
    ouverture:{type:String, required:true},
    
   
})
let dispo=mongoose.model('dispo',schemaDispo)
let url='mongodb+srv://amine123:azsq%402626@cluster0.ihj3uci.mongodb.net/salle_reunion?retryWrites=true&w=majority&appName=Cluster0'

exports.getmyDispo=(idSalle)=>{
    return new Promise((resolve,reject)=>{
    
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         return Dispo.findById(id)
   
       }).then(Dispos=>{
           mongoose.disconnect()
           resolve(Dispos)
   
       }).catch(err=>reject(err))
 
 
 
 
    })
 
 
 }

 exports.postDataDispoModel=(salleId,day="",dateFin="",Nheure=0)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{

            let res=new Res({
                userId:userId,
                salleId:salleId,
                dateDebut:dateDebut,
                dateFin:dateFin,
                Nheure:Nheure,
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