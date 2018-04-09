const express      = require('express');
const bodyParser   = require('body-parser');

// Database code
const { mongoose } = require('./db/mongoose');
const { User }     = require('./models/user');
const { Todo }     = require('./models/todo');

// Server
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/todos',(req,res) => {
    let todo = new Todo({
        text: req.body.text
    });
    todo.save().then(todo => {
        res.status(201).send(todo);
    }).catch(e => {
        res.status(400).send(e)
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports.app = app;