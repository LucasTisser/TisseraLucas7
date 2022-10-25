import config from "../../config.js"
import knexLib from 'knex'
const knex = knexLib(config)
export async function createProductoTable() {
  try {
    const isCreated = await knex.schema.hasTable("productos");
    if (isCreated) {
      console.log(" La tabla <productos> ya existe creada en la DB");
    } else {
      knex.schema.dropTableIfExists("productos").finally(()=>{
        return knex.schema.createTable("productos", (table) => {
        table.increments("id").primary().notNullable(),
          table.timestamp("timestamp").notNullable(),
          table.string("title", 100).notNullable(),
          table.float("price").notNullable(),
          table.string("descripcion", 300),
          table.string("code"),
          table.string("image", 200),
          table.integer("stock")
      })
      
      });
      console.log("La table <producto> ha sida creada");
    }
  } catch (err) {
    console.log(err);
  }
}

export async function createCarritoTable() {
  try {
    const isCreated = await knex.schema.hasTable("carritos");
    if (isCreated) {
      console.log("La tabla <carritos> ya existe creada en la DB");
    } else {
      knex.schema.dropTableIfExists('carritos').finally(()=>{
      return knex.schema.createTable("carritos", (table) => {
        table.increments("id").primary(),
        table.timestamp("timestamp").notNullable();
      })
      });
      console.log("La tabla <carritos> ha sido creada");
    }
  } catch (err) {
    console.log(err);
  }
}

export async function createProductoEnCarritoTable() {
  try {
    const isCreated = await knex.schema.hasTable("productosEnCarrito");
    if (isCreated) {
      console.log("La table <productosEnCarrito> ya existe creada en la DB");
    } else {
      knex.schema.dropTableIfExists('productosEnCarrito').finally(()=>{
        return knex.schema.createTable("productosEnCarrito", (table) => {
          table.increments("id").primary().notNullable(),
            // <FK carrito>
            table.integer("carritoId").unsigned().notNullable();
          table
            .foreign("carritoId")
            .references("id")
            .inTable("carrito")
            .onDelete("CASCADE"),
            // <FK producto>
            table.integer("productoId").unsigned(),
            table
              .foreign("productId")
              .references("id")
              .inTable("producto")
              .onDelete("CASCADE")
        });
      })
      console.log("La tabla <productosEnCarrito> ha sido creada");
    }
  } catch (err) {
    console.log(err);
  }
}
