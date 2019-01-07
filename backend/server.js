const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const port = 3001;
const app = express();
const router = express.Router();

app.use(bodyParser.json());

const dbRoute = 'mongodb://localhost/react-mongo-test';
mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
  );
  

const ItemSchema = new mongoose.Schema({
    id: Number,
    name: String
}, {timestamps: true});
    
    // Store the Schema under the name 'Item'
 module.exports = mongoose.model('Item', ItemSchema);
    
    // Retrieve the Schema called 'Item' and store it to the variable Item
    var Item = mongoose.model('Item');

let db = mongoose.connection;

db.once("open", ()=> console.log("connected to the database!"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//get method
router.get("/items", (req, res) => {
    Item.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });

  //create method
  router.post("/items", (req, res) => {
    let newItem = new Item(req.body);
    newItem.save(function(err){
        if(err) return res.json({ success: false, error: err });
        return res.json({success: true});
    })
  });

app.use("/api", router);

app.listen(port, ()=> console.log('Listening on port ${port}'));