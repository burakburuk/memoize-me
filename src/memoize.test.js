const memoizeMe = require('./memoize');

describe('Given memoizeMe', () => {
    describe('when it is called with no params', () => {
        it('should throw "Callback function must be specified" error', () => {
            expect(memoizeMe(undefined)).toThrow(Error('Callback function must be specified'));
        });
    });

    describe('when it is called with an parameter which is not function', () => {
        describe('and it is not a function', () => {
            it('should throw "Callback function must be specified" error', () => {
                expect(memoizeMe('string parameter')).toThrow(Error('Callback function must be specified'));
            });
        });
    });

    describe('when it is called with 2 parameters', () => {
        describe('and the second parameter is not a function', () => {
            it('should throw "Equality checker must be a function returning boolean result"', () => {
                expect(memoizeMe(jest.fn(), 'string parameter')).toThrow(
                    Error('Equality checker must be a function returning boolean result'),
                );
            });
        });
    });

    describe('when it is called with an equality checker function', () => {
        const callback = jest.fn();
        const equalityChecker = jest.fn();
        const memoizedCallback = memoizeMe(callback, equalityChecker);

        it('should use specified checker to check the equality of memoized inputs', () => {
            memoizedCallback(5);
            memoizedCallback(6);
            expect(equalityChecker).toHaveBeenCalled();
        });
    });

    describe('when it is called with an integer parameter', () => {
        const callback = jest.fn();
        callback.mockReturnValue(25);

        const memoizedCallback = memoizeMe(callback);

        afterEach(() => {
            callback.mockClear();
        });

        describe('and it is the first time for the same parameter', () => {
            it('should call the callback with the specified parameter', () => {
                memoizedCallback(5);
                expect(callback).toHaveBeenCalledWith(5);
            });
        });

        describe('and it is the second time for the same parameter', () => {
            it('should not call the callback since the result is coming from cache', () => {
                memoizedCallback(5);
                expect(callback).not.toHaveBeenCalled();
            });
        });
    });

    describe('when it is called with 2 integer parameters', () => {
        const callback = jest.fn();
        callback.mockReturnValue(2);

        const memoizedCallback = memoizeMe(callback);

        afterEach(() => {
            callback.mockClear();
        });

        describe('and it is the first time for the same parameter', () => {
            it('should call the callback with the specified parameters', () => {
                memoizedCallback(8, 4);
                expect(callback).toHaveBeenCalledWith(8, 4);
            });
        });

        describe('and it is the second time for the same parameter', () => {
            it('should not call the callback since the result is coming from cache', () => {
                memoizedCallback(8, 4);
                expect(callback).not.toHaveBeenCalled();
            });
        });
    });

    describe('when it is called with an object parameter', () => {
        const callback = jest.fn();
        callback.mockReturnValue('Burak Buruk');

        const memoizedCallback = memoizeMe(callback);

        afterEach(() => {
            callback.mockClear();
        });

        describe('and it is the first time for the same parameter', () => {
            it('should call the callback with the specified parameter', () => {
                memoizedCallback({ name: 'Burak', surname: 'Buruk' });
                expect(callback).toHaveBeenCalledWith({ name: 'Burak', surname: 'Buruk' });
            });
        });

        describe('and it is the second time for the same parameter', () => {
            it('should not call the callback since the result is coming from cache', () => {
                memoizedCallback({ name: 'Burak', surname: 'Buruk' });
                expect(callback).not.toHaveBeenCalled();
            });
        });
    });
});
