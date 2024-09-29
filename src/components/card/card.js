import { DivComponent } from '../../common/div-component';

import './card.css';

export class Card extends DivComponent {
  constructor(appState, cardState) {
    super();
    this.appState = appState;
    this.cardState = cardState;
  }

  render() {
    let isFavorite = this.appState.favorites.find((fav) => fav.key === this.cardState.key);

    this.div.classList.add('card');
    this.div.innerHTML = `
      <div class="card__image-wrapper">
        <img src="https://covers.openlibrary.org/b/olid/${
          this.cardState.cover_edition_key
        }-M.jpg" alt="Обложка книги" />
      </div>
      <div class="card__info">
        <div class="card__subject">${
          this.cardState.subject ? this.cardState.subject[0] : 'not found'
        }
        </div>
        <h3 class="card__title">${this.cardState.title}</h3>
        <div class="card__author">
          ${this.cardState.author_name ? this.cardState.author_name[0] : 'not found'}
        </div>
        
      </div>
      <div class="card__footer">
        <button class="card__toFavoritesBtn ${isFavorite ? 'card__isFavorite' : ''}">
          <img src="/static/icons/favorites${!isFavorite ? '-white' : ''}.svg"/>
        </button>
      </div>
    `;

    this.div.querySelector('.card__footer button').addEventListener('click', () => {
      if (!isFavorite) {
        this.appState.favorites.push(this.cardState);
      } else {
        const index = this.appState.favorites.findIndex((fav) => fav.key === this.cardState.key);
        if (index !== -1) {
          this.appState.favorites.splice(index, 1);
        }
      }
    });

    return this.div;
  }
}
