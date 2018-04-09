const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to connect to Mongoclient server');
    }
    
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // deleteMany
    // db.collection('Todos').deleteMany({ text: 'Something to do' }).then(result => {
    //     console.log(result);
    // }).catch(e => {
    //     console.log(e);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({ text: 'Something to do' }).then(result => {
    //     console.log(result);
    // }).catch(e => {
    //     console.log(e);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({ completed: true }).then(result => {
    //     console.log(result);
    // }).catch(e => {
    //     console.log(e);
    // });

    db.collection('Users').deleteMany({ name: 'Charles' });    
    db.collection('Users').findOneAndDelete({ _id: new ObjectId('5acacac06d0cb02b261bb12a') }).then(res => {
        console.log(JSON.stringify(res, undefined, 2));
    }).catch(e => {
        console.log(e);
    });
});