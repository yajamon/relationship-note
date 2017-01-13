import DBMigratorEntity from '../../interfaces/IndexedDBMigratorEntity'

export default class Entity implements DBMigratorEntity {
    exec(db: IDBDatabase){
        let objectStore = db.createObjectStore("subject", {keyPath:"id", autoIncrement: true});

        objectStore.createIndex("name", "name", {"unique": true});
    }
}
