import IndexedDBAdapter from "./IndexedDBAdapter";

export default class SubjectRepository {
    readonly storeName:string = "subject";
    constructor(private adapter:IndexedDBAdapter) {
    }

    findAll(){
        return this.adapter.findAll(this.storeName);
    }
}
