const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxLength: [8, "Price cannot exceed 8 characters"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],

    selectedItem: {
        type: String,
        // required: [true, "Please enter product selectedItem"],
    },
    parentcategory: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true,
    },
    subcategory: {
        type: mongoose.Schema.ObjectId,
        ref: "Subcategory",
        // required: true,
    },
    Stock: {
        type: Number,
        required: [true, "Please enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1
    },
    numofReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },

            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true
            }
        },
    ],


    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }
} ,
 { timestamps: { createdAt: 'created_at' } }
// {
//     // Make Mongoose use Unix time (seconds since Jan 1, 1970)
//     timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
//   }
)

module.exports = mongoose.model("Product", productSchema)