import {
  createProductoTable,
  createCarritoTable,
  createProductoEnCarritoTable,
  createMessageTable,
} from "./CreateTable.js";

import {
  populateProducts,
  populateCarts,
  populateProductoEnCarrito,
  populateMessages,
} from "./Populate.js";

async function rebuild() {
  await createProductoTable();
  await createCarritoTable();
  await createProductoEnCarritoTable();
  await createMessageTable();

  await populateProducts();
  await populateCarts();
  await populateProductoEnCarrito();
  await populateMessages();
}
rebuild();
