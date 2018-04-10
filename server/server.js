const express      = require('express');
const bodyParser   = require('body-parser');
const { ObjectId } = require('mongodb');

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

app.get('/todos',(req,res) => {
    Todo.find().then(todos => {
        res.send({ todos });
    }).catch(e => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req,res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(400).send();
    }
    
    Todo.findById(id).then(todo => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch(e => {
        res.status(400).send();
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports.app = app;