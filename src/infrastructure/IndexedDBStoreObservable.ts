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
    private observables: {storename:string, observable:StoreObservableCore}[] = [];

}
