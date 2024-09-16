(function () {
  'use strict';

  class Wallet {
    add() {
      console.log(this);
      return this;
    }

    remove() {
      console.log(this);
      return this;
    }
  }

  const wallet = new Wallet().add().remove();
  console.log(wallet);

})();
