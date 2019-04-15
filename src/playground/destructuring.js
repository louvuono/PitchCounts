// Object destructuring

console.log('destructuring');

const person = {
    name: 'Lou',
    age: 56,
    location: {
        city: 'Plumsteadville',
        temp: 10
    }
};

const {name = 'Anonymous', age} = person;

//const {name: firstName = 'Anonymous', age} = person;

console.log(`${name} is ${age}.`);

// const  {city, temp} = person.location;

// if ( city && temp ) {
//     console.log(`It's ${temp} in ${city}.`);
// }

const  {city, temp: temperature} = person.location;

if ( city && temperature ) {
    console.log(`It's ${temperature} in ${city}.`);
}

const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    } 

};

const {name: publisherName = 'Self-Published'} = book.publisher;

console.log(publisherName);

// Array destructuring

const address = ['4811 Woodspring Drive', 'Plumsteadville', 'PA', '18947'];

//const [street, city, state, zip] = address;
const [, mycity, state = 'NY'] = address;

//console.log(`You are in ${address[1]} ${address[2]}.`);
console.log(`You are in ${mycity} ${state}.`);

const item = ['coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [what, , mediumPrice] = item;

console.log(`A medium ${what} costs ${mediumPrice}`);