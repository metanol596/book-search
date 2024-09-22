import './header.css';

export class Header {
  constructor(appState) {
    this.appState = appState;
  }

  render() {
    const headerElement = document.createElement('header');
    headerElement.classList.add('header');
    headerElement.innerHTML = `
      <div class="logo__wrap">
        <img class="logo" src="static/icons/logo.svg" alt="Логотип" />
      </div>
      <div class="menu">
				<a class="menu__item" href="#">
					<img src="/static/icons/search.svg" alt="Поиск книг" />
					Поиск книг
				</a>
				<a class="menu__item" href="#favorites">
					<img src="/static/icons/favorites.svg" alt="Избранное" />
					Избранное
					<div class="menu__counter">
						${this.appState.favorites.length}
					</div>
				</a>
			</div>
    `;
    return headerElement;
  }
}
