
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const recipeRoutes = require('./routes/recipeRoutes');

dotenv.config();

const app = express();
app.use(cors());

app.use(
    cors({
        origin:process.env.CLIENT_URL,
        methods:['GET','POST','DELETE','PUT'],
    
    })
);

app.use(express.json());

app.use('/api', recipeRoutes);



mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(5000, () => console.log('Server running on port 5000 and Database Connected')))
    .catch(error => console.error('Connection error', error.message));






