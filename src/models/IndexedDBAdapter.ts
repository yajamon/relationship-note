import DBConfig from "../interfaces/IndexedDBConfig";
import DBMigrator from "../interfaces/IndexedDBMigrator";

import connector from "../infrastructure/IndexedDBConnector";
import SubjectRecord from "../interfaces/subjectRecord";

/**
 * IndexedDBAdapter
 */
export default class IndexedDBAdapter {
    constructor() {
    }

    open(config:DBConfig, migrator:DBMigrator){
        return connector.open(config, migrator);
    }
    findAll(storeName: string){
        const transaction = connector.db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.openCursor();
        return new Promise((resolve) => {
            const values:any[] = [];
            request.onsuccess = (event) => {
                let request = event.target as IDBRequest;
                let cursor = request.result as IDBCursorWithValue;
                if (!cursor) {
                    resolve(values);
                    return ;
                }
                values.push(cursor.value);
                cursor.continue();
            }
        });
    }
    readAllSubject() {
        const transaction = connector.db.transaction(['subject'], 'readonly');
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
        const transaction = connector.db.transaction(['subject'], 'readwrite');
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
