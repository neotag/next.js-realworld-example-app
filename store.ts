import { applyMiddleware, createStore } from 'redux';
import { promiseMiddleware } from './middleware';
import reducer from './reducers'

const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware(promiseMiddleware);
    } else {
        // Enable additional logging in non-production environments.
        return applyMiddleware(promiseMiddleware)
    }
};

export const store = createStore(reducer, getMiddleware())