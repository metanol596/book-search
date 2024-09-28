import onChange from 'on-change';
import { AbstractView } from '../../common/view';
import { Card } from '../../components/card/card';

export class FavoritesView extends AbstractView {
  constructor(appState, appInstance) {
    super();
    this.appState = appState;
    this.appInstance = appInstance;
    this.main = document.createElement('main');
    this.setPageTitle('Избранное');
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
  }

  destroy() {
    onChange.unsubscribe(this.appState);
  }

  appStateHook(path) {
    if (path === 'favorites') {
      this.render();
    }
  }

  render() {
    document.querySelector('main').remove();
    this.main.innerHTML = '';
    this.main.innerHTML = '<h1>Favorites</h1>';

    if (this.appState.favorites.length === 0) {
      this.main.innerHTML = '<p>Нет избранных книг</p>';
    }

    if (this.appState.favorites.length > 0) {
      let favList = document.createElement('div');
      favList.classList.add('fav-list');

      this.appState.favorites.map((item) => {
        favList.append(new Card(this.appState, item, this.appInstance).render());
        this.main.append(favList);
      });
    }
    this.app.append(this.main);
  }
}
