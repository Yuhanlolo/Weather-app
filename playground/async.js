console.log('Starting App')

// callback function: a function that gets passed as an argument to another function, and excutes after some of event
setTimeout( () => {
    console.log('Inside of callback')
}, 2000)

setTimeout( () => {
    console.log('second setTimeout')
}, 1000)

setTimeout( () => {
    console.log('third setTimeout')
}, 0)

console.log('Finishing Up')