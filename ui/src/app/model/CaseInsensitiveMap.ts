export class CaseInsensitiveMap<T, U> extends Map<T, U> {
    set(key: T, value: U): this {
        if (typeof key === 'string') {
            key = <T><any>key.toLowerCase();
        }
        return super.set(key, value);
    }
}