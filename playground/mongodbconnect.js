const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to connect to Mongoclient server');
    }
    
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err,res) => {
        if (err)  {
            return console.log('Unable to insert todo', err);
        }

        console.log(JSON.stringify(res.ops, undefined, 2));
    });

    db.collection('Users').insertOne({
        name: 'Charles',
        age: 20,
        location: 'Blainville'
    }, (err, res) => {
        if (err)  {
            return console.log('Unable to insert User', err);
        }

        console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 2));
    });

    client.close();
});