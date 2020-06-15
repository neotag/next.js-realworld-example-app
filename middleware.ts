//import agent from './utils/agent';
import {
    ASYNC_START,
    ASYNC_END
} from './actionTypes';


const promiseMiddleware = (store: any) => (next: any) => (action: any) => {
    if (isPromise(action.payload)) {
        store.dispatch({ type: ASYNC_START, subtype: action.type });

        const currentView = store.getState().viewChangeCounter;
        const skipTracking = action.skipTracking;

        action.payload.then(
            (res: {}) => {
                const currentState = store.getState()
                if (!skipTracking && currentState.viewChangeCounter !== currentView) {
                    return
                }
                console.log('RESULT', res);
                action.payload = res;
                store.dispatch({ type: ASYNC_END, promise: action.payload });
                store.dispatch(action);
            },
            (error: any) => {
                const currentState = store.getState()
                if (!skipTracking && currentState.viewChangeCounter !== currentView) {
                    return
                }
                console.log('ERROR', error);
                action.error = true;
                action.payload = error.response.body;
                if (!action.skipTracking) {
                    store.dispatch({ type: ASYNC_END, promise: action.payload });
                }
                store.dispatch(action);
            }
        );

        return;
    }

    next(action);
};

const isPromise = (v: any) => {
    return v && typeof v.then === 'function';
}


export { promiseMiddleware }