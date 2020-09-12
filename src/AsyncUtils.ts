export async function asyncMap<T, X>(arr: readonly T[], iterator: (arg0: T) => Promise<X>): Promise<X[]> {
    return await Promise.all(arr.map(iterator));
}

export async function asyncFilter<T>(arr: readonly T[], filter: (arg0: T) => Promise<boolean>): Promise<T[]> {
    const filteredMap = await asyncMap(arr, filter);
    return arr.filter((_, idx) => filteredMap[idx]);
}

export async function asyncFind<T>(arr: readonly T[], condition: (arg0: T) => Promise<boolean>): Promise<T | null> {
    return (await asyncFilter(arr, condition))[0];
}
