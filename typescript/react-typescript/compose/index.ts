
type Func<T extends any[], R> = (...a: T) => R

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for the
 * resulting composite function.
 *
 * @param funcs The functions to compose.
 * @returns A function obtained by composing the argument functions from right
 *   to left. For example, `compose(f, g, h)` is identical to doing
 *   `(...args) => f(g(h(...args)))`.
 * 将 var a = fn1(fn2(fn3(fn4(x)))) 变成 var a = compose(fn1,fn2,fn3,fn4)(x)
 * 在 redux 中 applymiddleware 使用 compose 来组合中间件，形成一个洋葱模型
 */
export default function compose(): <R>(a: R) => R

export default function compose<F extends Function>(f: F): F

/* two functions */
export default function compose<A, T extends any[], R>(
    f1: (a: A) => R,
    f2: Func<T, A>
): Func<T, R>

/* three functions */
export default function compose<A, B, T extends any[], R>(
    f1: (b: B) => R,
    f2: (a: A) => B,
    f3: Func<T, A>
): Func<T, R>

/* four functions */
export default function compose<A, B, C, T extends any[], R>(
    f1: (c: C) => R,
    f2: (b: B) => C,
    f3: (a: A) => B,
    f4: Func<T, A>
): Func<T, R>

/* rest */
export default function compose<R>(
    f1: (a: any) => R,
    ...funcs: Function[]
): (...args: any[]) => R

export default function compose<R>(...funcs: Function[]): (...args: any[]) => R

export default function compose(...funcs: Function[]) {
    if (funcs.length === 0) {
        // infer the argument type so it is usable in inference down the line
        return <T>(arg: T) => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => (...args: any) => a(b(...args)))
}