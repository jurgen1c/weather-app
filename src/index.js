import './styles.scss';
import { container, pushFavorites, handleListeners } from './logic';


// favWrap.textContent = JSON.parse(localStorage.favorites);

window.addEventListener('load', () => {
  pushFavorites();
  handleListeners();
  document.body.appendChild(container);
});
