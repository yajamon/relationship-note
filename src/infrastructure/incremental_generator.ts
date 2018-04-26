export function* incrementalGenerator(firstReturnValue: number): IterableIterator<number> {
    let value = firstReturnValue;
    while (true) {
        yield value;
        value += 1;
    }
}
