class Character {
  #inventory = [];
  #health = 10;

  pockItem(item) {
    this.#inventory.push(item);
  }

  recieveDamage(damage) {
    this.#health -= damage;
  }

  localStorage() {
    localStorage.setItem('char', this);
  }

  loadCharacter() {
    //.....
  }
}
