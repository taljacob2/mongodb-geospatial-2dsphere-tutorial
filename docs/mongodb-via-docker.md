# MongoDB Via Docker

In case you want to run a local [mongodb](https://www.mongodb.com/) server, while developing,
there is an option to spin up a mongodb server via a [docker](https://www.docker.com/) container.

It may be more convenient for you to do so instead of manually installing a mongodb
server on your local machine, but this issue is entirely up to personal taste.

> In case you are not familiar with docker, you can get started with docker [here](https://docs.docker.com/get-started/)

## Prerequsites

To run mongodb via a docker container, first you must install [docker](https://www.docker.com/) on your machine.

## `docker-compose`

`docker-compose` is a command in docker, that boots up multiple docker images as a "network".
So you could boot up this network at once, and shut it down at once - and all the containers will boot up or shut down at once.

Also, within a network, you can refer one container to another, to depend on each other, or share environment variables together.

To use the `docker-compose` command you require a `docker-compose.yaml` file, for it to read the network configuration you want it to establish.

We have pre-made a [`docker-compose.yaml`](/docker-compose.yaml) file for you to use,
that spins up local [mongodb](https://hub.docker.com/_/mongo) (DB) and [mongo-express](https://hub.docker.com/_/mongo-express) (UI) containers via docker.

## Usage

### Run `docker-compose`

- Run the network with:

    ```
    docker-compose up -d
    ```

    Then you would have:
    - mongodb listening on port `27014` so you could access the db with the connection string of `mongodb://rootuser:rootpass@localhost:27014/geospatialTutorialDb?authSource=admin`
    - mongo-express opening at http://localhost:8064

- Stop the network with:

    ```
    docker-compose down
    ```

- Stop the network, and delete the mongodb volume with:

    ```
    docker-compose down -v
    ```

### OPTIONAL: Run Raw Queries From `mongosh`

You may run raw queries for mongodb, via the `mongosh` of the `mongodb` container.

Once you `docker-compose up -d` this [`docker-compose.yaml`](/docker-compose.yaml) file,
and the `mongodb` container is running, then execute the following commands:

View all the running containers:
```
docker ps
```

Copy the `mongodb` container name, and then, enter the `mongodb` container `bash`:
```
docker exec -it <mongodb-container-name> bash
```

And then, enter the `mongosh` app with the authentication of the `$MONGO_DOCKER_URI` connection string:
```
mongosh $MONGO_DOCKER_URI
```

This will lead you to the `mongosh` app within the `mongodb` container, with the correct authentication.
And there you can execute raw queries in the database.

For example, you can test the connection, by executing:
```
show dbs
```
And this will list all the databases in the server.
