// script.js
const apiKey = '4c7a362b0a4aff15220ebae50b227cf0'; // Replace with your OpenWeather API key
const weatherForm = document.getElementById('weather-form');
const locationInput = document.getElementById('location-input');
const weatherOutput = document.getElementById('weather-output');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = locationInput.value;
    getFeaturedWeather(location);
});

function getFeaturedWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayWeather(data,location);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      });
};

function displayWeather(data, location) {
  weatherOutput.innerHTML = '';

  const forecastList = data.list;
  let dayCounter = 1; 
  let dailyTempSum = 0;
  let dailyWindSum = 0;
  let dailyHumiditySum = 0;

  for (let i = 0; i < forecastList.length; i++) {
    const forecast = forecastList[i];
    const date = new Date(forecast.dt * 1000);
    const dayKey = date.toLocaleDateString('en-US', { weekday: 'long' });

    dailyTempSum += forecast.main.temp;
    dailyWindSum += forecast.wind.speed;
    dailyHumiditySum += forecast.main.humidity;

    if (dayCounter % 8 === 0) {
      const avgTemp = Math.round(dailyTempSum / 8);
      const avgWind = Math.round(dailyWindSum / 8);
      const avgHumidity = Math.round(dailyHumiditySum / 8);

      const card = document.createElement('div');
      card.classList.add('weather-card');
      card.innerHTML = `
        <h3>${location} - ${dayKey}</h3>
        <p>Average Temperature: ${avgTemp}°C</p>
        <p>Average Wind Speed: ${avgWind} m/s</p>
        <p>Average Humidity: ${avgHumidity}%</p>
      `;

      weatherOutput.appendChild(card);

      dailyTempSum = 0;
      dailyWindSum = 0;
      dailyHumiditySum = 0;

      dayCounter++;
    } else {
      dayCounter++;
    }

    if (dayCounter > 40) {
      break;
    }
  }
}
