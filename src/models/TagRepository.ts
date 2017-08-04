import IndexedDBAdapter from "./IndexedDBAdapter";
import TagRecord from "../interfaces/TagRecord";

export default class TagRepository {
    readonly storeName:string = "tag";
    constructor(private adapter:IndexedDBAdapter) {
    }

    findAll(){
        return this.adapter.findAll(this.storeName);
    }

    add(param:TagRecord){
        return this.adapter.add([{
            storeName: this.storeName,
            values: [param],
        }]);
    }
}
