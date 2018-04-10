const { ObjectId } = require('mongodb');

// My code
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

Todo.remove({}).then(res => console.log(res));

Todo.findOneAndRemove({ _id: '5acc191b3fe7d140059a0568' }).then(res => {
    console.log(res);
}).catch(e => {
    console.log(e);
});

Todo.findByIdAndRemove('5acc191b3fe7d140059a0568').then(res => {
    console.log(res);
}).catch(e => {
    console.log(e);
});