import DBConfig from "../interfaces/IndexedDBConfig";
import DBMigrator from "../interfaces/IndexedDBMigrator";

import SubjectRecord from "../interfaces/subjectRecord";

/**
 * IndexedDBAdapter
 */
export default class IndexedDBAdapter {
    private db: IDBDatabase;
    constructor() {
    }

    open(config:DBConfig, migrator:DBMigrator){
        let request = indexedDB.open(config.name, config.version);
        request.onupgradeneeded = (event)=>{
            if(!(event instanceof IDBVersionChangeEvent && event.target instanceof IDBOpenDBRequest && event.target.result instanceof IDBDatabase)){
                return ;
            }
            console.log("need Upgrade! old:" + event.oldVersion + " new:"+event.newVersion);
            this.db = event.target.result;
            migrator.exec(event);
        }
        return new Promise((resolve) => {
            request.onsuccess = resolve;
        }).then((event: Event) => {
            if (!(event.target instanceof IDBOpenDBRequest && event.target.result instanceof IDBDatabase)) {
                return;
            }
            console.log("success open database:" + config.name);
            this.db = event.target.result;
            return this.db;
        });
    }
    readAllSubject() {
        const transaction = this.db.transaction(['subject'], 'readonly');
        const subjectStore = transaction.objectStore('subject');
        const request = subjectStore.openCursor();
        return new Promise((resolve) => {
            const subjects:SubjectRecord[] = [];
            request.onsuccess = (event) => {
                let request = event.target as IDBRequest;
                let cursor = request.result as IDBCursorWithValue;
                if (!cursor) {
                    resolve(subjects);
                    return ;
                }
                subjects.push(cursor.value as SubjectRecord);
                cursor.continue();
            }
        });
    }
    addSubject(name:string) {
        const transaction = this.db.transaction(['subject'], 'readwrite');
        const subjectStore = transaction.objectStore('subject');
        const request = subjectStore.add({
            name: name
        });
        return new Promise((resolve, reject)=>{
            request.onsuccess = (event) => {
                resolve();
            }
            request.onerror = (event) => {
                reject(request.error);
            }
        }).catch((reason)=>{
            console.error('Fail add subject. reason:', reason);
            transaction.abort();
            return Promise.reject(reason);
        });
    }
}
