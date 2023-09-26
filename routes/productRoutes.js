const express = require("express");
var Product = require('../models/Product');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteProductBackend,
} = require("../controllers/ProductController");
const services = require('../services/ProductService');

//setting home route to list.handlebars to list documents from Mongoose/Mongo.DB
router.get('/', (req, res) => {
  Product.find((err, docs) => {
      if (!err) {
          res.render("list", {
              list: docs
          });
      }
      else {
          console.log('Error in retrieving product list :' + err);
      }
  }).lean();
});

// EDIT to override  POST
router.get('/api/products/:id/edit', (req, res) => {
  Product.findById(req.params.id, function(err, product) {
    res.render("update-edit", {product: product});
  })
})

//services for views
router.get("/update-edit", services.update)

router.get("/product-show", services.show)

router.get("/create", services.create)



//API
router.route("/api/products").get(getAllProducts).post(createProduct);
router.get("/api/products/:id", getProductById)
router.put("/api/products/:id", updateProduct)
router.delete("/api/products/:id", deleteProductBackend)
router.get("/delete/:id",deleteProduct)

 
module.exports = router;