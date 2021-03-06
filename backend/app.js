
require('dotenv').config();
//require('./config/db');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
//const hpp = require('hpp');
//const cors = require('cors');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const likeRoutes = require('./routes/like');
const commentRoutes = require('./routes/comment');

app.use(express.json());
app.use(cookieParser());

//app.use(hpp());
//app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/post', likeRoutes);
app.use('/api/post', commentRoutes);
//app.use('/api/like', likeRoutes);
//app.use('/api/comment', commentRoutes);

module.exports = app;
