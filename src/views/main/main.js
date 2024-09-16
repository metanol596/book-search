import { AbstractView } from '../../common/view';

export class MainView extends AbstractView {
  constructor() {
    super();
    this.setPageTitle('Поиск книг');
  }

  render() {
    const main = document.createElement('div');
    main.innerText = 'Тест';
    console.log(main);
    this.app.innerText = '';
    this.app.append(main);
  }
}
