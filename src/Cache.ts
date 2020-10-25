export class Cache<T> implements Serializable {
    private cache: Record<string, T>;

    constructor(cache: Record<string, T> = {}) {
        this.cache = cache;
    }

    set(key: string, value: T): void {
        this.cache[key] = value;
    }

    get(key: string): T | null {
        return this.cache[key] || null;
    }

    toJSON(): string {
        return JSON.stringify(this.cache);
    }
}
