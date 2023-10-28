conn = new Mongo()
db = conn.getDB(`${process.env.DB_DATABASE}`)


// TODO: DEBUG
console.log("process.env", process.env)

db.restaurants.createIndex({ location: "2dsphere" })
db.neighborhoods.createIndex({ geometry: "2dsphere" })
