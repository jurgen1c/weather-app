import format from 'date-fns/format';
import Wrap from './template';
import Favorite from './favorite';

const favWrap = document.createElement('div');
const favContent = document.createElement('div');

const container = document.createElement('div');
const topCont = document.getElementById('content');
const input = document.createElement('input');
const favTitle = document.createElement('button');
const welcome = document.createElement('h1');
welcome.textContent = 'Welcome to Weather Check write the name of the city you would like to know the current weather off and click enter';
welcome.className = 'filler';

const cont = new Wrap();
container.className = 'weather-wrap';
topCont.className = 'header-wrap';
favWrap.className = 'modal-wrap';
favContent.className = 'modal';
favContent.style.display = 'none';
favTitle.classList.add('btn', 'primary');
favTitle.textContent = 'Favorites';

favWrap.appendChild(favTitle);
favWrap.appendChild(favContent);
topCont.appendChild(input);
topCont.appendChild(favWrap);
container.appendChild(welcome);

const key = 'dac7bc2e0fc4f64340cbaadfa6ece2de';
const imgUrl = 'http://openweathermap.org/img/wn/';

async function getData(place, unit) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=${unit}&appid=${key}`);
  const json = await response.json();
  return {
    name: json.name,
    country: json.sys.country,
    lat: json.coord.lat,
    lon: json.coord.lon,
    sunrise: json.sys.sunrise,
    sunset: json.sys.sunset,
    description: json.weather[0].description,
    icon: json.weather[0].icon,
    feels: json.main.feels_like,
    humidity: json.main.humidity,
    pressure: json.main.pressure,
    temp: json.main.temp,
    maxTemp: json.main.temp_max,
    minTemp: json.main.temp_min,
    wind: json.wind.speed,
    value: json.weather[0].main,
  };
}

function setBg(value) {
  if (value === 'Rain') {
    document.body.className = 'rain';
  } else if (value === 'Clouds') {
    document.body.className = 'clouds';
  } else if (value === 'Clear') {
    document.body.className = 'clear';
  } else if (value === 'Fog') {
    document.body.className = 'fog';
  } else if (value === 'Snow') {
    document.body.className = 'snow';
  } else {
    document.body.className = 'default';
  }
}

const setData = (result, unit) => {
  container.innerHTML = '';
  cont.tempData = result.temp;
  cont.minData = result.minTemp;
  cont.maxData = result.maxTemp;
  cont.feels = result.feels;
  cont.name = result.name;
  cont.favCheck();
  cont.fav.textContent = 'Add Favorite';
  cont.title.textContent = `${cont.name}, ${result.country} ${result.description}`;
  cont.subtitle.textContent = `Latitud: ${result.lat} Longitud: ${result.lon} 
                              Sunrise: ${format(new Date(result.sunrise), 'pp')} 
                              Sunset: ${format(new Date(result.sunset), 'pp')}`;
  const infoDetails = [
    cont.feels,
    result.humidity,
    result.pressure,
    cont.maxData,
    cont.minData,
    result.wind,
  ];
  if (unit === 'metric') {
    cont.temp.textContent = `${cont.tempData}C°`;
    cont.setDetails(infoDetails, unit);
  } else {
    cont.temp.textContent = `${cont.tempData}F°`;
    cont.setDetails(infoDetails, unit);
  }
  cont.img.src = `${imgUrl + result.icon}@2x.png`;
  container.appendChild(cont.content);
  setBg(result.value);
}

function show(el) {
  if (el.style.display === 'none') {
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }
}

const pushFavorites = () => {
  favContent.innerHTML = '';
  if (localStorage.favorites) {
    const favorites = JSON.parse(localStorage.favorites);
    for (let i = 0; i < favorites.length; i += 1) {
      const item = new Favorite(favorites[i]);
      item.className = 'modal-item';
      item.link.addEventListener('click', (e) => {
        e.preventDefault();
        getData(item.link.textContent, 'metric').then(result => {
          setData(result, 'metric');
        });
        show(favContent);
      });
      item.remove.addEventListener('click', (e) => {
        e.stopPropagation();
        const elements = JSON.parse(localStorage.favorites);
        elements.splice(i, 1);
        localStorage.setItem('favorites', JSON.stringify(elements));
        e.target.parentElement.remove();
      });
      favContent.appendChild(item.content);
    }
  } else {
    const item = document.createElement('div');
    item.textContent = 'Your favorites will show up here!';
    favContent.appendChild(item);
  }
}

const handleListeners = () => {
  cont.fav.addEventListener('click', (e) => {
    e.stopPropagation();
    if (localStorage.favorites) {
      const favorites = JSON.parse(localStorage.favorites);
      favorites.push(cont.name);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      e.target.textContent = 'Added to Favorites!';
      pushFavorites();
    } else {
      const favorites = [];
      favorites.push(cont.name);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      e.target.textContent = 'Added to Favorites!';
      pushFavorites();
    }
  });

  favTitle.addEventListener('click', () => {
    show(favContent);
  });

  input.addEventListener('change', (e) => {
    getData(e.target.value, 'metric').then(data => {
      setData(data, 'metric');
    });
  });

  cont.toggle.addEventListener('click', (e) => {
    if (e.target.checked) {
      getData(cont.name, 'imperial').then(data => {
        setData(data, 'imperial');
      });
    } else {
      getData(cont.name, 'metric').then(data => {
        setData(data, 'metric');
      });
    }
  });
};

export { pushFavorites, container, handleListeners };
