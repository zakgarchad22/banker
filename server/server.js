const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const api = require('./routes/api');

const app = express()
const PORT = 8080

// Middleware
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://127.0.0.1:27017/transactionsDB') 
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err))
app.use('/', api)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
