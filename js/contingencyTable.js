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
