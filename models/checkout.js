const { Schema, model, SchemaType } = require('mongoose');


const checkoutScheema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        pincode: {
            type: Number,
            required: true,
        }

    }
)



const  checkOutItems = model("checkoutItems", checkoutScheema)
module.exports =  checkOutItems;