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
    let label = document.createElement('label');
    let input = document.createElement('input');
    let span = document.createElement('span');
    let toglabel = document.createElement('span');

    content.className = 'content-wrap';
    details.className = 'details-wrap';
    title.className = 'title'
    subtitle.className = 'sub-title'
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
    this.tempData;
    this.minData;
    this.maxData;
    this.feels;
    this.name;
  }

  setDetails(data, unit){
    let labels = ['Feels like: ', 'Humidity: ', 'AP: ', 'Max Temp: ', 'Min Temp: ', 'Wind Speed: '];
    let Csymbols = [' C°', ' %', ' inHg', ' C°', ' C°', ' kph'];
    let Fsymbols = [' F°', ' %', ' inHg', ' F°', ' F°', ' kph']
    this.details.innerHTML = '';
    if(unit === 'metric'){
      for(let i = 0;i < data.length; i++){
        let info = document.createElement('p');
        info.textContent = labels[i] + data[i] + Csymbols[i];
        this.details.appendChild(info);
      } 
    }else{
      for(let i = 0;i < data.length; i++){
        let info = document.createElement('p');
        info.textContent = labels[i] + data[i] + Fsymbols[i];
        this.details.appendChild(info);
      }
    }
  }

  favCheck(){
    if(localStorage['favorites']){
      let favorites = JSON.parse(localStorage['favorites']);
      for(let i = 0; i < favorites.length; i++){
        if(favorites[i] === this.name){
          this.fav.style.display = 'none';
        }else{
          this.fav.style.display = 'inline';
        }
      }
    }
  }
}

export default Wrap;