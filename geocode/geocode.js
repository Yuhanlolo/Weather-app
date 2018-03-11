const request = require('request')

var APIkey = 'b7ad6d7209464e3102539908d412d5fe'
var lng = -76.9318152
var lat = 38.9981032

var geocodeAddress = (address, callback) =>{
    
    var encodeAddress = encodeURIComponent(address)
    
    request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
    json: true
}, (error, response, body) => {
    if(error){
        callback('unable to connect to google service.')
    }
    else if(body.status === 'ZERO_RESULTS'){
        callback('unable to find the address.')     
    }
    else if (body.status === 'OK') {        
    callback(undefined, {
        address: body.results[0].formatted_address,
        lng:body.results[0].geometry.location.lng,
        lat:body.results[0].geometry.location.lat
    })  
}    
})   
}

var getWeather = (lat, lng, callback) => {
    request({
    url: `https://api.darksky.net/forecast/${APIkey}/${lat},${lng}`,
    //url: 'https://api.darksky.net/forecast/b7ad6d7209464e3102539908d412d5fe/39,75',
    json: true
}, (error, response, body) => {
    if(error){
        callback('unable to connect to forecast service.')
    }
    else if(response.statusCode === 400){
        callback('Unable to fetch the weather.')     
    }
    else if (response.statusCode === 200) {
        callback(undefined, {
        actualTemp: body.currently.temperature,
        apprTemp:body.currently.apparentTemperature
        })
}    
})
}

module.exports = {
    geocodeAddress: geocodeAddress,
    getWeather: getWeather,
    lng:lng,
    lat:lat
}