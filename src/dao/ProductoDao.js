// import { knex } from "../db.js";
import knexLib from "knex";

export class ProductoDao {
  TABLE_NAME = "productos";
  ID_COLUMN = "id";

  constructor(config){
    this.knex = knexLib(config);
  }
  async save(obj) {
    try {
      const newProductId = await this.knex.insert(obj).from(this.TABLE_NAME);
      console.log(` Producto agregado con ID: ${newProductId}`);
      return newProductId;
    } catch (err) {
      console.log(err);
    } finally {
      this.knex.destroy();
    }
  }
  async deleteById(id) {
    try {
      await this.knex.del().from(this.TABLE_NAME).where(this.ID_COLUMN, id);
      console.log("Producto borrado");
      return true;
    } catch (err) {
      console.log(err);
    } finally {
      this.knex.destroy();
    }
  }
  async getAll() {
    try {
      return await this.knex(this.TABLE_NAME).select("*")
    } catch (err) {
      console.log({"Error en getAll":err});
    } finally {
      this.knex.destroy();
    }
  }
  async getProductById(id) {
    try {
      return await this.knex
        .select("productos")
        .where(id);
    } catch (err) {
      console.log("Product not found");
    }
  }
  async updateProductById(obj, id) {
    try {
      await this.knex.from(this.TABLE_NAME).update(obj).where(this.ID_COLUMN, id);
      return true;
    } catch (err) {
      console.log(err);
    } finally {
      this.knex.destroy();
    }
  }
}

export default ProductoDao