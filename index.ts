/* eslint-disable @typescript-eslint/no-explicit-any */
import { call } from 'redux-saga/effects'
import { Dispatch, Action, Store } from 'redux'
import { SagaIterator } from 'redux-saga'

export interface SagaPromiseOptions<S, A extends Action<any> = any> {
	select: <T>(selector: (state: S) => T) => T
	dispatch: Dispatch<A>
	store: Store<S, A>
}

export type SagaPromiseFunc<S, A extends Action<any> = any, SA extends Action<any> = any> = (options: SagaPromiseOptions<S, SA>, action: A, ...rest: any) => Promise<any>

export function makeSagaPromiseFunc<S, A extends Action<any> = any, SA extends Action<any> = any>(func: SagaPromiseFunc<S, A, SA>) {
	return func
}

/**
 * Create a function to wrap promise functions in a generator function so promises can be used in
 * `takeEvery`.
 * @param store the redux store
 */
export default function sagaPromiseWrapper<S, A extends Action<any> = any>(store: Store<S, A>) {
	return (func: SagaPromiseFunc<S, any>) => {
		const options: SagaPromiseOptions<S, A> = {
			select: (selector) => selector(store.getState()),
			dispatch: store.dispatch,
			store,
		}
		return function* (...args: any[]): SagaIterator {
			const action: A = args[args.length - 1]
			yield call(func, options, action, ...args.slice(0, args.length - 1))
		}
	}
}
