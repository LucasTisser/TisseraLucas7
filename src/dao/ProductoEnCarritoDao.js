// import { knex } from "../db.js";
import knexLib from "knex";

class ProductoEnCarritoDao {
  TABLE_NAME = "productosencarrito";
  ID_COLUMN = "id";
  CARRITO_ID_COLUMN = "carritoId";
  PRODUCTO_ID_COLUMN = "productoId";

  constructor(config){
    this.knex = knexLib(config);
    }

  async saveProductToCart(cartId, productId) {
    const obj = {
      [this.CARRITO_ID_COLUMN]: cartId,
      [this.PRODUCTO_ID_COLUMN]: productId,
    };

    try {
      const newProductInCartId = await this.knex.insert(obj).from(this.TABLE_NAME);
      console.log(
        ` producto agregado correcramente al carrito, la relacion tiene un ID: ${newProductInCartId}.`
      );
      return newProductInCartId;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      await this.knex
        .del()
        .from(this.TABLE_NAME)
        .where(this.CARRITO_ID_COLUMN, cartId)
        .where(this.PRODUCTO_ID_COLUMN, productId);
      return true;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllProductsFromCart(cartId) {
    try {
      const products = await this.knex
        .select("productos.title")
        .from(this.TABLE_NAME)
        .join("productos", "productos.id", "productosEnCarrito.productoId")
        .where(this.CARRITO_ID_COLUMN, cartId);
        console.log(products)
      return products;
    } catch (err) {
      console.log(err);
    }
  }
}

export default ProductoEnCarritoDao