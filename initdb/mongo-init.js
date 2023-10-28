conn = new Mongo()
db = conn.getDB("geospatialTutorialDb")


db.restaurants.createIndex({ location: "2dsphere" })
db.neighborhoods.createIndex({ geometry: "2dsphere" })
