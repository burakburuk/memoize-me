const isEqualDefault = (a, b) => {
    if (typeof a === 'undefined' || typeof b === 'undefined') {
        throw new Error('2 parameters must be specified');
    }

    if (typeof a === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
};

module.exports = isEqualDefault;
