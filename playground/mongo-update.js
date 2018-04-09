const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to connect to Mongoclient server');
    }
    
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // deleteMany
    db.collection('Users').findOneAndUpdate({ 
        _id: new ObjectId('5acacf66efcd6e42a27f337a') 
    }, {
        $set: {
            name: 'Natashaaaaaa'
        },
        $inc: {
            age: 1
        }
    }).then(docs => {
        console.log(JSON.stringify(docs, undefined, 2));
    }).catch(e => {
        console.error(e);
        
    })
});