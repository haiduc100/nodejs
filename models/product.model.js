const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/ExpressDemo");
const mongoosePaginate = require('mongoose-paginate-v2');
const ProductSchema = mongoose.Schema(
  {
    category: String,
    productName: String,
    price: Number,
    quantity: Number,
  },
  { collection: "Product" }
);
ProductSchema.plugin(mongoosePaginate);
const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
