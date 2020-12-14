import './styles.scss';
import Wrap from './template.js';
/* 
<label class="switch">
  <input type="checkbox">
  <span class="slider round"></span>
</label> */

let units = ['metric', 'imperial'];
let favorites = [];
let favWrap = document.createElement('div');

const container = document.createElement('div');
const topCont = document.getElementById('content');
const input = document.createElement('input');
const tog = document.getElementById('toggler');
const cont = new Wrap();
container.className = 'weather-wrap'
topCont.className = 'header-wrap'

topCont.appendChild(input);
container.innerHTML = 'Welcome to Weather Check write the name of the city you would like to know the current weather off and click enter'

const key = 'dac7bc2e0fc4f64340cbaadfa6ece2de';
const url = `http://api.openweathermap.org/data/2.5/weather?q=London&units=${units[0]}&appid=${key}`;
const img_url = 'http://openweathermap.org/img/wn/';

async function getData(place){
  let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&units=${units[0]}&appid=${key}`);
  let json = await response.json();
  console.log(json);
  return {
    name: json.name,
    country: json.sys.country,
    lat: json.coord.lat,
    lon: json.coord.lon,
    sunrise: json.sys.sunrise,
    sunset: json.sys.sunset,
    description: json.weather[0].description,
    icon: json.weather[0]. icon,
    feels: json.main.feels_like,
    humidity: json.main.humidity,
    pressure: json.main.pressure,
    temp: json.main.temp,
    maxTemp: json.main.temp_max,
    minTemp: json.main.temp_min,
    wind: json.wind.speed,
    value: json.weather[0].main,
  }
}

function setBg(value){
  if(value === 'Rain'){
    document.body.className = 'rain';
  }else if(value === 'Clouds'){
    document.body.className = 'clouds';
  }else if(value === 'Clear'){
    document.body.className = 'clear';
  }else if(value === 'Fog'){
    document.body.className = 'fog';
  }else if(value === 'Snow'){
    document.body.className = 'snow';
  }else{
    document.body.className = 'default';
  }
}

function setData(result){
  cont.title.textContent = `${result.name}, ${result.country} ${result.description}`;
  cont.subtitle.textContent = `Latitud: ${result.lat} Longitud: ${result.lon} Sunrise: ${result.sunrise} Sunset: ${result.sunset}`;
  cont.tempData = result.temp;
  cont.minData = result.minTemp;
  cont.maxData = result.maxTemp;
  cont.feels = result.feels;
  cont.temp.textContent = cont.tempData + 'C°';
  cont.img.src = img_url + result.icon +'@2x.png';
  let infoDetails = [cont.feels, result.humidity, result.pressure, cont.maxData, cont.minData, result.wind]
  cont.setDetails(infoDetails)
  cont.content.setAttribute('data-id', result.name)
  container.appendChild(cont.content);
  setBg(result.value);
  cont.fav.addEventListener('click', (e) => {
    e.stopPropagation();
    favorites.push(result);
    localStorage.setItem(cont.content.getAttribute('data-id'), JSON.stringify(favorites));
  })
}

input.addEventListener('change', (e) => {
  container.innerHTML = '';
  getData(e.target.value).then(data => {
    setData(data);
  })
})

tog.addEventListener('click', (e) => {
  if(e.target.checked){
    cont.setFar();
  }else{
    cont.setCel();
  }
})

favWrap.textContent = localStorage.getItem('favorites');

window.addEventListener('load', () =>{
  /* getData(input.value).then(data => {
    setData(data);
  }) */
  document.body.appendChild(container);
  document.body.appendChild(favWrap);
})
