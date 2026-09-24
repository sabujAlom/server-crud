const express = require('express');
const app = express()
require('dotenv').config()
const port = process.env.PORT
const cors = require('cors')
app.use(cors())



const { MongoClient } =require('mongodb');

const client = new MongoClient(process.env.DB_URI);

 async function connectToMongoDB() {
  try {
    await client.connect();





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