import IndexedDBAdapter from "./IndexedDBAdapter";

export default class SubjectRepository {
    constructor(private adapter:IndexedDBAdapter) {
    }

    findAll(){
        return this.adapter.findAll("subject");
    }
}
