import { DivComponent } from '../../common/div-component';
import './card-list.css';

export class CardList extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  render() {
    if (this.state.loading) {
      this.div.textContent = 'loading...';
      return this.div;
    }

    this.div.classList.add('card-list');
    this.div.innerHTML = `
      <h1>Найдено книг - ${this.state.list.length}</h1>
    `;
    return this.div;
  }
}
