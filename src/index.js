import express from "express";
import dotenv from "dotenv";
import ProductoDao from "./dao/ProductoDao.js";
import CarritoDao from "./dao/CarritoDao.js";
import ProductoEnCarritoDao from "./dao/ProductoEnCarritoDao.js";
import MensajesDao from "./dao/MensajesDao.js";
import config from "./config.js";
import configSQLite from "./configSQLite.js";

dotenv.config();

const productApi = new ProductoDao(config);
const cartApi = new CarritoDao(config);
const ProductInCartApi = new ProductoEnCarritoDao(config);
const MensajesApi = new MensajesDao(configSQLite);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authMiddleware = (req, res, next) => {
  req.header("authorization") == process.env.TOKEN
    ? next()
    : res.status(401).json({ Error: "Unauthorized" });
};

const ProductsRouter = express.Router();
const CartsRouter = express.Router();
const MessagesRouter = express.Router();

app.use("/api/productos", ProductsRouter);
app.use("/api/carritos", CartsRouter);
app.use("/api/mensajes", MessagesRouter);

// --------- Product Endpoints --------

// GET api/productos
ProductsRouter.get("/", async (req, res) => {
  const products = await productApi.getAll();
  res.status(200).json(products);
});

// GET api/productos/:id
ProductsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await productApi.getProductById(id);

  product
    ? res.status(200).json(product)
    : res.status(400).json({ error: "Producto no encontrado" });
});

// POST api/productos
ProductsRouter.post("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const newProductId = await productApi.save(body);

  newProductId
    ? res
        .status(200)
        .json({ success: "Producto añadido con ID : " + newProductId })
    : res
        .status(400)
        .json({ error: "Error al guardar. Verifique el contenido del body" });
});

// PUT api/productos/:id
ProductsRouter.put("/:id", authMiddleware, async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const wasUpdated = await productApi.updateProductById(body, id);

  wasUpdated
    ? res.status(200).json({ Success: "Producto actualizado" })
    : res
        .status(404)
        .json({
          error: "producto no encontrado o contenido del body invalido",
        });
});

// DELETE /api/productos/:id
ProductsRouter.delete("/:id", authMiddleware, async (req, res, next) => {
  const { id } = req.params;
  const wasDeleted = await productApi.deleteById(id);

  wasDeleted
    ? res.status(200).json({ success: "Producto eliminado" })
    : res.status(404).json({ error: "producto no encontrado" });
});

// ----- Cart Endpoints --------

// GET /api/carrito
CartsRouter.get("/", async (req, res) => {
  const cart = await cartApi.getAll();
  res.status(200).json(cart);
});

// POST /api/carritos
CartsRouter.post("/", async (req, res) => {
  const newCartId = await cartApi.save();

  newCartId
    ? res.status(200).json({ success: "Carrito añadido con ID: " + newCartId })
    : res.status(400).json({ error: "Hubo un problema, intente nuevamente" });
});

// DELETE /api/carritos
CartsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const wasDeleted = await cartApi.deleteById(id);

  wasDeleted
    ? res.status(200).json({ success: "Carrito Eliminado" })
    : res.status(404).json({ error: "Carrito no encontrado" });
});

// ------ Productos en Carritos Endpoints ----------

// POST /api/carritos/:id/productos
CartsRouter.post("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (Object.prototype.hasOwnProperty.call(body, "productId")) {
    const newProductInCartId = await ProductInCartApi.saveProductToCart(
      id,
      body.productId
    );

    newProductInCartId
      ? res
          .status(200)
          .json({ success: "Producto añadido correctamente al carrito" })
      : res.status(400).json({
          error:
            "Hubo un problema. Quizas el id del carrito o el id del producto sea invalido",
        });
  } else {
    res
      .status(400)
      .json({ error: 'la llave debe ser "productId", porfavor verifique' });
  }
});

// DELETE /api/carrios/:id/productos/:idProd
CartsRouter.delete("/:id/productos/:idProd", async (req, res) => {
  const { id, idProd } = req.params;
  const wasDeleted = await ProductInCartApi.deleteProductFromCart(id, idProd);
  wasDeleted
    ? res.status(200).json({ success: "Producto removido del carrito" })
    : res.status(400).json({ error: "Hubo un problema" });
});

// GET /api/carritos/:id/productos
CartsRouter.get("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const cartProducts = await ProductInCartApi.getAllProductsFromCart(id);
  console.log(cartProducts);
  if (cartProducts.length) {
    res.status(200).json(cartProducts);
  } else {
    res.status(404).json({ error: "Carrito no encontrado o no hay productos" });
  }
});

// ------ Mensajes EndPoints ----------

MessagesRouter.get("/", async (req, res) => {
  // const message = req.body
  const Messages = await MensajesApi.ReadAll();
  console.log(Messages);
  res.status(200).json(Messages);
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server escuchando en el puerto ${PORT}`);
});

server.on("error", (err) => console.log(err));
