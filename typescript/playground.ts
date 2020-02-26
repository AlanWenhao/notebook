function factory<T> (type: {new(): T}): T {
    return new type()
}
