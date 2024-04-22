const express=require('express')
const mongoose = require('mongoose');
const path=require('path')
const routerHome=require('./routers/home.route')

const routerAuth=require('./routers/auth.route')

const routeMysalles=require('./routers/mysalles.route')
const routesalle=require('./routers/salle.route')
const routeRes=require('./routers/reservation.route')
const routeMyRes=require('./routers/myReservations.route')
const routeContact=require('./routers/contact.route')
const routeAbout=require('./routers/about.route')
const routerTable=require('./routers/table.route')
const routerDashboad=require('./routers/dashboard.route')
const session=require('express-session')
const MongoDbStore=require('connect-mongodb-session')(session)
const flash=require('connect-flash')


const app=express()


app.use(express.static(path.join(__dirname,'assets')))

app.set('view engine','ejs')
app.set('views','views')

var Store=new MongoDbStore({
    uri:'mongodb+srv://amine123:azsq%402626@cluster0.ihj3uci.mongodb.net/salle_reunion?retryWrites=true&w=majority&appName=Cluster0',
    collection:'sessions'
}) 
app.use(flash())
app.use(session({
    secret:'this is my secret key dfjkbnjdfnbhjshdvbshdvsd',

    store:Store,
    resave: true,
    saveUninitialized: true
}))

app.use('/',routerHome)
app.use('/',routerAuth)
app.use('/table',routerTable)
app.use('/mysalles',routeMysalles)
app.use('/',routeContact)
app.use('/',routeAbout)
app.use('/salles',routesalle)
app.use('/reservation',routeRes)
app.use('/myReservation',routeMyRes)
app.use('/dashboard',routerDashboad)




app.listen(4000,()=>console.log('server run in port 4000'))