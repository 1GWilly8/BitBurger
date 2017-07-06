// note_routes.js
var ObjectID = require('mongodb').ObjectID;


module.exports = function(app, db) {
    // app.get('/tasks/:id', (req, res) => {
    //     const id = req.params.id;
    //     const details = { '_id': new ObjectID(id) };
    //     db.collection('tasks').findOne(details, (err, item) => {
    //         if (err) {
    //             res.send({ 'error': 'An error has occurred' });
    //         } else {
    //             res.send(item);
    //         }
    //     });
    // });

    app.get('/Daily_votes', (req, res) => {
        db.collection('Daily_votes').find({$natural:-1}) (err, lastEntry) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(lastEntry.getTimestamp());
            }
        }
    });

    // app.delete('/tasks/:id', (req, res) => {
    //     const id = req.params.id;
    //     const details = { '_id': new ObjectID(id) };
    //     db.collection('tasks').remove(details, (err, item) => {
    //         if (err) {
    //             res.send({ 'error': 'An error has occurred' });
    //         } else {
    //             res.send("task " + id + " delete!");
    //         }
    //     });
    // });

    app.put('/Daily_votes/:vote', (req, res) => {
        const vote = req.params.vote;
        const details = { '_id': $natural:-1 };
        const task = {$set: {"uId": vote}};
        db.collection('tasks').update(details, task, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(task);
            }
        });
    });

    app.post('/Daily_votes', (req, res) => {
        const new ballotSheet = {"Arrow": "0", "Dustin": "0", "Fioretti": "0", "Gus": "0",
            "Jeremy": "0", "Koby": "0", "Lafe": "0", "Lamar": "0", "Malik": "0", "Will": "0"};
        console.log(ballotSheet);
        db.collection('Daily_votes').insert(ballotSheet, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.post('/Restaurants/:newRestaurant', (req, res) => {
        const new restaurant = req.params.newRestaurant
        db.collection('Restaurants').insert(restaurant, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};



//Users[name, remaining votes]
//Daily_votes[User1's vote, U2's vote, U3 vote, U4v, U5v] "0 by default"
//Restaurants[Mimi's, Kroger, City, ...]
