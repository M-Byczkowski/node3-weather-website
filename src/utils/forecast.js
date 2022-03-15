const request = require('request')

const forecast = (latitude, longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a039a4a39222f6a2c9ac8bcd57e2bd3d&query='+latitude+','+longitude

    request({ url, json: true}, (error, { body }) => {
        if (error){
           callback('Unable to connect to forecast services.', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
           callback(undefined,'For ' + body.location.name + ' it is ' + body.current.weather_descriptions[0] +  ". It's currently: " + body.current.temperature + ",but it feels like " + body.current.feelslike + " at " + body.location.localtime)
          
        }
        
    })
} 


module.exports = forecast