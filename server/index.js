const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const app=express()
const FoodModel=require('./routes/Food')
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(cors())
dotenv.config()
const connect=async()=>{
try{        
await mongoose.connect(process.env.MONGO)
console.log('connected to mongodp')
}
catch(error){
throw error;
}
}
app.get('/read',async(req,res)=>{
        try{
        const userData=await FoodModel.find()
        res.status(201).json(userData)
        }
        catch(error){
        res.status(404).json(error)
        }
        })
        
app.post("/insert",async(req,res)=>{
        const item=req.body.item
        const price=req.body.price   
        try{
        await FoodModel({item:item,price:price}).save()
        }
        catch(err){
        console.log(err)
        }
        })    
app.put("/update",async(req,res)=>{
        const newItem=req.body.newItem
        const newPrice=req.body.newPrice
        const id=req.body.id 
        try{
       await FoodModel.findById(id,(err,updated)=>{
        updated.item=newItem
        updated.price=newPrice
        updated.id=id
        updated.save()
        res.send("update")
        })
        }
        catch(err){
        console.log(err)
        }
        })  
app.delete("/delete/:id",async(req,res)=>{
            const id=req.params.id;
            await FoodModel.findByIdAndRemove(id).exec()
            res.send("deleted")
            })       
app.listen(3001,()=>{
connect()
console.log("server running at port 3001")
})