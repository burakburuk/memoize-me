const isEqualDefault = require('./equality-helper');

const callbackMap = new Map();

const createMemoizationListByCallback = (fncToBeMemoized) => {
    callbackMap.set(fncToBeMemoized, []);
};

const memoizeMe = (fnToBeMemoized, equalityCheckerFn) => (...params) => {
    if (!fnToBeMemoized || typeof fnToBeMemoized !== 'function') {
        throw new Error('Callback function must be specified');
    }

    if (equalityCheckerFn && typeof equalityCheckerFn !== 'function') {
        throw new Error(
            'Equality checker must be a function returning boolean result',
        );
    }

    if (!callbackMap.has(fnToBeMemoized)) {
        createMemoizationListByCallback(fnToBeMemoized);
    }

    const memoizationList = callbackMap.get(fnToBeMemoized);

    const isEqual = equalityCheckerFn || isEqualDefault;
    const memoizedItem = memoizationList.find((item) => isEqual(item.params, params));

    if (memoizedItem) {
        return memoizedItem.result;
    }

    const result = fnToBeMemoized(...params);
    memoizationList.push({
        params,
        result,
    });

    return result;
};

module.exports = memoizeMe;
