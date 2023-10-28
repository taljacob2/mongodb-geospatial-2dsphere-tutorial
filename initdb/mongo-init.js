conn = new Mongo();
db = conn.getDB("geospatialTutorialDb");


db.restaurants.find({});
