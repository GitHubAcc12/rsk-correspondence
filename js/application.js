import ContingencyTable from "./contingencyTable";
import YoungTableu from "./tableau";

export default class Application {
  constructor() {
    this.contingencyTable = new ContingencyTable(3, 3);
    this.initializeEventListeners();
  }

  incrementCell(cell, index) {
    let val = parseInt(cell.innerHTML);
    cell.innerHTML = val + 1;
    let i = index[0];
    let j = index[1];
    this.contingencyTable.increment(i, j);
    // this.contingencyTable.printTable();
  }

  decrementCell(cell, index) {
    let val = parseInt(cell.innerHTML);
    if (val > 0) {
      cell.innerHTML = val - 1;
      let i = index[0];
      let j = index[1];
      this.contingencyTable.decrement(i, j);
    } else {
      console.warn("Only positive integers allowed!");
    }
  }

  initializeEventListeners() {
    let items = document.getElementsByTagName("td");
    for (let i = 0; i < items.length; ++i) {
      // compute row and column number from i
      let cols = this.contingencyTable.columns;

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

    let btn = document.getElementById("rsk-button");
    btn.addEventListener("click", () => {
      let [P, Q] = this.contingencyTable.semistandardTableauxFromCT();
      console.log(P);
      console.log(Q);

      let headers = document.getElementsByClassName("vis-when-rsk");
      for (let i = 0; i < headers.length; ++i) {
        headers[i].style.visibility = "visible";
      }

      let tableP = document.getElementById("tableauP");
      let tableQ = document.getElementById("tableauQ");

      tableP.innerHTML = "";
      tableQ.innerHTML = "";

      for (let i = 0; i < P.tableau.length; ++i) {
        let trP = document.createElement("tr");
        let trQ = document.createElement("tr");
        for (let j = 0; j < P.tableau[i].length; ++j) {
          let tdP = document.createElement("td");
          tdP.innerHTML = P.tableau[i][j];
          trP.appendChild(tdP);

          let tdQ = document.createElement("td");
          tdQ.innerHTML = Q.tableau[i][j];
          trQ.appendChild(tdQ);
        }
        tableP.appendChild(trP);
        tableQ.appendChild(trQ);
      }
    });
  }
}
