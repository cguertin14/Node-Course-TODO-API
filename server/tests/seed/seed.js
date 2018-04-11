const { ObjectId } = require('mongodb');
const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');
const jwt = require('jsonwebtoken');

// Seed data
const userOneId = new ObjectId();
const userTwoId = new ObjectId();
const users = [
    {
        _id: userOneId,
        email: 'cg@live.ca',
        password: 'userOnePass',
        tokens: [
            {
                access: 'auth',
                token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
            }
        ]
    },
    {
        _id: userTwoId,
        email: 'test@example.com',
        password: 'userTwoPass',
        tokens: [
            {
                access: 'auth',
                token: jwt.sign({ _id: userTwoId, access: 'auth' }, 'abc123').toString()
            }
        ]
    },
];

// Seed data
const todos = [
    { _id: new ObjectId(), text: 'Boire du lait', _creator: userOneId },
    { _id: new ObjectId(), text: 'Boire du sirop', completed: true, completedAt: 333, _creator: userTwoId }
];

const populateTodos = (done) => {
    Todo.remove({}).then(() => Todo.insertMany(todos)).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();
        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
}