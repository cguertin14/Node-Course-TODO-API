const { mongoose } = require('./../server/db/mongoose');
const { Todo }     = require('./../server/models/todo');
const { User }     = require('./../server/models/user');
const { ObjectId } = require('mongodb');

//const _id = '5acc0710637c087c89c96a';
const _id = '5acbf0e32bf9f55f2fa28d98'

if (!ObjectId.isValid(_id)) {
    console.error('Id not valid');
}

// Todo.find({ _id }).then(todos => {
//     console.log('Todos',JSON.stringify(todos,undefined,2));
// }).catch(e => console.error(e));

// Todo.findOne({ _id }).then(todo => {
//     console.log('Todo',JSON.stringify(todo,undefined,2));
// }).catch(e => console.error(e));

// Todo.findById(_id).then(todo => {
//     if (!todo) {
//         return console.log('Id not found');
//     }    
//     console.log('Todo By Id',JSON.stringify(todo,undefined,2));
// }).catch(e => console.error(e));

User.findById(_id).then(user => {
    if (!user) {
        return console.log('Id not found');
    }    
    console.log('User By Id',JSON.stringify(user,undefined,2));
}).catch(e => console.error(e));