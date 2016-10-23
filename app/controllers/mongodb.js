var MongoClient = require('mongodb').MongoClient;
var url =   "mongodb://nirav:One1992@ds063856.mlab.com:63856/eyeapp";

var find = function (collectionName, obj, callback) {
	MongoClient.connect(url, function (err, db) {
		var collection = db.collection(collectionName);
		collection.find(obj).toArray( function (err, result){
			db.close();
			if(err) callback(true, err);
			else callback(false, result);
		})
	})

}
var insert = function (collectionName, obj, callback) {
    try {
        MongoClient.connect(url, function (err, db) {
            var collection = db.collection(collectionName);

            collection.insert(obj, function (err, result) {

                db.close();
                if (err) callback(true);
                else callback(false);
            });
        });
    } catch (err) {
        console.log(err);
        callback(true);
    }
}


module.exports.find = find;
module.exports.insert = insert;