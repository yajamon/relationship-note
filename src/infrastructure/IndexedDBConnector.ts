import DBConfig from "../interfaces/IndexedDBConfig";
import DBMigrator from "../interfaces/IndexedDBMigrator";

export default class IndexedDBConnector {
    private static _db: IDBDatabase;

    static open(config:DBConfig, migrator:DBMigrator){
        let request = indexedDB.open(config.name, config.version);
        request.onupgradeneeded = (event)=>{
            if(!(event instanceof IDBVersionChangeEvent && event.target instanceof IDBOpenDBRequest && event.target.result instanceof IDBDatabase)){
                return ;
            }
            console.log("need Upgrade! old:" + event.oldVersion + " new:"+event.newVersion);
            this._db = event.target.result;
            migrator.exec(event);
        }
        return new Promise((resolve) => {
            request.onsuccess = resolve;
        }).then((event: Event) => {
            if (!(event.target instanceof IDBOpenDBRequest && event.target.result instanceof IDBDatabase)) {
                return;
            }
            console.log("success open database:" + config.name);
            this._db = event.target.result;
            return this._db;
        });
    }

    static get db(): Promise<IDBDatabase> {
        if (this._db) {
            return Promise.resolve(this._db);
        }
        return new Promise((resolve) => {
            setInterval(() => {
                if (this._db) {
                    resolve(this._db);
                }
            }, 100);
        });
    }

}
