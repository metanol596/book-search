export class Header {
  render() {
    const headerElement = document.createElement('header');
    headerElement.classList.add('header');

    headerElement.innerHTML = `
      <div class="logo__wrap">
        <img class="logo" src="static/icons/logo.svg" alt="Логотип" />
      </div>
    `;
    return headerElement;
  }
}
