import { DivComponent } from '../../common/div-component';

import './search.css';

export class Search extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  search() {
    let value = this.div.querySelector('input').value;
    this.state.searchQuery = value;
  }

  render() {
    this.div.classList.add('search');
    this.div.innerHTML = `
      <div class="search__wrapper">
        <input 
          class="search__input"
          type="text" 
          placeholder="Найти книгу или автора..."
          value="${this.state.searchQuery}"
        />
        <img src="/static/icons/search.svg" width="24" height="24" alt="Иконка поиска" />
			</div>
      <button class="search__button">
        <img src="/static/icons/search-white.svg" alt="Кнопка поиск книг" />
      </button>
    `;

    this.div.querySelector('input').addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        this.search();
      }
    });

    this.div.querySelector('button').addEventListener('click', () => {
      this.search();
    });

    return this.div;
  }
}
