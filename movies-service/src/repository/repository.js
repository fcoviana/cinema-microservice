const mongodb = require("../config/mongodb");

function getAllMovies(callback) {
  mongodb.connect((err, db) => {
    db.collection("movies").find().toArray(callback);
  });
}

function getMovieById(id, callback) {
  mongodb.connect((err, db) => {
    db.collection("movies").findOne(
      { _id: require("mongodb").ObjectId(id) },
      callback
    );
  });
}

function getMoviePremiers(callback) {
  var monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);
  monthAgo.setHours(0, 0, 0);
  monthAgo.setMilliseconds(0);

  mongodb.connect((err, db) => {
    db.collection("movies")
      .find({ dataLancamento: { $gte: monthAgo } })
      .toArray(callback);
  });
}

function disconnect() {
  return mongodb.disconnect();
}

function create(callback) {
  mongodb.connect((err, db) => {
    db.collection("movies").insert(
      [
        {
          titulo: "Os Vingadores: Guerra Infinita",
          sinopse: "Os heróis mais poderosos da Marvel enfrentando o Thanos",
          duracao: 120,
          dataLancamento: ISODate("2018-11-01T00:00:00Z"),
          imagem:
            "https://www.jornalcontabil.com.br/wp-content/uploads/2019/04/VINGADORES.jpg",
          categorias: ["Aventura", "Ação"],
        },
        {
          titulo: "Os Vingadores: Era de Ultron",
          sinopse: "Os heróis mais poderosos da Marvel enfrentando o Ultron",
          duracao: 110,
          dataLancamento: ISODate("2016-11-01T00:00:00Z"),
          imagem:
            "https://www.jornalcontabil.com.br/wp-content/uploads/2019/04/VINGADORES.jpg",
          categorias: ["Aventura", "Ação"],
        },
        {
          titulo: "Os Vingadores",
          sinopse: "Os heróis mais poderosos da Marvel enfrentando o Loki",
          duracao: 100,
          dataLancamento: ISODate("2014-11-01T00:00:00Z"),
          imagem:
            "https://www.jornalcontabil.com.br/wp-content/uploads/2019/04/VINGADORES.jpg",
          categorias: ["Aventura", "Ação"],
        },
      ],
      callback
    );
  });
}

// create((err, movies) => console.log('wewew'))

module.exports = { getAllMovies, getMovieById, getMoviePremiers, disconnect };
