const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
require("dotenv").config();

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

export default class MongoConnector {
  static mongodbClient: any;

  static connectToMongo(callback: (client: any) => void) {
    const mongoClientOptions = {
      poolSize: 50,
      // autoReconnect: true,
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    MongoClient.connect(
      `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@cluster0.kfm1c.mongodb.net/princess-connect-redive`,
      mongoClientOptions,
      function (connectErr: Error, client: any) {
        assert.equal(null, connectErr);
        MongoConnector.mongodbClient = client;

        console.log("Connected to MongoDB");
        callback(client);
      }
    );
  }
}
