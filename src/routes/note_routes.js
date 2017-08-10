// note_routes.js
var ObjectId = require('mongodb').ObjectID;


module.exports = function(app, db, fayeClient) {

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
        id = ObjectId(req.query.docId)
        const details = { '_id': id };
        db.collection('Restaurants').find(details).toArray((err, documents) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(documents);
            }
        });
    });

    app.get('/Users', (req, res) => {
        db.collection('Users').find({}).toArray((err, documents) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(documents);
            }
        });
    });

    app.get('/Users/:docId', (req, res) => {
        id = ObjectId(req.params.docId);
        const details = { '_id': id };
        db.collection('Users').find(details).toArray((err, documents) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(documents);
            }
        });
    });

    app.get('/Meta/', (req, res) => {
        // const details = { '_id': id };
        db.collection('Meta').find({}).toArray((err, documents) => {
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

    app.get('/Chat', (req, res) => {
        db.collection('Chat').find().toArray((err, documents) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(documents);
            }
        });
    });

    // PUT ROUTES
    app.put('/Users', (req, res) => {

        if (req.body.mapping) {

            id = ObjectId("59836db8f36d2839ce8cd389");
            var details = { '_id': id };
            var name = req.body.name;
            var nameIdPair = {}
            nameIdPair[name] = req.body.uId
            console.log("!!!", req.body.uId)
            var task = { $push: nameIdPair };
            console.log("??", task)
            db.collection('Users').update(details, task, (err, result) => {
                if (err) {
                    res.send({ 'error': err });
                } else {
                    res.send();
                }
            });

        } else if (req.body.resetting) {
            id = ObjectId("59836db8f36d2839ce8cd389");
            var details = { '_id': id };
            db.collection('Users').deleteMany({ }, (err, result) => {
                if (err) {
                    res.send({ 'error': err });
                } else {
                    res.send();
                }
            });
            setTimeout(function() {
                db.collection('Users').insert(details, (err, result) => {
                    if (err) {
                        res.send({ 'error': err });
                    } else {
                        res.send();
                    }
                });
            }, 600)
        } else {
            id = ObjectId(req.body._id);
            var details = { '_id': id };
            var task = { $set: { "vote": req.body.place } };
            // fayeClient.publish("/test", {
            //     text: req.body.place
            // });
            
            fayeClient.publish("/test", {
                text: req.body.place
            });

            db.collection('Users').update(details, task, (err, result) => {
                if (err) {
                    res.send({ 'error': err });
                } else {
                    //console.log("results", result);
                    res.send();
                }
            });
        }
    });

    app.put('/Restaurants', (req, res) => {
        id = ObjectId(req.body.docId);
        const details = { '_id': id };
        var task = { $push: { "restaurants": req.body.restaurants } };
        if (req.body.multi) {
            task = { $set: { "restaurants": req.body.restaurants } }
        } else {
            fayeClient.publish("/addRest", {
                text: req.body.restaurant
            });
        }
        db.collection('Restaurants').update(details, task, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send();
            }
        });
    });

    app.put('/Meta', (req, res) => {
        id = ObjectId(req.body.docId);
        const details = { '_id': id };
        console.log("ah", details)
        var task = ""
        if (req.body.reset) {
            console.log("here1")
            task = { $set: { "resetVoteCount": req.body.resetCount } };
        } else {
            task = { $set: { "lastInit": req.body.logInTime } };
        }
        db.collection('Meta').update(details, task, (err, result) => {
            if (err) {
                res.send({ 'error': err });
            } else {
                res.send();
            }
        });
    });

    app.put('/Restaurants', (req, res) => {
        id = ObjectId(req.body.docId);
        const details = { '_id': id };
        const task = { $set: { "restToAdd": req.body.logInTime } };
        db.collection('Meta').update(details, task, (err, result) => {
            if (err) {
                res.send({ 'error': err });
            } else {
                res.send();
            }
        });
    });

    app.put('/Chat', (req, res) => {
        id = ObjectId(req.body.docId)
        const details = { '_id': id }
        if (!req.body.reset) {
            const task = { $push: { "messages": [req.body.uId, req.body.time, req.body.message] } };
            console.log("~~~", req.body.uId)
            db.collection('Chat').update(details, task, (err, result) => {
                if (err) {
                    res.send({ 'error': err });
                } else {
                    res.send();
                }
            });
            fayeClient.publish("/chat", {
                text: req.body.place
            });
        } else {
            console.log("resetting chat", details)
            const task = { $set: { "messages": [] } }
            db.collection('Chat').update(details, task, (err, result) => {
                if (err) {
                    res.send({ 'error': err });
                } else {
                    res.send();
                }
            })
        }
    });


    // POST ROUTES
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

    app.post('/redraw', (req, res) => {
        
        fayeClient.publish("/redraw", {
                text: "ok"
            });
    });

    app.post('/Users', (req, res) => {
        id = ObjectId()
        const newUser = {
            "_id": id,
            "vote": ""
        };
        console.log("new user slot", newUser)
        db.collection('Users').insert(newUser, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(id);
            }
        });
    });
};


//Users[name, remaining votes]
//Daily_votes[User1's vote, U2's vote, U3 vote, U4v, U5v] "0 by default"
//Restaurants[Mimi's, Kroger, City, ...]