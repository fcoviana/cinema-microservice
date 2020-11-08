const mongodb = require("../config/mongodb");
const ObjectId = require("mongodb").ObjectId;

function getAllCities(callback) {
    mongodb.connect((err, db) => {
        db.collection("cinemaCatalog").find({}, { cidade: 1, uf: 1, pais: 1 }).toArray(callback);
    })
}

function getCinemasByCityId(cityId, callback) {
    var objCityId = ObjectId(cityId);
    mongodb.connect((err, db) => {
        db.collection("cinemaCatalog").find({ _id: objCityId }, { cinemas: 1 }).toArray((err, cities) => {
            if (err) return callback(err, null);
            callback(err, cities[0].cinemas);
        });
    });
}

function getMoviesByCinemaId(cinemaId, callback){
    var objCinemaId = ObjectId(cinemaId);
    mongodb.connect((err, db) => {
        db.collection("cinemaCatalog").aggregate([
            {$match: {"cinemas._id": objCinemaId}},
            {$unwind: "$cinemas"},
            {$unwind: "$cinemas.salas"},
            {$unwind: "$cinemas.salas.sessoes"},
            {$group: {_id: { filme: "$cinemas.salas.sessoes.filme", idFilme: "$cinemas.salas.sessoes.idFilme"}}}
        ]).toArray(callback);
    });
}

function disconnect() {
    return mongodb.disconnect();
}

module.exports = { getAllCities, getCinemasByCityId, getMoviesByCinemaId, disconnect }