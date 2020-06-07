const isEqualDefault = require('./equality-helper');

describe('Given equality helper', () => {
    describe('when isEqualDefault is called with 2 same integer parameters', () => {
        it('should return true', () => {
            expect(isEqualDefault(2, 2)).toEqual(true);
        });
    });

    describe('when isEqualDefault is called with 2 different integer parameters', () => {
        it('should return false', () => {
            expect(isEqualDefault(2, 3)).toEqual(false);
        });
    });

    describe('when isEqualDefault is called with 2 same object parameters', () => {
        it('should return true', () => {
            const param1 = { name: 'Burak', surname: 'Buruk' };
            const param2 = { name: 'Burak', surname: 'Buruk' };
            expect(isEqualDefault(param1, param2)).toEqual(true);
        });
    });

    describe('when isEqualDefault is called with 2 different object parameters', () => {
        it('should return false', () => {
            const param1 = { name: 'Burak', surname: 'Buruk' };
            const param2 = { name: 'Aybike', surname: 'Buruk' };
            expect(isEqualDefault(param1, param2)).toEqual(false);
        });
    });
});
