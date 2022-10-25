import {
  createProductoTable,
  createCarritoTable,
  createProductoEnCarritoTable,
} from "./CreateTable.js";

import {
  populateProducts,
  populateCarts,
  populateProductoEnCarrito,
} from "./Populate.js";

async function rebuild() {
  await createProductoTable();
  await createCarritoTable();
  await createProductoEnCarritoTable();

  await populateProducts();
  await populateCarts();

  await populateProductoEnCarrito();
}

rebuild();
