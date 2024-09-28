import onChange from 'on-change';
import { Search } from '../../components/search/search';
import { AbstractView } from '../../common/view';
import { CardList } from '../../components/card-list/card-list';

export class MainView extends AbstractView {
  state = {
    list: [],
    booksNumFound: 0,
    loading: false,
    offset: 10,
    searchQuery: '',
  };

  constructor(appState, appInstance) {
    super();
    this.main = document.createElement('main');
    this.setPageTitle('Поиск книг');
    this.appState = appState;
    this.appInstance = appInstance;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
  }

  destroy() {
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.state);
  }

  appStateHook(path) {
    if (path === 'favorites') {
      this.render();
    }
  }

  async stateHook(path) {
    if (path === 'searchQuery') {
      this.state.loading = true;
      const data = await this.loadBooks(this.state.searchQuery, this.state.offset);
      this.state.loading = false;
      this.state.booksNumFound = data.numFound;
      this.state.list = data.docs;
    }

    if (path === 'list' || path === 'loading') {
      this.render();
    }
  }

  async loadBooks(q, offset) {
    const res = await fetch(`https://openlibrary.org/search.json?q=${q}&limit=50&offset=${offset}`);
    return res.json();
  }

  render() {
    this.main.innerHTML = '';
    this.main.append(new Search(this.state).render());
    this.main.append(new CardList(this.state, this.appState, this.appInstance).render());
    this.app.append(this.main);
  }
}
