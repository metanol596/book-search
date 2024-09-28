import { DivComponent } from '../../common/div-component';
import { Card } from '../card/card';
import './card-list.css';

export class CardList extends DivComponent {
  constructor(state, appState, appInstance) {
    super();
    this.state = state;
    this.appState = appState;
    this.appInstance = appInstance;
  }

  render() {
    if (this.state.loading) {
      this.div.textContent = 'loading...';
      return this.div;
    }

    this.div.classList.add('card-list');
    this.div.innerHTML = `
      <h1>Найдено книг - ${this.state.booksNumFound}</h1>
      <div class="card-list__wrapper"></div>
    `;

    for (const card of this.state.list) {
      this.div
        .querySelector('.card-list__wrapper')
        .append(new Card(this.appState, card, this.appInstance).render());
    }

    return this.div;
  }
}
