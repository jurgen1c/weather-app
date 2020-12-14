
export default function Favorite(title){
  let wrapper = document.createElement('div');
  let link = document.createElement('a');
  let remove = document.createElement('button');

  remove.textContent = 'X';
  link.textContent = title;

  wrapper.appendChild(link);
  wrapper.appendChild(remove);

  this.link = link;
  this.remove = remove;
  this.content = wrapper;

}
