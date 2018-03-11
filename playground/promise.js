var asyncAdd = (a, b) =>{
    return new Promise((resolve, reject)=>{
        setTimeout(() =>{
            if (typeof a === 'number' && typeof b === 'number'){
                resolve(a+b)
            }else{
                reject('Arguments must be numbers')
            }
        }, 1500)
    })
}

asyncAdd(3,6).then((res) =>{
    console.log('Success:', res)
    return asyncAdd(res, 33)
}).then((res) =>{
    console.log('Success:', res)
}).catch((errorMessage) =>{
    console.log('Error:', errorMessage)
})

//var somePromise = new Promise((resolve, reject) => {
//    setTimeout(() =>{
//        resolve('The value of promise fulfilled with.') 
//        reject('unable to fulfill promise.')
//    }, 2500)
//
//})
//
//somePromise.then((message) =>{
//    console.log('Success:', message)
//}, (errorMessage)=>{
//    console.log('Error:', errorMessage)
//})

//then((message) =>{
//    console.log('Success:', message)
//}, (errorMessage)=>{
//    console.log('Error:', errorMessage)
//})