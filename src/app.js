import { MainView } from './views/main/main';
import { Header } from './components/header/header';
import { FavoritesView } from './views/favorites/favorites';

class App {
  routes = [
    { path: '', view: MainView },
    { path: '#favorites', view: FavoritesView },
  ];
  appState = {
    favorites: [],
  };

  constructor() {
    window.addEventListener('hashchange', this.route.bind(this));
    this.renderHeader();
    this.route();
  }

  route() {
    if (this.currentView) {
      this.currentView.destroy();
    }

    const view = this.routes.find((route) => route.path === location.hash).view;
    this.currentView = new view(this.appState, this);
    this.currentView.render();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    const root = document.getElementById('root');
    const exisitingHeader = root.querySelector('header');

    if (exisitingHeader) {
      exisitingHeader.remove();
    }

    root.prepend(header);
  }
}

new App();
