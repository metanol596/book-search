import onChange from 'on-change';
import { Search } from '../../components/search/search';
import { AbstractView } from '../../common/view';

export class MainView extends AbstractView {
  state = {
    list: [],
    loading: false,
    offset: 0,
    searchQuery: '',
    booksFound: 0,
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
      const data = await this.loadBooks(this.state.searchQuery, this.state.offset);
      this.state.list = data.docs;
      this.state.booksFound = data.num_found;

      if (path === 'list') {
        this.render();
      }
    }
  }

  async loadBooks(q, offset) {
    const res = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}`);
    return res.json();
  }

  render() {
    const bookCountTextElemnt = document.createElement('div');
    bookCountTextElemnt.textContent = `Найдено книг - ${this.state.booksFound}`;

    this.main.textContent = '';
    this.main.append(new Search(this.state).render());
    this.main.append(bookCountTextElemnt);
    this.app.append(this.main);
  }
}
