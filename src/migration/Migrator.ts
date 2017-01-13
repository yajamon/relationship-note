import DBMigrator from '../interfaces/IndexedDBMigrator'
import DBMigratorEntity from '../interfaces/IndexedDBMigratorEntity'

import entityAddSubject from './entities/addSubject'

/**
 * Migrator
 */
export default class Migrator implements DBMigrator {
    private entities:DBMigratorEntity[] = [
        new entityAddSubject(),
    ];
    constructor() {
    }

    exec(event:IDBVersionChangeEvent) {
        if(!(event instanceof IDBVersionChangeEvent && event.target instanceof IDBOpenDBRequest && event.target.result instanceof IDBDatabase)){
            return ;
        }
        let db = event.target.result;
        this.entities.filter((entity, index)=>{
            return event.oldVersion < index+1 && event.newVersion >= index+1
        }).forEach((entity)=>{
            entity.exec(db);
        });
    }
}
