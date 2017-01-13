import DBConfig from "../interfaces/IndexedDBConfig";
import DBMigrator from "../interfaces/IndexedDBMigrator";

/**
 * IndexedDBAdapter
 */
export default class IndexedDBAdapter {
    private db: IDBDatabase;
    constructor() {
    }

    open(config:DBConfig, migrator:DBMigrator){
        let request = indexedDB.open(config.name, config.version);
        request.onsuccess = (event)=>{
            if(!(event.target instanceof IDBOpenDBRequest)){
                return ;
            }
            if(!(event.target.result instanceof IDBDatabase)){
                return ;
            }
            console.log("success open database:"+config.name);
            this.db = event.target.result;
        };
        request.onupgradeneeded = (event)=>{
            if(!(event instanceof IDBVersionChangeEvent && event.target instanceof IDBOpenDBRequest && event.target.result instanceof IDBDatabase)){
                return ;
            }
            console.log("need Upgrade! old:" + event.oldVersion + " new:"+event.newVersion);
            this.db = event.target.result;
            migrator.exec(event);
        }
    }
}
