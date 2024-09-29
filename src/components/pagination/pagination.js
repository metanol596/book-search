import { DivComponent } from '../../common/div-component';

import './pagination.css';

export class Pagination extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  render() {
    const isPrevBtnDisabled = this.state.offset === 0;
    const isNextBtnDisabled =
      this.state.offset + this.state.cardsPerPage >= this.state.booksNumFound;

    this.div.classList.add('pagination');
    this.div.innerHTML = `
      <button class="pagination__btn pagination__prev-btn" ${isPrevBtnDisabled ? 'disabled' : ''}>
        <img class="pagination__prev-arrow" src="/static/icons/arrow.svg">
        Предыдущая страница
      </button>
      <button class="pagination__btn pagination__next-btn" ${isNextBtnDisabled ? 'disabled' : ''}>
        Следующая страница
        <img class="pagination__next-arrow" src="/static/icons/arrow.svg">
      </button>
    `;

    this.div.addEventListener('click', (evt) => {
      const target = evt.target;

      if (target.closest('.pagination__prev-btn') && !isPrevBtnDisabled) {
        this.state.offset -= this.state.cardsPerPage;
      }

      if (target.closest('.pagination__next-btn') && !isNextBtnDisabled) {
        this.state.offset += this.state.cardsPerPage;
      }
    });

    return this.div;
  }
}
