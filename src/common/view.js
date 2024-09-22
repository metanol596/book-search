export class AbstractView {
  constructor() {
    this.app = document.getElementById('root');
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
}
