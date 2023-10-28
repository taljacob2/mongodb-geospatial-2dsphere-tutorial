conn = new Mongo()
db = conn.getDB(`${process.env.DB_DATABASE}`)


db.restaurants.createIndex({ location: "2dsphere" })
db.neighborhoods.createIndex({ geometry: "2dsphere" })
