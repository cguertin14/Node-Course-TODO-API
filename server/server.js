const _            = require('lodash');
const express      = require('express');
const bodyParser   = require('body-parser');
const { ObjectId } = require('mongodb');

// Database code
const { mongoose } = require('./db/mongoose');
const { User }     = require('./models/user');
const { Todo }     = require('./models/todo');

// Server
const app = express();
// Port
const port = process.env.PORT || 3000;

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
        return res.status(404).send();
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

app.delete('/todos/:id', (req,res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    
    Todo.findByIdAndRemove(id).then(todo => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch(e => {
        res.status(400).send();
    });
});

app.patch('/todos/:id',(req,res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text','completed']);

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    body.completed = body.completed === 'true';

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then(todo => {
        if (!todo) {
            res.status(404).send();    
        }

        res.send({ todo });
    }).catch(e => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports.app = app;