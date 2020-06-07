# README

Memoize me

This library helps you to memoize your pure function results for the same inputs. Thus, complicated and big data calculations are calculated only once and return from cache for the next calls.

## Dev-dependencies

-   Nodejs and yarn for development environment and package management.
-   Webpack -> build management
-   Babel -> transpiling to ES5

## Production build

From the root folder run following command.

`yarn build`

## Usage

```
import memoizeMe from 'memoize-me';
```

### Example 1 - Memoization with a single parameter

```
// Here is the function which its results will be memoized
function square(x) {
    return x * x;
}

const memoizedSquare = memoizeMe(square);

memoizedSquare(5); // should calculate
memoizedSquare(5); // should return from cache
memoizedSquare(6); // should calculate
memoizedSquare(6); // should return from cache
memoizedSquare(5); // should return from cache
```

### Example 2 - Memoization with many parameters

```
// Here is the function which its results will be memoized
function divide(x, y) {
    return x / y;
}

const memoizedDivide = memoizeMe(divide);

memoizedDivide(8, 2); // should calculate
memoizedDivide(8, 2); // should return from cache
memoizedDivide(12, 24); // should calculate
memoizedDivide(12, 24); // should return from cache
memoizedDivide(8, 2); // should return from cache
```

### Example 3 - Memoization with object parameters

```
// Here is the function which its results will be memoized
function getFullName(person) {
    return `${person.name} ${person.surname}`;
}

const memoizedGetFullName = memoizeMe(getFullName);

memoizedGetFullName({ name: 'Burak', surname: 'Buruk' }); // should calculate
memoizedGetFullName({ name: 'Burak', surname: 'Buruk' }); // should return from cache
memoizedGetFullName({ name: 'Aybike', surname: 'Buruk' }); // should calculate
memoizedGetFullName({ name: 'Aybike', surname: 'Buruk' }); // should return from cache
memoizedGetFullName({ name: 'Burak', surname: 'Buruk' }); // should return from cache
```

### Example 4 - Memoization with custom equality checker

```
// Here is the function which its results will be memoized
function sum(x, y) {
    return x + y;
}

// Custom equality checker
function isEqual(a, b) {
    // return a === b;
    return true;
}

const memoizedSum = memoizeMe(sum, isEqual);

memoizedSum(2, 3); // should calculate
memoizedSum(5, 7); // even if the parameters are different
                   // it should return from cache since equality checker returns always true
                   // this can be used for your customized equality checks like using immutable js and use "is" method from the library
```
