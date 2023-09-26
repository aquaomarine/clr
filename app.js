
require("./models/Product");

const express = require("express");
const { engine } = require ('express-handlebars');
const methodOverride = require('method-override')
const app = express();
const mongoose = require("mongoose");
const productController = require('./controllers/productController');
const bodyParser = require('body-parser');
const router = express.Router();
const productRouter = require("./routes/productRoutes");

const  mongoAtlasUri =
        "mongodb+srv://root:root@clrtrainning.j0i44g1.mongodb.net/?retryWrites=true&w=majority";
  try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'test'},
      () => console.log(" Mongoose is connected")
      
    )

  } catch (e) {
    console.log("could not connect");
  };
  
 
app.engine('handlebars', engine({extname: 'handlebars', defaultLayout: 'mainlayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'handlebars');

app.set("views", "./views");
//middlewares

app.use(express.json());
 
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
//port configuration 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use('/index', express.static(__dirname, + "assets/index"))
app.use("/api/products", productRouter);
app.use(express.static('public'))
app.use('/', require('./routes/productRoutes'))
app.use(methodOverride('_method'))
 
module.exports = app;