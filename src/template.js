class Wrap {
  constructor() {
    const wrapper = document.createElement('div');
    const header = document.createElement('div');
    const title = document.createElement('h2');
    const subtitle = document.createElement('h4');
    const content = document.createElement('div');
    const temp = document.createElement('h1');
    const details = document.createElement('div');
    const fav = document.createElement('button');
    const img = document.createElement('img');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const toglabel = document.createElement('span');

    content.className = 'content-wrap';
    details.className = 'details-wrap';
    title.className = 'title';
    subtitle.className = 'sub-title';
    fav.classList.add('btn', 'primary');
    label.className = 'switch';
    input.id = 'toggler';
    input.type = 'checkbox';
    span.classList.add('slider', 'round');
    toglabel.className = 'tog-label';
    toglabel.textContent = 'C° / F°';


    label.appendChild(input);
    label.appendChild(span);

    header.appendChild(fav);
    header.appendChild(toglabel);
    header.appendChild(label);
    header.appendChild(title);
    header.appendChild(subtitle);

    content.appendChild(img);
    content.appendChild(temp);
    content.appendChild(details);

    wrapper.appendChild(header);
    wrapper.appendChild(content);

    this.title = title;
    this.fav = fav;
    this.toggle = input;
    this.subtitle = subtitle;
    this.temp = temp;
    this.img = img;
    this.details = details;
    this.content = wrapper;
    this.tempData = '';
    this.minData = '';
    this.maxData = '';
    this.feels = '';
    this.name = '';
  }

  setDetails(data, unit) {
    const labels = ['Feels like: ', 'Humidity: ', 'AP: ', 'Max Temp: ', 'Min Temp: ', 'Wind Speed: '];
    const Csymbols = [' C°', ' %', ' inHg', ' C°', ' C°', ' kph'];
    const Fsymbols = [' F°', ' %', ' inHg', ' F°', ' F°', ' kph'];
    this.details.innerHTML = '';
    if (unit === 'metric') {
      for (let i = 0; i < data.length; i += 1) {
        const info = document.createElement('p');
        info.textContent = labels[i] + data[i] + Csymbols[i];
        this.details.appendChild(info);
      }
    } else {
      for (let i = 0; i < data.length; i += 1) {
        const info = document.createElement('p');
        info.textContent = labels[i] + data[i] + Fsymbols[i];
        this.details.appendChild(info);
      }
    }
  }

  favCheck() {
    if (localStorage.favorites) {
      const favorites = JSON.parse(localStorage.favorites);
      for (let i = 0; i < favorites.length; i += 1) {
        if (favorites[i] === this.name) {
          this.fav.style.display = 'none';
        } else {
          this.fav.style.display = 'inline';
        }
      }
    }
  }
}

export default Wrap;