const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Import Routes
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

dotenv.config();

// Set mongoose parameters.
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
// Connect to DB.
mongoose.connect(
    process.env.DB_CONNECT,
    ()=>console.log('Connected to DB')
);

// Middlewear to send post requests and parse their body.
app.use(express.json());
// Route Middlewear
app.use('/api/user', authRoute);
app.use('/api/posts', postsRoute);

app.listen(3000, () => console.log('Server up and running...'));