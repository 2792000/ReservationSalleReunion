const mongoose = require('mongoose');

const salleSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    capacity: { type: Number, required: true }, 
    prix_heure: Number,
    facilities: [{type: String}],
    image: String,
    availability: [{type: String}]
});




const Salle = mongoose.model('Salle',salleSchema)
let url='mongodb+srv://amine123:azsq%402626@cluster0.ihj3uci.mongodb.net/salle_reunion?retryWrites=true&w=majority'

exports.getThreeSalles=()=>{
    return new Promise((resolve,reject)=>{
    
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         return Salle.find({}).limit(3)
   
       }).then(Salles=>{
           mongoose.disconnect()
           resolve(Salles)
   
       }).catch(err=>reject(err))
    })
 
 
 }
 exports.getAllSalles=()=>{
     return new Promise((resolve,reject)=>{
     
      mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
          return Salle.find({})
    
        }).then(Salles=>{
            mongoose.disconnect()
            console.log(Salles)
            resolve(Salles)
    
        }).catch(err=>reject(err))
  
  
  
  
     })
  
  
  }
  exports.getmySalles=()=>{
    return new Promise((resolve,reject)=>{
    
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         return Salle.find({})
   
       }).then(Salles=>{
           mongoose.disconnect()
           resolve(Salles)
   
       }).catch(err=>reject(err))
 
 
 
 
    })
 
 
 }
  exports.getOneSalleDetails=(id)=>{
     return new Promise((resolve,reject)=>{
     
      mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
          return Salle.findById(id)
    
        }).then(Salles=>{
            mongoose.disconnect()
            resolve(Salles)
    
        }).catch(err=>reject(err))
  
  
  
  
     })
  
  
  }
 
  exports.postDataSalleModel=(name,capacity,prix_heure,facilities,image,availability)=>{
    console.log("fghjk",facilities,availability)
     return new Promise((resolve,reject)=>{
         mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async ()=>{
 
             let salle=new Salle({
                 name:name,
                 capacity:capacity,
                 prix_heure:prix_heure,
                 facilities:facilities,
                 image:image,
                 availability:availability
             })
             await salle.save()
            return salle.save()
 
            
         }).then(()=>{
             mongoose.disconnect()
             resolve('salle added  !')
         }).catch((err)=>{
             mongoose.disconnect()
             reject(err)
         })
     })
 
 
 
 
  }
 

 
 
  exports.deletesalle=(id)=>{
     return new Promise((resolve,reject)=>{
     
      mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
          return Salle.deleteOne({_id:id})
    
        }).then(Salles=>{
            mongoose.disconnect()
            resolve(true)
    
        }).catch(err=>reject(err))
  
  
  
  
     })
  
  
  }
 
 
  exports.getPageUpdateSalleModel=(id)=>{
     return new Promise((resolve,reject)=>{
     
      mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
          return Salle.findById(id)
    
        }).then(salles=>{
            
            mongoose.disconnect()
            resolve(salles)
    
        }).catch(err=>reject(err))
  
  
  
  
     })
  
  
  }
 
 exports.postUpdateSalleModel=(SalleId,name,availability,capacity,prix_heure,filename,facilities)=>{
   //salleId,name,availability,capacity,prix_heure,oldImage,facilities
     return new Promise((resolve,reject)=>{
         mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
 
          return Salle.updateOne({_id:SalleId},{name:name,capacity:capacity,availability:availability,image:filename,prix_heure:prix_heure,facilities:facilities})
 
 
         }).then(()=>{
             mongoose.disconnect()
             resolve('Updated!')
         }).catch((err)=>{
             mongoose.disconnect()
             reject(err)
         })
     })
 
 } 
 