import knexLib from "knex";

export class ProductoDao {
  TABLE_NAME = "productos";
  ID_COLUMN = "id";

  constructor(config) {
    this.knex = knexLib(config);
  }
  async save(obj) {
    try {
      const newProductId = await this.knex.insert(obj).from(this.TABLE_NAME);
      console.log(`Producto agregado con ID: ${newProductId}`);
      return newProductId;
    } catch (err) {
      console.log(err);
    }
  }
  async deleteById(id) {
    try {
      await this.knex(this.TABLE_NAME).where({ id: id }).del();
      console.log("Producto borrado");
      return true;
    } catch (err) {
      console.log(err);
    }
  }
  async getAll() {
    try {
      return await this.knex(this.TABLE_NAME).select("*");
    } catch (err) {
      console.log({ "Error en getAll": err });
    }
  }
  async getProductById(id) {
    try {
      return await this.knex(this.TABLE_NAME).select("*").where({ id: id });
    } catch (err) {
      console.log("Product not found: " + err);
    }
  }
  async updateProductById(obj, id) {
    try {
      await this.knex
        .from(this.TABLE_NAME)
        .update(obj)
        .where(this.ID_COLUMN, id);
      return true;
    } catch (err) {
      console.log(err);
    }
  }
}

export default ProductoDao;
