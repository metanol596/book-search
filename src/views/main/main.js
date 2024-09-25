import onChange from 'on-change';
import { Search } from '../../components/search/search';
import { AbstractView } from '../../common/view';
import { CardList } from '../../components/card-list/card-list';

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
    this.state = onChange(this.state, this.stateHook.bind(this));
  }

  appStateHook(path) {
    if (path === 'favorites') {
      console.log(path);
    }
  }

  async stateHook(path) {
    if (path === 'searchQuery') {
      this.state.loading = true;
      const data = await this.loadBooks(this.state.searchQuery, this.state.offset);
      this.state.loading = false;
      this.state.list = data.docs;
    }

    if (path === 'list' || path === 'loading') {
      this.render();
    }
  }

  async loadBooks(q, offset) {
    const res = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}`);
    return res.json();
  }

  render() {
    this.main.textContent = '';
    this.main.append(new Search(this.state).render());
    this.main.append(new CardList(this.state).render());
    this.app.append(this.main);
  }
}
