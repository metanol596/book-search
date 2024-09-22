import { MainView } from './views/main/main';
import { Header } from './components/header/header';

class App {
  routes = [{ path: '', view: MainView }];
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
    this.currentView = new view(this.appState);
    this.currentView.render();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    document.getElementById('root').prepend(header);
  }
}

new App();
