import Wrap from './template';

let favorites = [];
const input = document.createElement('input');
const favWrap = document.createElement('div');
const favTitle = document.createElement('h6');
const favContent = document.createElement('div');
const container = new Wrap();

container.fav.addEventListener('click', (e) => {
  favorites.push(container.content);
  localStorage.setItem(JSON.stringify(favorites));
})

function setData(data){
  container.title.textContent = data.name + ', ' + data.country;
}

input.addEventListener('change', (e) => {
  getData(input.value).then(result => {
    setData(result);
  })
})