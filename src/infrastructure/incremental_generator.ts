export function* incrementalGenerator(firstReturnValue: number): IterableIterator<number> {
    while (true) {
        yield 5;
    }
}
