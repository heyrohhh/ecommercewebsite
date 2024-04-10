const {Schema ,model} = require('mongoose');


const productSchema = new Schema(
    {
       Pname:{
            type: String,
            required: true,
        },
        Pprice:{
            type: Number,
              required:true,
        },
        Pdiscripton:{
            type: String,
        },
        Pimg:{
            type: String,
            required : true,
        },
        Pdetail:{
            type:String,
        },
        Pcode:{
            type:String,
            unique: true,
        }
    }, {
        timestamps:true
    }
);

const Product = model("product", productSchema);
module.exports = Product;

