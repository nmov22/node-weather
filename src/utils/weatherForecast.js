const request = require('request')

const getWeather = (longitude, latitude, callback) => {
    const urlWeather = 'http://api.weatherstack.com/current?access_key=77301e446ac255ff2d318c6a0566d3fe&query=' + latitude + ',' + longitude + '&units=m'

    request({ url : urlWeather, json : true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the internet!', undefined)
        } else if (body.error) {
            callback('Unable to get weather!', undefined)
        } else {
            callback(undefined, {
                weather : body.current.weather_descriptions[0],
                temperature : body.current.temperature,
                feelsLike : body.current.feelslike
            })
        }
    })
}

module.exports = getWeather