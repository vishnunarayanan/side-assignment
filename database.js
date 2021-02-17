const { MongoMemoryServer } = require('mongodb-memory-server');
(async () => {
    const mongod = new MongoMemoryServer({
        instance: {
            port: 27017,
            ip: '127.0.0.1',
            dbName: 'properties'
        }
    });
    const uri = await mongod.getUri();
    const port = await mongod.getPort();
    const dbPath = await mongod.getDbPath();
    const dbName = await mongod.getDbName();
    console.log(`Database uri: ${uri}`);
    console.log(`Database running on port: ${port}`);
    console.log(`Database Name: ${dbName}`);
    console.log(`Local DB Storage path ${dbPath}`);
})();
