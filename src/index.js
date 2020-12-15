import './styles.scss';
import { container, pushFavorites, handleListeners } from './logic';


window.addEventListener('load', () => {
  pushFavorites();
  handleListeners();
  document.body.appendChild(container);
});
