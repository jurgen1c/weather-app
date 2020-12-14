class Wrap{
  constructor(){
    let wrapper = document.createElement('div');
    let header = document.createElement('div');
    let title = document.createElement('h2');
    let subtitle = document.createElement('h4');
    let content = document.createElement('div');
    let temp = document.createElement('h1');
    let details = document.createElement('div');
    let fav = document.createElement('button');
    let img = document.createElement('img');

    fav.textContent = 'Add Favorite';

    header.appendChild(fav);
    header.appendChild(title);
    header.appendChild(subtitle);

    content.appendChild(img);
    content.appendChild(temp);
    content.appendChild(details);

    wrapper.appendChild(header);
    wrapper.appendChild(content);

    this.title = title;
    this.fav = fav;
    this.subtitle = subtitle;
    this.temp = temp;
    this.img = img;
    this.details = details;
    this.content = wrapper;
    this.tempData;
    this.minData;
    this.maxData;
    this.feels;
  }

  setDetails(data){
    let labels = ['Feels like: ', 'Humidity: ', 'Atmospheric Pressure: ', 'Max Temp: ', 'Min Temp: ', 'Wind Speed: '];
    let symbols = [' C°', ' %', ' inHg', ' C°', ' C°', ' kph']
    this.details.innerHTML = '';
    for(let i = 0;i < data.length; i++){
      let info = document.createElement('p');
      info.textContent = labels[i] + data[i] + symbols[i];
      this.details.appendChild(info);
    } 
  }

  setFar(){
    this.tempData = (this.tempData * 1.8000) + 32;
    this.minData = (this.minData * 1.8000) + 32;
    this.maxData = (this.maxData * 1.8000) + 32;
    this.feels = (this.feels * 1.8000) + 32;
  }

  setCel(){
    this.tempData = (this.tempData - 32) / 1.8000;
    this.minData = (this.minData - 32) / 1.8000;
    this.maxData = (this.maxData - 32) / 1.8000;
    this.feels = (this.feels - 32) / 1.8000;
  }
}

export default Wrap;