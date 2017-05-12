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

    private createObservableIfNeeded(storeName:string, obs:Observer){
        if(this.observables.filter(value => value.storeName == storeName).length > 0){
            return;
        }
        this.observables.push({
            storeName: storeName,
            observable: new StoreObservableCore()
        });
    }

    addObserverToStore(storeName:string, obs:Observer){
        this.createObservableIfNeeded(storeName, obs);
        const first = this.observables.filter(value => value.storeName == storeName)[0];
        first.observable.addObserver(obs);
    }

    removeObserverByStore(storeName:string, obs:Observer){
        const filtered = this.observables.filter(value => value.storeName == storeName);
        if (filtered.length == 0){
            return;
        }
        filtered.forEach(value => value.observable.removeObserver(obs));
    }

}
