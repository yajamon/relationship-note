import IndexedDBAdapter from "./IndexedDBAdapter";
import SubjectRecord from "../interfaces/subjectRecord";

export default class SubjectRepository {
    readonly storeName:string = "subject";
    constructor(private adapter:IndexedDBAdapter) {
    }

    findAll(){
        return this.adapter.findAll(this.storeName);
    }

    add(param:SubjectRecord){
        return this.adapter.add([{
            storeName: this.storeName,
            values: [param],
        }]);
    }
}
