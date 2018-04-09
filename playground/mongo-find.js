const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to connect to Mongoclient server');
    }
    
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').find({ _id: new ObjectId('5acabf105f37913161447efd') }).toArray().then(docs => {
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }).catch(e => {
    //     console.error(e)
    // });

    // db.collection('Todos').find().count().then(count => {
    //     console.log(`Todos count: ${count}`);
    // }).catch(e => {
    //     console.error(e)
    // });

    db.collection('Users').find({ name: 'Martin' }).toArray().then(docs => {
        console.log(JSON.stringify(docs, undefined, 2));
    }).catch(e => {
        console.error(e)
    });
});