// note_routes.js
var ObjectID = require('mongodb').ObjectID;


module.exports = function(app, db) {
// GET ROUTES
    app.get('/votes', (req, res) => {
        db.collection('votes').find({}).toArray((err, documents) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(documents);
            }
        });
    });

    app.get('/Restaurants', (req, res) => {
        db.collection('Restaurants').find({}).toArray((err, documents) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(documents);
            }
        });
    });

    app.get('/messages', (req, res) => {
        db.collection('messages').find({}).toArray((err, documents) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(documents);
            }
        });
    });

// POST ROUTES
    app.post('/votes', (req, res) => {
        const vote = {
            user: req.body.user,
            restaurant: req.body.restaurant
        };
        db.collection('votes').insert(vote, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};

app.post('/restaurants', (req, res) => {
    const restaurant = {
        restaurant: req.body.restaurant,
        num_of_votes: req.body.numofvotes,
        is_active: req.body.isactive
    };
    db.collection('restaurants').insert(restaurant, (err, result) => {
        if (err) {
            res.send({ 'error': 'An error has occurred' });
        } else {
            res.send(result.ops[0]);
        }
    });
});
};

app.post('/messages', (req, res) => {
    const message = {
        message: req.body.message,
        user: req.body.user,
        date: req.body.date
    };
    db.collection('messages').insert(message, (err, result) => {
        if (err) {
            res.send({ 'error': 'An error has occurred' });
        } else {
            res.send(result.ops[0]);
        }
    });
});
};

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

    // app.put('/Daily_votes/:id', (req, res) => {
    //     const id = req.params.id;
    //     const details = { '_id': new ObjectID(id) };
    //     const vote = { $set: {} };
    //     for (key in req.body) {
    //         vote['$set'][key] = req.body[key]
    //     }
    //     db.collection('Daily_votes').update(details, vote, (err, result) => {
    //         if (err) {
    //             res.send({ 'error': 'An error has occurred' });
    //         } else {
    //             res.send(vote);
    //         }
    //     });
    // });

    // app.post('/daily_votes', (req, res) => {
    //     const ballotSheet = { user: req.body.user };
    //     console.log(ballotSheet);
    //     db.collection('daily_votes').insert(ballotSheet, (err, result) => {
    //         if (err) {
    //             res.send({ 'error': 'An error has occurred' });
    //         } else {
    //             res.send(result.ops[0]);
    //         }
    //     });
    // });

//Users[name, remaining votes]
//Daily_votes[User1's vote, U2's vote, U3 vote, U4v, U5v] "0 by default"
//Restaurants[Mimi's, Kroger, City, ...]
