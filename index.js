
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const uri = "mongodb+srv://peteralidante254:qwertyPeter@cluster0.ezaoqyy.mongodb.net/?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/update', async (req, res) => {
    const { fullname, adm, date } = req.body;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('schooldb');
        const collection = db.collection('students');
        await collection.updateOne({ adm: Number(adm) }, { $set: { fullname, date } });
        res.send('Data updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating data');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
