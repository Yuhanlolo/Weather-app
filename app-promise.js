const yargs = require('yargs')
const axios = require('axios')
const APIkey = 'b7ad6d7209464e3102539908d412d5fe'

const argv = yargs
.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true 
  }
})
.help()
.alias('help', 'h')
.argv

var encodedAddress = encodeURIComponent(argv.address)
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios.get(geocodeUrl).then((response) =>{
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find the place')
   }
    
    console.log(response.data.results[0].formatted_address)
    var lat = response.data.results[0].geometry.location.lat
    var lng = response.data.results[0].geometry.location.lng    
    var weatherUrl =`https://api.darksky.net/forecast/${APIkey}/${lat},${lng}`
     
    return axios.get(weatherUrl)
}).then((response) =>{
    var actualTemp = response.data.currently.temperature
    var apprTemp= response.data.currently.apparentTemperature
    console.log(`It's currently ${actualTemp}. It feels like ${apprTemp}.`)
}). catch((e) =>{
   if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API Servers')
   }else{
    console.log(e.message)
   }
})
