#!/bin/bash

mongoimport $MONGO_URI -c restaurants --file /initdb/restaurants.json --jsonArray
