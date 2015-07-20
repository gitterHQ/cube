// Much like db.collection, but caches the result for both events and metrics.
// Also, this is synchronous, since we are opening a collection unsafely.
var types = module.exports = function(db) {
  var collections = {};
  return function(type) {
    var collection = collections[type];
    if (!collection) {
      collection = collections[type] = {};
      db.collection(type + "_events", function(error, events) {
        collection.events = events;
      });
      db.collection(type + "_metrics", function(error, metrics) {
        collection.metrics = metrics;
      });
    }
    return collection;
  };
};

var eventRe = /_events$/;

types.getter = function(db) {
  return function(request, callback) {
    db.collections(function(error, names) {
      handle(error);

      var _types = names
          .map(function(d) { return d.s.name; }) // why is it s - look at Mongo Docs
          .filter(function(d) { return eventRe.test(d); })
          .map(function(d) { return d.substring(0, d.length - 7); })
          .sort();

      callback(_types);
    });
  };
};

function handle(error) {
  if (error) throw error;
}
