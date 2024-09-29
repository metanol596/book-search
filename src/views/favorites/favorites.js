import onChange from 'on-change';

import { AbstractView } from '../../common/view';
import { Card } from '../../components/card/card';
import { Header } from '../../components/header/header';

import './favorites.css';

export class FavoritesView extends AbstractView {
  constructor(appState) {
    super();
    this.appState = appState;
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
    const main = document.createElement('main');
    main.innerHTML = '<h1>Favorites</h1>';

    if (this.appState.favorites.length === 0) {
      main.innerHTML = '<p>Нет избранных книг</p>';
    }

    if (this.appState.favorites.length > 0) {
      let favList = document.createElement('div');
      favList.classList.add('fav-list');

      this.appState.favorites.map((item) => {
        favList.append(new Card(this.appState, item).render());
        main.append(favList);
      });
    }

    this.app.innerHTML = '';
    this.app.append(main);
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
