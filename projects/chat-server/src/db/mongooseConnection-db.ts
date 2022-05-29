import mongoose from 'mongoose'

class MongooseConnectionDb {
    private static instance: MongooseConnectionDb
    private readonly dbName: string;

    private constructor(dbName: string) {
        mongoose.Promise = global.Promise;
        this.dbName = dbName;
    }

    static getInstance(dbName: string) {
        if (MongooseConnectionDb.instance) {
            return this.instance
        }
        this.instance = new MongooseConnectionDb(dbName);
        return this.instance;
    }

    connect() {
        return mongoose.connect(`mongodb://localhost:27017/${this.dbName}`);
    }

    close() {
        return mongoose.connection.close()
    }

}

export {mongoose, MongooseConnectionDb};