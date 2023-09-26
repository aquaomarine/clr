const productService = require("../services/ProductService");
var Product = require('../models/Product');

//get all products
exports.getAllProducts = async (req, res) => {
  try {
    Product.find().lean()
    .then(product => {
        res.send(product)
    })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// new product
exports.createProduct = async (req, res) => {

const product = new Product({
    name : req.body.name,
    price : req.body.price,
    description: req.body.description,
})
product.save(product).then(data => {//res.send(data)
        res.redirect(`/`);
    })
    .catch(err =>{
        res.status(500).send({
            message : err.message || "Some error occurred while creating a create operation"
        });
    });

};

//get product to show
exports.getProductById = async (req, res) => {
  Product.findById(req.params.id).lean().then((product) => {
    res.render('product-show', { product: product })
  }).catch((err) => {
    console.log(err.message);
  })
};

// UPDATE to write over post 
exports.updateProduct = async (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body).lean()
    .then(product => {
      res.redirect(`api/products/${product._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
};

//delete product not following API standards
exports.deleteProduct = async (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
        res.redirect('/');
    }
    else { console.log('Error in Product delete :' + err); }
}).lean();
};
 
//delete 
exports.deleteProductBackend = async (req, res) => {
  try {
    const product = await productService.deleteProductBackend(req.params.id);
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


