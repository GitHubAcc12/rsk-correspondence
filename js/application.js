export default class Application {
  constructor() {
    this.initializeEventListeners();
  }

  incrementCell(cell) {
    let val = parseInt(cell.innerHTML);
    cell.innerHTML = val + 1;
  }

  decrementCell(cell) {
    let val = parseInt(cell.innerHTML);
    if (val > 0) {
      cell.innerHTML = val - 1;
    } else {
      console.warn("Only positive integers allowed!");
    }
  }

  initializeEventListeners() {
    let items = document.getElementsByTagName("td");
    for (let i = 0; i < items.length; ++i) {
      items[i].addEventListener("click", () => this.incrementCell(items[i]));
      items[i].addEventListener("contextmenu", (event) => {
        event.preventDefault();
        this.decrementCell(items[i]);
      });
    }
  }
}
