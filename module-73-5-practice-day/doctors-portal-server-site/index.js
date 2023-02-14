const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient } = require('mongodb');


const app = express();
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());
// database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ugo5b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
     try {
          await client.connect();
          const database = client.db('doctorsPortalPractice');
          const appointmentsCollection = database.collection(database);

          // post appointments
          app.post('/appointments', async (req, res) => {
               const appointments = req.body;
               const result = await appointmentsCollection.insertOne(appointments);
               res.json(result);
          })
          // get appointments
          app.get('/appointments', async (req, res) => {
               const email = req.body.email;
               

          })
     }
     finally {
          // await client.close()
     }

}
run().catch(console.dir);


app.get('/', (req, res) => {
     res.send('doctors portal practice');
})

app.listen(port, () => {
     console.log('listing the port', port);
})