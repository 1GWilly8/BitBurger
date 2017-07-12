const noteRoutes = require('./note_routes');

module.exports = function(app, db, faye) {
  noteRoutes(app, db, faye);
  // Other route groups could go here, in the future
};