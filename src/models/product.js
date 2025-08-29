const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    price:{
        type: Number,
        required: true,
        min: 1,
    },
    description:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    imageURL:{
        type: String,
        default: "https://baskiofisi.com.tr/wp-content/uploads/default-image-1.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("imageURL is not valid")
            }
        },
    },
},
{
    timestamps: true,
});

productSchema.index({title: 1});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;