import { AbstractView } from '../../common/view';
import onChange from 'on-change';
import { Header } from '../../components/header/header';

export class MainView extends AbstractView {
  state = {
    list: [],
    loading: false,
    offset: 0,
    searchQuery: '',
  };

  constructor(appState) {
    super();
    this.main = document.createElement('main');
    this.setPageTitle('Поиск книг');
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
  }

  appStateHook(path) {
    if (path === 'favorites') {
      console.log(path);
    }
  }

  render() {
    console.log(this.appState.favorites.length);
    this.main.textContent = '';
    this.app.append(this.main);
  }
}
