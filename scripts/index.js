const WEATHER_API_KEY = '54b1407dcc4d3ca0d88eefdeca4dd8a4'
let country = ''
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${WEATHER_API_KEY}`
const input = document.querySelector('input')
const btn = document.querySelector('.btn')
const container = document.querySelector('.weather__container')

const setCountry = e => (country = e.target.value)

const getWeatherData = async () => {
    try {
        if (country) {
            const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${WEATHER_API_KEY}')
            const data = await response.json()
            console.log(data)
            renderWeather(data)
        }
    } catch (error) {
        console.log(error)
    }
}

const renderWeather = data => {
    const { main, weather, wind } = data
    const temperature = Math.round(main.temp - 273.15)
    const minTemperature = Math.round(main.temp_min - 273.15)
    const maxTemperature = Math.round(main.temp_max - 273.15)
    const description = weather[0].description
    const icon = `https://openweathermap.org/img/w/${weather[0].icon}.png`
    const windSpeed = wind.speed

    const weatherHTML = `
        <div class="flex flex-col gap-4 items-center text-2xl text-white p-4 bg-[rgba(0,0,0,0.5)] rounded-lg">
            <h2 class="text-3xl">Weather in <span class="text-blue-500">${country}</span></h2>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Min Temperature:</strong> ${minTemperature}°C</p>
            <p><strong>Max Temperature:</strong> ${maxTemperature}°C</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
            <div class="flex items-center gap-2">
                <p class="desc">${description}</p>
                <img class="w-16 h-16" src="${icon}" alt="Weather icon">
            </div>
        </div>
    `

    container.innerHTML = weatherHTML
    container.classList.add('active')
    setTimeout(() => {
        container.classList.remove('active')
    }, 1000)
}

const handlePressEnter = e => (e.key === 'Enter' ? getWeatherData() : null)

btn.addEventListener('click', getWeatherData)
input.addEventListener('input', setCountry)
input.addEventListener('keypress', handlePressEnter)
