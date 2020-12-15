
export default function Favorite(title) {
  const wrapper = document.createElement('div');
  const link = document.createElement('a');
  const remove = document.createElement('button');

  remove.textContent = 'X';
  remove.classList.add('btn', 'danger');
  link.textContent = title;
  link.className = 'fav-link';

  wrapper.appendChild(link);
  wrapper.appendChild(remove);

  this.link = link;
  this.remove = remove;
  this.content = wrapper;
}
