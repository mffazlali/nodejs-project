import {Db, MongoClient} from 'mongodb'

export default class MongodbConnectionDb {
    private readonly client: MongoClient;
    public readonly db: Db;
    private static instance: MongodbConnectionDb

    private constructor(dbName: string) {
        this.client = new MongoClient('mongodb://localhost:27017');
        this.db = this.client.db(dbName);
    }

    static getInstance(dbName: string) {
        if (MongodbConnectionDb.instance) {
            return this.instance
        }
        this.instance = new MongodbConnectionDb(dbName);
        return this.instance;
    }

    connect() {
        return this.client.connect();
    }

    close() {
        this.client.close().then();
    }
}