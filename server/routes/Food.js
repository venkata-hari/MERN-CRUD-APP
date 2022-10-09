const mongoose=require('mongoose')
const FoodAppSchema=new mongoose.Schema({
item:{
type:String
},
price:{
type:Number
},
value:{
type: Boolean,
default: false
}
})
const Food=mongoose.model("Food",FoodAppSchema)
module.exports=Food