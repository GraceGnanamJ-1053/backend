const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
// const UserModel = require('./User')
const ProductModel = require('./Products')

const app = express()
app.use(cors())
app.use(express.json())

//connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Company')
.then(() => console.log('DB connected'))
.catch(err => console.log(err))

//Register API Route
app.post('/register',(req,res)=>{
UserModel.create(req.body)
.then(res.json('Data Saved Successfully'))
.catch(err=>res.json(err))
})

//Create Rest API (http://localhost:8000/addProducts)
app.post('/addProduct',async(req,res)=>{
    try{
        await ProductModel.create(req.body)
        res.json({message:'Product Added Successfully'})
    }catch(error){
        res.json(error)
    }
})

// Read Rest API(http://localhost:8000/viewProducts)
app.get('/viewProducts',async(req,res)=>{
    try{
        const records = await ProductModel.find()
        res.json(records)
    }catch(error){
        res.json(error)
    }
})

// Read By ID Rest API (http://localhost:8000/findProducts)
app.get('/findProduct/:id',async(req,res)=>{
    try{
        const record = await ProductModel.findById(req.params.id)
        res.json(record)
    }catch(error){
        res.json(error)
    }
})

// Update Rest API
app.put('/editProduct/:id',async(req,res)=>{
    try{
        const updatesProduct = await ProductModel.findByIdAndUpdate(
            req.params.id, req.body,{new:true}
        )
            if(!updatesProduct){
                return res.send('Item not found');
            }
            res.json({message:'Product Updated Successfully'});
    }catch(err){
        res.json(err);
    }
})

// Delete Rest API
app.delete('/deleteProduct/:id',async(req,res)=>{
    try{
        const deletedItem = await ProductModel.findByIdAndDelete(req.params.id)
        if (!deletedItem) 
            res.json('Item not Found')    
        res.json({message:'Item Deleted Successfully!'})
    }catch(error){
        res.json(error)
    }
})
// // //Create API End Points (HTTP Request,Response)
// app.get('/',(req,res)=>{
// res.send('Welcome to Node JS Server')
// })
//config PORT and Start Server
const PORT = 8000
app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`)
})

