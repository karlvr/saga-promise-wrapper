import { Dispatch, Action, Store } from 'redux';
import { SagaIterator } from 'redux-saga';
export interface SagaPromiseOptions<S, A extends Action<any> = any> {
    select: <T>(selector: (state: S) => T) => T;
    dispatch: Dispatch<A>;
    store: Store<S, A>;
}
export declare type SagaPromiseFunc<S, A extends Action<any> = any, SA extends Action<any> = any> = (options: SagaPromiseOptions<S, SA>, action: A, ...rest: any) => Promise<any>;
export declare function makeSagaPromiseFunc<S, A extends Action<any> = any, SA extends Action<any> = any>(func: SagaPromiseFunc<S, A, SA>): SagaPromiseFunc<S, A, SA>;
/**
 * Create a function to wrap promise functions in a generator function so promises can be used in
 * `takeEvery`.
 * @param store the redux store
 */
export default function sagaPromiseWrapper<S, A extends Action<any> = any>(store: Store<S, A>): (func: SagaPromiseFunc<S, any>) => (...args: any[]) => SagaIterator<any>;
