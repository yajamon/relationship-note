import DBMigratorEntity from '../../interfaces/IndexedDBMigratorEntity'

export default class Entity implements DBMigratorEntity {
    exec(db: IDBDatabase){
        let tagStore = db.createObjectStore("tag", {keyPath:"id", autoIncrement: true});
        tagStore.createIndex("name", "name", {"unique": true});

        let subjectTagStore = db.createObjectStore("subject_tag");
        subjectTagStore.createIndex("relation", ["subject_id", "tag_id"], {unique: true});
    }
}
