const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Database connection
const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://ravish123:ravish123@cluster0.0p3e4.mongodb.net/test");
        console.log("Connected To MongoDB");
    } catch (error) {
        console.log(error);
    }
};

// API creation
app.get("/", (req, res) => {
    res.send("express app is running");
});

// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        // Corrected filename generation
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Serve images statically
app.use('/images', express.static('upload/images'));

// Upload endpoint for images
app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }
    
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

const Product =mongoose.model("product",{
    id:{
       type:Number,
       required:true,

    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:false,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },

})


app.post('/addproduct',async(req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    }else{
        id=1;
    }
    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,

    });
    console.log(product);
   await product.save();
   console.log("saved")
   res.json({
    success:true,
    name:req.body.name,
   })
})

// creating api for delete 
app.post('/removeproduct' ,async (req,res)=>{
await Product.findOneAndDelete({id:req.body.id});
console.log("Removed");
res.json({
    success:true,
    name:req.body.name
})

})


// creating api for getting all products 
app.get('/allproducts',async (req,res)=>{
    let products= await Product.find({});
    console.log("all products fetched");
    res.send(products);
})
app.listen(port, () => {
    console.log("Server is running on port " + port);
    connect();
});
