const express = require('express');
const app = express()
require('dotenv').config()
const port = process.env.PORT
const cors = require('cors')
app.use(cors())



const { MongoClient, ObjectId } =require('mongodb');

const client = new MongoClient(process.env.DB_URI);

 async function connectToMongoDB() {
  try {
    await client.connect();
    const db = client.db("cars")
    const productsCollection = db.collection("products")

    app.get("/products", async(req, res)=>{
        const result = await productsCollection.find().toArray()
         res.send(result);
    })

    app.get("/products/:productId", async(req, res)=>{
        const productId =req.params.productId
        const query = {_id:new ObjectId(productId)}
        
        const result = await productsCollection.findOne(query);
        res.send(result);
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