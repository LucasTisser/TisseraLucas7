import knexLib from "knex";

export class CarritoDao {
  TABLE_NAME = "carritos";
  ID_COLUMN = "id";

  constructor(config) {
    this.knex = knexLib(config);
  }

  async save() {
    try {
      const timeNow = {
        timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
      };
      const newCartId = await this.knex.insert(timeNow).from(this.TABLE_NAME);
      console.log(` Carrito agregado con ID: ${newCartId}.`);
      return newCartId;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    try {
      await this.knex.del().from(this.TABLE_NAME).where(this.ID_COLUMN, id);
      console.log("Carrito borrado");
      return true;
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      return await this.knex.select().from(this.TABLE_NAME);
    } catch (err) {
      console.log(err);
    }
  }
}

export default CarritoDao;
