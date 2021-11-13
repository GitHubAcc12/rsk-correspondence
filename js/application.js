import YoungTableu from "./tableau";

export default class Application {
  constructor() {
    this.contingencyTable = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    this.initializeEventListeners();
  }

  computeTableau() {}

  incrementCell(cell, index) {
    let val = parseInt(cell.innerHTML);
    cell.innerHTML = val + 1;
    let i = index[0];
    let j = index[1];
    ++this.contingencyTable[i][j];
  }

  decrementCell(cell, index) {
    let val = parseInt(cell.innerHTML);
    if (val > 0) {
      cell.innerHTML = val - 1;
      let i = index[0];
      let j = index[1];
      --this.contingencyTable[i][j];
    } else {
      console.warn("Only positive integers allowed!");
    }
  }

  initializeEventListeners() {
    let items = document.getElementsByTagName("td");
    for (let i = 0; i < items.length; ++i) {
      // compute row and column number from i
      let cols = this.contingencyTable[0].length;

      let row = Math.floor(i / cols);
      let col = i % cols;
      let index = [row, col];
      items[i].addEventListener("click", () => {
        this.incrementCell(items[i], index);
      });
      items[i].addEventListener("contextmenu", (event) => {
        event.preventDefault();
        this.decrementCell(items[i], index);
      });
    }
  }
}
