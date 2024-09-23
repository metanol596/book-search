import onChange from 'on-change';
import { Search } from '../../components/search/search';
import { AbstractView } from '../../common/view';

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
    this.main.textContent = '';
    this.main.append(new Search(this.state).render());
    this.app.append(this.main);
  }
}
