


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorMessage= document.querySelector('#message-error')
const contentMessage= document.querySelector('#message-content')

const getWeather = (location) => {
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((weather) => {
            if (weather) {
                if (weather.error) {
                     errorMessage.textContent = weather.error 
                } else {
                    errorMessage.textContent = location
                    contentMessage.textContent = weather.response
                }
        }
    })
})
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    contentMessage.textContent = ''
    errorMessage.textContent = 'Loading weather for location!'
    const location = search.value
    getWeather(location)
})

