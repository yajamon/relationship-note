export interface Observer {
    update: ()=>void;
}

export interface Observable {
    addObserver: (observer: Observer)=>void;
    removeObserver: (observer: Observer)=>void;
    observers: Set<Observer>;
    notifyObservers: ()=>void;
}
