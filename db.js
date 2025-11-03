const mongoose =require('mongoose')

//const mongoURL ='mongodb://localhost:27017/hotels'
 //const mongoURL ='mongodb+srv://ambekarshraddha21_db_user:ska2001@cluster0.oteku1r.mongodb.net/'

 const mongoURL =process.env.MONGODB_URL
mongoose.connect(mongoURL)

const db =mongoose.connection;

db.on('connected',()=>{
  console.log('connected to Mongodb server')
})
db.on('error',(err)=>{
  console.log('error in Mongodb server ',err)
})
db.on('disconnected',()=>{
  console.log('disconnected to Mongodb server')
})

module.exports=db;
