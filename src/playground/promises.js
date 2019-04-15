const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve({
        //     name: 'Lou',
        //     age: 56
        // });
        reject('Something went wrong');
    }, 1500);    
});

console.log('Before ');

promise.then((data) => {
    console.log('1', data);
}).catch((error) => {
    console.log('error 1: ', error);
});

// catch as the 2nd argument to then
promise.then((data) => {
    console.log('2', data);
}, (error) => {
    console.log('error 2: ', error);
});

console.log('After');