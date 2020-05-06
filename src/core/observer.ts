export interface Observable {
  subscribe(callback: () => void): void;
  unsubscribe(callback: () => void): void;
  notifySubscribers(): void;
}
