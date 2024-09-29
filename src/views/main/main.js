import onChange from 'on-change';

import { Search } from '../../components/search/search';
import { AbstractView } from '../../common/view';
import { CardList } from '../../components/card-list/card-list';
import { Header } from '../../components/header/header';
import { Pagination } from '../../components/pagination/pagination';

export class MainView extends AbstractView {
  state = {
    list: [],
    booksNumFound: 0,
    loading: false,
    cardsPerPage: 6,
    offset: 0,
    searchQuery: '',
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setPageTitle('Поиск книг');
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
    if (path === 'searchQuery' || path === 'offset') {
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
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&limit=${this.state.cardsPerPage}&offset=${offset}`,
    );
    return res.json();
  }

  render() {
    const main = document.createElement('main');
    main.innerHTML = `<h1>Найдено книг - ${this.state.booksNumFound}</h1>`;
    main.append(new Search(this.state).render());
    main.append(new CardList(this.state, this.appState).render());

    if (this.state.list.length > 0 && !this.state.loading) {
      main.append(new Pagination(this.state).render());
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
