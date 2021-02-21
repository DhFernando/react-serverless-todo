const mongo = require("mongodb");

const mongoClient = mongo.MongoClient;
const DB_NAME = "testDB";

const connectDatabase = () =>
  mongoClient.connect("mongodb+srv://dh:hasitha@cluster0.3mzfc.mongodb.net", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

const createConnection = async () =>  await connectDatabase();
 
const getDbConnection = conn => {
  let _DBConnection;
  if (conn) {
    _DBConnection = conn.db(DB_NAME);
  }
  return _DBConnection;
};

const closeConnection = conn => {
  if (conn) {
    return conn.close();
  }
};

module.exports = {
  createConnection,
  getDbConnection,
  closeConnection
};
