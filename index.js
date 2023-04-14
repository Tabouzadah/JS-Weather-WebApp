const container = document.querySelector('.container');
const searchBtn = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const temperature = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.weather-box .description');
const weatherDetails = document.querySelector('.weather-details');
const humidity = document.querySelector('.weather-details .humidity span');
const wind = document.querySelector('.weather-details .wind span');
const notFound = document.querySelector('.not-found');

const apiKey = '66cb9f45fca64ac2732584198780b503';
const imageUrl = 'images/';
const weatherImages = {
  Clear: 'clear.png',
  Rain: 'rain.png',
  Snow: 'snow.png',
  Clouds: 'cloud.png',
  Haze: 'mist.png',
};

searchBtn.addEventListener('click', () => {
  const city = searchInput.value.trim();

  if (!city) {
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Invalid location');
      }
      return response.json();
    })
    .then(data => {
      const { main, weather, wind: { speed } } = data;
      const weatherImage = weatherImages[weather[0].main] || '';
      const weatherDescription = weather[0].description || '';

      temperature.innerHTML = `${Math.round(main.temp)}<span>°C</span>`;
      description.innerHTML = weatherDescription;
      humidity.innerHTML = `${main.humidity}%`;
      wind.innerHTML = `${Math.round(speed)}Km/h`;

      if (weatherImage) {
        weatherBox.querySelector('img').src = imageUrl + weatherImage;
      }

      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      container.style.height = '590px';
      notFound.style.display = 'none';
    })
    .catch(error => {
      weatherBox.style.display = 'none';
      weatherDetails.style.display = 'none';
      container.style.height = '400px';
      notFound.style.display = 'block';
      notFound.classList.add('fadeIn');
      console.error(error);
    });
});
