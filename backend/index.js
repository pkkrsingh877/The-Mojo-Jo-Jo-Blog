const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
require('dotenv').config();

// Middleware to set the Access-Control-Allow-Origin header for a specific domain.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://the-mojo-jo-jo-blog.netlify.app');
  
    // Set additional CORS headers if needed (e.g., for handling different HTTP methods or headers).
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    next();
});

//setting up data connection

const databaseSetup = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB Connection Successful!');
    } catch (error) {
        console.log('DB Connection Unsuccessful!');
        console.log(error);
    }
}

databaseSetup();

app.use(express.json());

app.delete('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Blog.deleteOne({ _id: id });
    } catch (error) {
        console.log(error);
    }
    res.end();
})

app.post('/create', async (req, res) => {
    try {
        const { title, body, author } = req.body;
        const blog = await Blog.create({ title, body, author });
    } catch (error) {
        console.log(error);
    }
    res.end();
});

app.get('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        res.json(blog);
    } catch (error) {
        console.log(error);
    }
    res.end();
});

app.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.json(blogs);
    } catch (error) {
        console.log(error);
    }
    res.end();
});

app.listen(process.env.PORT, () => {
    console.log('Server is running...');
});
