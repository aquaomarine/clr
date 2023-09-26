const ProductModel = require("../models/Product");
// import * as ProductModel from '../models/Product.cjs';

exports.listRoutes = (req, res) => {
  // Make a get request to /api/products
  routes.get('http://localhost:3000/api/products')
      .then(function(response){
          res.render('list', { products : response.data });
      })
      .catch(err =>{
          res.send(err);
      })

  
}

//exports to render views
exports.update = (req, res) =>{
  res.render('update-edit');
}

exports.show = (req, res) =>{
  res.render('product-show');
}

exports.create = (req, res) =>{
  res.render('create');
}

//helper services
exports.getAllProducts = async () => {
  return await ProductModel.find().lean();
};
 
exports.createProduct = async (product) => {
  return await ProductModel.create(product);
};
exports.getProductById = async (id) => {
  return await ProductModel.findById(id).lean();
};
 
exports.updateProduct = async (id, product) => {
  return await ProductModel.findByIdAndUpdate(id, product).lean();
};
 
exports.deleteProduct = async (id) => {
  return await ProductModel.findByIdAndDelete(id).lean();
};
