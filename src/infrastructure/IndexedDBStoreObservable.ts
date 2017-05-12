import {Observer, Observable} from "../interfaces/Observer";

class StoreObservableCore implements Observable {
    observers:Set<Observer> = new Set();

    addObserver(obs: Observer){
        this.observers.add(obs);
    }

    removeObserver(obs: Observer){
        if (!this.observers.has(obs)){
            return;
        }
        this.observers.delete(obs);
    }

    notifyObservers(){
        this.observers.forEach( obs => {
            obs.update();
        });
    }
}

export default class IndexedDBStoreObservable {
    private static _instance: IndexedDBStoreObservable;
    private observables: {storeName:string, observable:StoreObservableCore}[] = [];

    private constructor(){
    }

    static get instance():IndexedDBStoreObservable {
        if (!this._instance){
            this._instance = new IndexedDBStoreObservable();
        }
        return this._instance;
    }

}
