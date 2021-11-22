export default class YoungTableu {
  constructor(shape = [], content = []) {
    this.shape = shape;

    // content: (u1, u2, u3, ...) where ui is the number of i's in tableau
    this.content = content;
    this.tableau = [[]];
  }

  rowBump(val) {
    // adjust content
    while (this.content.length <= val) {
      this.content.push(0);
    }
    ++this.content[val];

    if (this.tableau[0].length == 0) {
      this.tableau[0].push(val);
      this.shape.push(1);
      return [0, 0];
    }

    let pos = this.tableau[0].length - 1;
    if (this.tableau[0][pos] <= val) {
      this.tableau[0].push(val);
      ++this.shape[0];
      return [0, pos + 1];
    }

    let toBump = val;
    for (let i = 0; i < this.tableau.length; ++i) {
      let j = this.tableau[i].length - 1;
      if (toBump >= this.tableau[i][j]) {
        this.tableau[i].push(toBump);
        ++this.shape[i];
        return [i, j + 1];
      } else {
        --j;
        for (; j >= -1; --j) {
          if (j == -1 || toBump >= this.tableau[i][j]) {
            let bumpOut = this.tableau[i][j + 1];
            this.tableau[i][j + 1] = toBump;
            toBump = bumpOut;
            break;
          }
        }
      }
    }

    // if we arrive here, we have to add a new row to the tableau
    this.tableau.push([toBump]);
    this.shape.push(1);
    return [this.tableau.length - 1, 0]; // TODO check if this is the right return
  }

  addBoxAt(index, val = 0) {
    let row = index[0];
    let col = index[1];

    if (this.tableau.length < row) {
      console.error("can't add box");
    } else if (this.tableau.length == row) {
      this.tableau.push([]);
      this.shape.push(1);
    }

    if (this.tableau[row].length < col) {
      console.error("can't add box");
    } else if (this.tableau[row].length == col) {
      this.tableau[row].push(val);
      ++this.shape[row];
    }
  }
}
