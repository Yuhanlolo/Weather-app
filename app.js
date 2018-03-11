const yargs = require('yargs')
const geocode = require('./geocode/geocode')

const addressOptions = {
    demand: true,
    alias: 'a',
    describe: 'Address to fetch weather for',
    string: true 
}

const argv = yargs
.command('query', 'query the weather', {
   address: addressOptions
})
.help()
.alias('help', 'h')
.argv

//console.log('Argv:', argv)
var command = argv._[0]
//console.log('Command:', command)
//console.log('Argv.address:', argv.address)

if (command === 'query'){
     geocode.geocodeAddress(argv.address, (errorMessage, results) =>{
        if(errorMessage){
            console.log(errorMessage)
        }else{
            console.log('Results:', results) 
            geocode.getWeather(results.lat, results.lng, (errorMessage, results) =>{
        if(errorMessage){
            console.log(errorMessage)
        }else{
            console.log(JSON.stringify(results, undefined, 2))  
        }
    })
        }
    })
    

    }

//const request = require('request')
//    request({
//    //url: `https://api.darksky.net/forecast/${APIkey}/${lng},${lat}`,
//    url: 'https://api.darksky.net/forecast/b7ad6d7209464e3102539908d412d5fe/39,75',
//    json: true
//}, (error, response, body) => {
//   console.log(body.currently.temperature)   
//})


