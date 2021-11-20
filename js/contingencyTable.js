import YoungTableu from "./tableau";

export default class ContingencyTable {
  constructor(n, m) {
    this.table = this.createNbyM(n, m, true);

    this.rows = n;
    this.columns = m;
  }

  createNbyM(n, m, clear = false) {
    let table = [];
    for (let i = 0; i < n; ++i) {
      table.push(Array.from({ length: m }, () => 0));
    }

    // refill with old values
    if (!clear) {
      for (let i = 0; i < this.table.length; ++i) {
        for (let j = 0; j < this.table[0].length; ++j) {
          table[i][j] = this.table[i][j];
        }
      }
    }

    return table;
  }

  addRow() {
    this.table = this.createNbyM(this.rows + 1, this.columns);
    ++this.rows;
  }

  addColumn() {
    this.table = this.createNbyM(this.rows, this.columns + 1);
    ++this.columns;
  }

  toHtml() {
    let table = document.createElement("table");
    table.classList.add("matrix");

    const columns = this.table[0].length;
    const rows = this.table.length;
    for (let i = 0; i < rows; ++i) {
      let tr = document.createElement("tr");

      for (let j = 0; j < columns; ++j) {
        let td = document.createElement("td");
        td.classList.add("ct");
        td.innerHTML = this.table[i][j];
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    return table;
  }

  printTable() {
    console.log(this.table);
  }

  increment(i, j) {
    ++this.table[i][j];
  }

  decrement(i, j) {
    --this.table[i][j];
  }

  semistandardTableauxFromCT() {
    let array = this.compute2dArray();
    // array[0] is for P, array[1] for Q
    let P = new YoungTableu();
    let Q = new YoungTableu();
    for (let i = 0; i < array.length; ++i) {
      // insert array[i][0] into P
      let pos = P.rowBump(array[i][0]);
      Q.addBoxAt(pos, array[i][1]);
    }

    return [P, Q];
  }

  compute2dArray() {
    let array = [];
    for (let i = 0; i < this.table.length; ++i) {
      for (let j = 0; j < this.table[0].length; ++j) {
        for (let amount = 0; amount < this.table[i][j]; ++amount) {
          array.push([i + 1, j + 1]);
        }
      }
    }
    array.sort((a, b) => a[1] - b[1]);

    // don't know if this is the most useful shape

    return array;
  }

  computeRowSums() {
    let rowSums = [];
    for (let i = 0; i < this.table.length; ++i) {
      rowSums.push(this.table[i].reduce((a, b) => a + b, 0));
    }
    return rowSums;
  }

  computeColSums() {
    let colSums = [];
    for (let j = 0; j < this.table[0].length; ++j) {
      let sum = 0;
      for (let i = 0; i < this.table.length; ++i) {
        sum += this.table[i][j];
      }
      colSums.push(sum);
    }
    return colSums;
  }
}
