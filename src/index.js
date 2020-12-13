import './styles.scss'


let units = ['metric', 'imperial']

const key = 'dac7bc2e0fc4f64340cbaadfa6ece2de';
const url = `http://api.openweathermap.org/data/2.5/weather?q=London&units=${units[0]}&appid=${key}`;
const img_url = 'http://openweathermap.org/img/wn/';

async function getData(){
  let response = await fetch(url);
  let json = await response.json();
  //let img_respone = await fetch(img_url + json.weather[0].icon + '@2x.png');
  console.log(json);
  return {
    name: json.city.name,
    country: json.city.country,
    lat: json.city.coord.lat,
    lon: json.city.coord.lon,
    sunrise: json.city.sunrise,
    sunset: json.city.sunset,
    timezone: json.city.timezone,
    weather: json.list[0].weather[0].description,
    wind: json.list[0].wind.speed
  }
}

getData().then(result => {
  let cont = document.createElement('div');
  cont.innerHTML = result.name + result.lat + result.weather + result.wind;
  document.body.appendChild(cont);
})
