const mongoose = require("mongoose");
// import mongoose from 'mongoose';
const Schema = mongoose.Schema;
 
const productSchema = new Schema({
  name: String,
  price: Number,
  description: String,
});
 
module.exports = mongoose.model("Product", productSchema);