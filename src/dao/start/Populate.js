// import { knex } from "../../db.js";
// import knex from "knex";

import config from "../../config.js"
import knexLib from 'knex'
const knex = knexLib(config)
const productos = [
  {
    timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
    title: "Producto 1",
    price: 100,
    descripcion: "Descripcion 1",
    code: "XY-1",
    image: "url1.com",
    stock: 150,
  },
  {
    timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
    title: "Producto 2",
    price: 200,
    descripcion: "Descripcion 2",
    code: "XY-2",
    image: "url2.com",
    stock: 250,
  },
  {
    timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
    title: "Producto 3",
    price: 300,
    descripcion: "Descripcion 3",
    code: "XY-3",
    image: "url3.com",
    stock: 350,
  },
  {
    timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
    title: "Producto 4",
    price: 400,
    descripcion: "Descripcion 4",
    code: "XY-4",
    image: "url4.com",
    stock: 450,
  },
];

const carritos = [
  {
    timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
  },
  {
    timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
  },
  {
    timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
  },
];

const productoCarritoRelations = [
  {
    carritoId: 2,
    productoId: 1,
  },
  {
    carritoId: 2,
    productoId: 1,
  },
  {
    carritoId: 2,
    productoId: 3,
  },
];

export async function populateProducts() {
  try {
    await knex.insert(productos).from("productos");
    console.log("Se agregaron productos a la tabla");
  } catch (err) {
    console.log(err);
  }
}

export async function populateCarts() {
  try {
    await knex.insert(carritos).from("carritos");
    console.log("se agregaron carritos a la tabla");
  } catch (err) {
    console.log(err);
  }
}

export async function populateProductoEnCarrito() {
  try {
    await knex.insert(productoCarritoRelations).from("productosEnCarrito");
    console.log("Se agregaron relaciones a la tabla");
  } catch (err) {
    console.log(err);
  }
}
