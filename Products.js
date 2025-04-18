const mongoose = require('mongoose')
//define schema
const ProductSchema = new mongoose.Schema({
    name:String,
    quantity:Number,
    price:Number
})
//create model object
const ProductModel = new mongoose.model("Products",ProductSchema,'Products')
module.exports=ProductModel