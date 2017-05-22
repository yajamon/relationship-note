import connector from "../infrastructure/IndexedDBConnector";
import observable from "../infrastructure/IndexedDBStoreObservable";

/**
 * IndexedDBAdapter
 */
export default class IndexedDBAdapter {
    constructor() {
    }

    findAll(storeName: string) {
        return connector.db.then((db) => {
            const transaction = db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.openCursor();
            return new Promise((resolve) => {
                const values: any[] = [];
                request.onsuccess = (event) => {
                    let request = event.target as IDBRequest;
                    let cursor = request.result as IDBCursorWithValue;
                    if (!cursor) {
                        resolve(values);
                        return;
                    }
                    values.push(cursor.value);
                    cursor.continue();
                }
            });
        });
    }


    add(params: AddParameter[]) {
        return connector.db.then((db) => {
            const storeNames: string[] = params.map(param => param.storeName);
            const transaction = db.transaction(storeNames, 'readwrite');
            const promises: Promise<{}>[] = [];

            params.forEach(param => {
                const store = transaction.objectStore(param.storeName);
                param.values.forEach(value => {
                    const request = store.add(value);
                    const p = new Promise((resolve, reject) => {
                        request.onsuccess = (event) => {
                            resolve(event);
                        };
                        request.onerror = (event) => {
                            reject(request.error);
                        }
                    });
                    promises.push(p);
                });
            })

            return Promise.all(promises).then((values) => {
                storeNames.forEach(name => {
                    observable.instance.notify(name);
                });
            }).catch((reason) => {
                console.error('Fail add subject. reason:', reason);
                transaction.abort();
                return Promise.reject(reason);
            });
        });
    }
}

interface AddParameter {
    storeName: string;
    values: any[];
}
