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
  // console.log("in server get");
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

  //delete method
  router.delete("/delete", (req, res)=>{
    const { id } = req.body;
    Item.findOneAndDelete(id, err =>{
      if (err) return res.send(err);
      return res.json({success: true});
    });
  });

  //update method
  router.post("/update", (req, res) =>{
    const {id, update} = req.body;
    console.log("in update, req: ", id, update);
    Item.findOneAndUpdate(id, update, err => {
      console.log("inside find one and update, id: ", id, err);
      if (err) return res.json({success: false, error: err});
      return res.json({sucess: true});
    });
  });

app.use("/api", router);

app.listen(port, ()=> console.log(`Listening on port ${port}`));