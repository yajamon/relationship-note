interface IndexedDBMigrator {
    exec(event:IDBVersionChangeEvent):void;
}

export default IndexedDBMigrator;
