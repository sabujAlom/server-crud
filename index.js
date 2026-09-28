const express = require('express');
const app = express()
require('dotenv').config()
const port = process.env.PORT
const cors = require('cors')
app.use(cors())
app.use(express.json())



const { MongoClient, ObjectId } =require('mongodb');

const client = new MongoClient(process.env.DB_URI);

 async function connectToMongoDB() {
  try {
    await client.connect();
    const db = client.db("cars")
    const productsCollection = db.collection("products")

    //   get all data from mongodb
    app.get("/products", async(req, res)=>{
        const result = await productsCollection.find().toArray()
         res.send(result);
    })
    
    //get a single product
    app.get("/products/:productId", async(req, res)=>{
        const productId =req.params.productId
        const query = {_id:new ObjectId(productId)}
        
        const result = await productsCollection.findOne(query);
        res.send(result);
    })

    // post........................................
    app.post('/products' , async(req, res)=>{
      const newProduct= req.body;
      const result = await productsCollection.insertOne(newProduct);
      res.send(result)

    })

    // delete..................................
     app.delete("/products/:productId", async(req, res)=>{
       const productId = req.params.productId;
       const query ={_id: new ObjectId(productId)};
       const result = await productsCollection.deleteOne(query);
       res.send(result)
     })


    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
connectToMongoDB()






app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})