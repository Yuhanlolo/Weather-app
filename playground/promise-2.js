const request = require('request')

var geocodeAddress = (address) =>{
    return new Promise((resolve, reject) =>{
    var encodeAddress = encodeURIComponent(address)
    
    request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
    json: true
}, (error, response, body) => {
    if(error){
        reject('unable to connect to google service.')
    }
    else if(body.status === 'ZERO_RESULTS'){
        reject('unable to find the address.')     
    }
    else if (body.status === 'OK') {        
    resolve({
        address: body.results[0].formatted_address,
        lng: body.results[0].geometry.location.lng,
        lat: body.results[0].geometry.location.lat})  
}    
})  
        
})
}

geocodeAddress('19146').then((location)=>{
    console.log('Location:', JSON.stringify(location, undefined, 2))
}, (errorMessage)=>{
    console.log(errorMessage)
})