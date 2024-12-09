const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'fileSystemDB';

app.use(cors());
app.use(express.json());

let db;

// Connect to MongoDB
MongoClient.connect(mongoUrl)
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db(dbName);
    })
    .catch(err => console.error('MongoDB connection error:', err));

// CRUD Operations
// Create folder
app.post('/folders', async (req, res) => {
    try {
        const { name, path, parent } = req.body;
        const result = await db.collection('folders').insertOne({
            name,
            path,
            parent,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read folders
app.get('/folders', async (req, res) => {
    try {
        const folders = await db.collection('folders').find().toArray();
        res.json(folders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update folder
app.put('/folders/:id', async (req, res) => {
    try {
        const { name, path } = req.body;
        const result = await db.collection('folders').updateOne(
            { _id: new ObjectId(req.params.id) },
            {
                $set: {
                    name,
                    path,
                    updatedAt: new Date()
                }
            }
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete folder
app.delete('/folders/:id', async (req, res) => {
    try {
        const result = await db.collection('folders').deleteOne({
            _id: new ObjectId(req.params.id)
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});