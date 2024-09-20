import { Header } from '../components/header/header';

export class AbstractView {
  constructor() {
    this.app = document.getElementById('root');
    this.renderHeader();
  }

  setPageTitle(title) {
    document.title = title;
  }

  render() {
    return;
  }

  destroy() {
    return;
  }

  renderHeader() {
    const header = new Header().render();
    this.app.prepend(header);
  }
}
