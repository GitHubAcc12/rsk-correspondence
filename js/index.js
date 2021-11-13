function incrementCell(cell) {
  let val = parseInt(cell.innerHTML);
  cell.innerHTML = val + 1;
}

function decrementCell(cell) {
  let val = parseInt(cell.innerHTML);
  if (val > 0) {
    cell.innerHTML = val - 1;
  } else {
    console.warn("Only positive integers allowed!");
  }
}

function initializeEventListeners() {
  let items = document.getElementsByTagName("td");
  for (let i = 0; i < items.length; ++i) {
    items[i].addEventListener("click", () => incrementCell(items[i]));
    items[i].addEventListener("contextmenu", (event) => {
      event.preventDefault();
      decrementCell(items[i]);
    });
  }
}

initializeEventListeners();
