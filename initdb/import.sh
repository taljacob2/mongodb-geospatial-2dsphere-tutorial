#!/bin/bash

mongoimport $MONGO_URI -c restaurants --file /initdb/restaurants.json --jsonArray
mongoimport $MONGO_URI -c neighborhoods --file /initdb/neighborhoods.json --jsonArray
