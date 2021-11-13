import YoungTableu from "./tableau";

export default class ContingencyTable {
  constructor(n, m) {
    this.table = [];
    for (let i = 0; i < n; ++i) {
      this.table.push(Array.from({ length: m }, () => 0));
    }
    this.rows = n;
    this.columns = m;
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
    console.log(array);
    let P = new YoungTableu();
    let Q = new YoungTableu();
    for (let i = 0; i < array.length; ++i) {
      // insert array[i][0] into P
      let pos = P.rowBump(array[i][0]);
      console.log("added " + array[i][0]);
      console.log("at " + pos);
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
  }

  computeColSums() {
    let colSums = [];
    for (let j = 0; j < this.contingencyTable[0].length; ++j) {
      let sum = 0;
      for (let i = 0; i < this.contingencyTable.length; ++i) {
        sum += this.contingencyTable[i][j];
      }
      colSums.push(sum);
    }
  }
}
