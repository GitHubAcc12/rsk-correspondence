import ContingencyTable from "./contingencyTable";
import computeEmd from "./emd";

export default class Application {
  constructor() {
    this.contingencyTable = new ContingencyTable(3, 3);
  }

  start() {
    this.initializeEventListeners();
    this.updateRowColSums();
  }

  hideTableauxHeaders() {
    let headers = document.getElementsByClassName("vis-when-rsk");
    for (let i = 0; i < headers.length; ++i) {
      headers[i].style.visibility = "hidden";
    }
  }
  showTableauxHeaders() {
    let headers = document.getElementsByClassName("vis-when-rsk");
    for (let i = 0; i < headers.length; ++i) {
      headers[i].style.visibility = "visible";
    }
  }

  incrementCell(cell, index) {
    let val = parseInt(cell.innerHTML);
    cell.innerHTML = val + 1;
    let i = index[0];
    let j = index[1];
    this.contingencyTable.increment(i, j);
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

  computeRSKAndAppendHtmlToSite() {
    let [P, Q] = this.contingencyTable.semistandardTableauxFromCT();

    // make sure headers are only shown if Tableaux aren't empty
    console.log(P.shape);
    if (P.shape.length === 0) {
      this.hideTableauxHeaders();
    } else {
      this.showTableauxHeaders();
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
        tdP.classList.add("ct");
        trP.appendChild(tdP);

        let tdQ = document.createElement("td");
        tdQ.innerHTML = Q.tableau[i][j];
        tdQ.classList.add("ct");
        trQ.appendChild(tdQ);
      }
      tableP.appendChild(trP);
      tableQ.appendChild(trQ);
    }
  }

  addTableIncrementListeners() {
    let items = document.getElementsByClassName("ct");
    let cols = this.contingencyTable.columns;
    for (let i = 0; i < items.length; ++i) {
      // compute row and column number from i

      let row = Math.floor(i / cols);
      let col = i % cols;
      let index = [row, col];
      items[i].addEventListener("click", () => {
        this.incrementCell(items[i], index);
        this.computeRSKAndAppendHtmlToSite();
        this.updateRowColSums();
      });
      items[i].addEventListener("contextmenu", (event) => {
        event.preventDefault();
        this.decrementCell(items[i], index);
        this.computeRSKAndAppendHtmlToSite();
        this.updateRowColSums();
      });
    }
  }

  updateRowColSums() {
    const rowSums = this.contingencyTable.computeRowSums();
    let rowSumsOutput = document.getElementById("row-sums-distr");
    rowSumsOutput.innerHTML = JSON.stringify(rowSums);

    const colSums = this.contingencyTable.computeColSums();
    let colSumsOutput = document.getElementById("col-sums-distr");
    colSumsOutput.innerHTML = JSON.stringify(colSums);

    const emd = computeEmd(rowSums, colSums);
    let emdOutput = document.getElementById("distr-emd");
    emdOutput.innerHTML = emd;
  }

  initializeEventListeners() {
    this.addTableIncrementListeners();

    let btnAddRow = document.getElementById("btn-add-row");
    btnAddRow.addEventListener("click", () => {
      this.contingencyTable.addRow();
      const newTable = this.contingencyTable.toHtml();
      let parentDiv = document.getElementById("matrix-wrapper");
      parentDiv.innerHTML = "";
      parentDiv.appendChild(newTable);
      this.addTableIncrementListeners();
    });

    let btnAddCol = document.getElementById("btn-add-col");
    btnAddCol.addEventListener("click", () => {
      this.contingencyTable.addColumn();
      const newTable = this.contingencyTable.toHtml();
      let parentDiv = document.getElementById("matrix-wrapper");
      parentDiv.innerHTML = "";
      parentDiv.appendChild(newTable);
      this.addTableIncrementListeners();
    });
  }
}
